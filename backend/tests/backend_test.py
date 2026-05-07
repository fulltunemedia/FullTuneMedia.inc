"""Backend API tests for FullTuneMedia"""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL') or open('/app/frontend/.env').read().split('REACT_APP_BACKEND_URL=')[1].split('\n')[0].strip()
BASE_URL = BASE_URL.rstrip('/')
ADMIN_TOKEN = "fulltune-admin-2025"

# 1x1 transparent PNG
TINY_PNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="


@pytest.fixture(scope="module")
def admin_headers():
    return {"X-Admin-Token": ADMIN_TOKEN, "Content-Type": "application/json"}


# Health
def test_root_health():
    r = requests.get(f"{BASE_URL}/api/")
    assert r.status_code == 200
    data = r.json()
    assert data.get("status") == "ok"


# Admin verify
def test_admin_verify_bad_token():
    r = requests.post(f"{BASE_URL}/api/admin/verify", headers={"X-Admin-Token": "wrong"})
    assert r.status_code == 401


def test_admin_verify_correct_token(admin_headers):
    r = requests.post(f"{BASE_URL}/api/admin/verify", headers=admin_headers)
    assert r.status_code == 200
    assert r.json().get("valid") is True


# Contact
def test_contact_create_public():
    payload = {"name": "TEST_User", "email": "test_user@example.com", "message": "Hello", "subject": "TEST_subject"}
    r = requests.post(f"{BASE_URL}/api/contact", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]
    assert data["message"] == payload["message"]
    assert "id" in data
    assert "_id" not in data


def test_contact_list_requires_admin():
    r = requests.get(f"{BASE_URL}/api/contact")
    assert r.status_code == 401


def test_contact_list_with_admin(admin_headers):
    r = requests.get(f"{BASE_URL}/api/contact", headers=admin_headers)
    assert r.status_code == 200
    contacts = r.json()
    assert isinstance(contacts, list)
    if contacts:
        assert "_id" not in contacts[0]
        assert "id" in contacts[0]


# Photos
def test_photo_create_requires_admin():
    payload = {"title": "TEST_p", "category": "automotive", "image_data": TINY_PNG}
    r = requests.post(f"{BASE_URL}/api/photos", json=payload)
    assert r.status_code == 401


@pytest.fixture(scope="module")
def created_photo_id(admin_headers):
    payload = {"title": "TEST_Photo_Auto", "category": "automotive", "image_data": TINY_PNG, "description": "TEST", "featured": True}
    r = requests.post(f"{BASE_URL}/api/photos", json=payload, headers=admin_headers)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["title"] == "TEST_Photo_Auto"
    assert data["category"] == "automotive"
    assert "id" in data
    assert "_id" not in data
    return data["id"]


def test_photos_list_public_filter(created_photo_id):
    r = requests.get(f"{BASE_URL}/api/photos?category=automotive")
    assert r.status_code == 200
    items = r.json()
    assert isinstance(items, list)
    assert any(p["id"] == created_photo_id for p in items)
    for p in items:
        assert "_id" not in p


def test_photos_list_all():
    r = requests.get(f"{BASE_URL}/api/photos?category=all")
    assert r.status_code == 200
    assert isinstance(r.json(), list)


def test_photos_list_no_param():
    r = requests.get(f"{BASE_URL}/api/photos")
    assert r.status_code == 200


def test_delete_photo_requires_admin(created_photo_id):
    r = requests.delete(f"{BASE_URL}/api/photos/{created_photo_id}")
    assert r.status_code == 401


def test_delete_photo_404(admin_headers):
    r = requests.delete(f"{BASE_URL}/api/photos/non-existent-id", headers=admin_headers)
    assert r.status_code == 404


def test_delete_photo_success(admin_headers, created_photo_id):
    r = requests.delete(f"{BASE_URL}/api/photos/{created_photo_id}", headers=admin_headers)
    assert r.status_code == 200
    assert r.json().get("deleted") is True
    # verify removal
    r2 = requests.get(f"{BASE_URL}/api/photos?category=automotive")
    assert all(p["id"] != created_photo_id for p in r2.json())
