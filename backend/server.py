from fastapi import FastAPI, APIRouter, HTTPException, Header, Depends
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import resend


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

ADMIN_TOKEN = os.environ.get('ADMIN_TOKEN', 'fulltune-admin-2025')
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
NOTIFICATION_EMAIL = os.environ.get('NOTIFICATION_EMAIL', '')

if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

# Create the main app without a prefix
app = FastAPI(title="FullTuneMedia API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# =========================
# Models
# =========================
class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(min_length=1, max_length=4000)
    subject: Optional[str] = Field(default=None, max_length=200)


class Contact(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    subject: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class PhotoCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    category: str = Field(min_length=1, max_length=60)  # automotive | motorcycle | architecture | portrait
    image_data: str  # base64 data URL
    description: Optional[str] = Field(default=None, max_length=600)
    featured: bool = False


class Photo(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    category: str
    image_data: str
    description: Optional[str] = None
    featured: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# =========================
# Admin guard
# =========================
def require_admin(x_admin_token: Optional[str] = Header(default=None)):
    if not x_admin_token or x_admin_token != ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid admin token")
    return True


# =========================
# Health
# =========================
@api_router.get("/")
async def root():
    return {"message": "FullTuneMedia API online", "status": "ok"}


# =========================
# Contact
# =========================
@api_router.post("/contact", response_model=Contact)
async def create_contact(payload: ContactCreate):
    obj = Contact(**payload.model_dump())
    doc = obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contacts.insert_one(doc)
    asyncio.create_task(send_inquiry_email(obj))
    return obj


async def send_inquiry_email(c: Contact) -> None:
    if not RESEND_API_KEY or not NOTIFICATION_EMAIL:
        logger.info("Resend not configured; skipping email notification.")
        return
    subject_line = f"New FullTuneMedia inquiry — {c.name}"
    safe_message = (c.message or "").replace("\n", "<br>")
    safe_subject = c.subject or "—"
    html = f"""
    <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; background:#0a0a0c; color:#f8f9fa; padding:24px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px; margin:0 auto; background:#121214; border:1px solid rgba(255,255,255,0.08);">
        <tr><td style="padding:24px 28px; border-bottom:1px solid rgba(255,255,255,0.08);">
          <div style="font-size:11px; letter-spacing:0.25em; text-transform:uppercase; color:#FF3B30;">FullTuneMedia · New Inquiry</div>
          <div style="font-size:22px; margin-top:8px; color:#fff;">{c.name}</div>
          <a href="mailto:{c.email}" style="color:#FF3B30; text-decoration:none; font-size:14px;">{c.email}</a>
        </td></tr>
        <tr><td style="padding:20px 28px;">
          <div style="font-size:11px; letter-spacing:0.2em; text-transform:uppercase; color:#a1a1aa; margin-bottom:6px;">Project Type</div>
          <div style="color:#f8f9fa; margin-bottom:18px;">{safe_subject}</div>
          <div style="font-size:11px; letter-spacing:0.2em; text-transform:uppercase; color:#a1a1aa; margin-bottom:6px;">Message</div>
          <div style="color:#e4e4e7; line-height:1.6; white-space:pre-wrap;">{safe_message}</div>
        </td></tr>
        <tr><td style="padding:16px 28px; border-top:1px solid rgba(255,255,255,0.08); font-size:11px; color:#71717a;">
          Reply directly to this email — it goes to {c.email}.
        </td></tr>
      </table>
    </div>
    """
    params = {
        "from": SENDER_EMAIL,
        "to": [NOTIFICATION_EMAIL],
        "reply_to": c.email,
        "subject": subject_line,
        "html": html,
    }
    try:
        await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Inquiry email sent for {c.email}")
    except Exception as e:
        logger.error(f"Failed to send inquiry email: {e}")


@api_router.get("/contact", response_model=List[Contact])
async def list_contacts(_: bool = Depends(require_admin)):
    docs = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for d in docs:
        if isinstance(d.get('created_at'), str):
            d['created_at'] = datetime.fromisoformat(d['created_at'])
    return docs


# =========================
# Photos
# =========================
@api_router.post("/photos", response_model=Photo)
async def create_photo(payload: PhotoCreate, _: bool = Depends(require_admin)):
    obj = Photo(**payload.model_dump())
    doc = obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.photos.insert_one(doc)
    return obj


@api_router.get("/photos", response_model=List[Photo])
async def list_photos(category: Optional[str] = None):
    query = {}
    if category and category.lower() != 'all':
        query['category'] = category.lower()
    docs = await db.photos.find(query, {"_id": 0}).sort("created_at", -1).to_list(500)
    for d in docs:
        if isinstance(d.get('created_at'), str):
            d['created_at'] = datetime.fromisoformat(d['created_at'])
    return docs


@api_router.delete("/photos/{photo_id}")
async def delete_photo(photo_id: str, _: bool = Depends(require_admin)):
    res = await db.photos.delete_one({"id": photo_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Photo not found")
    return {"deleted": True, "id": photo_id}


@api_router.post("/admin/verify")
async def verify_admin(_: bool = Depends(require_admin)):
    return {"valid": True}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
