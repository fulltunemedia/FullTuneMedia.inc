import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Trash2, Upload, LogOut, Image as ImageIcon } from "lucide-react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { toast } from "sonner";
import { api, setAdminToken } from "../lib/apiClient";

const CATEGORIES = ["automotive", "motorcycle", "architecture", "portrait"];

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [tokenInput, setTokenInput] = useState("");
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("ftm_admin_token");
    if (stored) {
      api
        .post("/admin/verify", {})
        .then(() => setAuthed(true))
        .catch(() => setAdminToken(null));
    }
  }, []);

  const login = async (e) => {
    e.preventDefault();
    if (!tokenInput.trim()) return;
    setVerifying(true);
    setAdminToken(tokenInput.trim());
    try {
      await api.post("/admin/verify", {});
      setAuthed(true);
      toast.success("Welcome back.");
    } catch {
      setAdminToken(null);
      toast.error("Invalid token.");
    } finally {
      setVerifying(false);
    }
  };

  const logout = () => {
    setAdminToken(null);
    setAuthed(false);
    setTokenInput("");
  };

  if (!authed) {
    return (
      <div className="grain min-h-screen bg-[#0a0a0c] flex items-center justify-center px-6">
        <div className="max-w-md w-full">
          <Link
            to="/"
            data-testid="admin-back-link"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white font-stencil text-xs uppercase tracking-[0.3em] mb-12"
          >
            <ArrowLeft size={14} /> Back to site
          </Link>
          <p className="font-stencil text-xs uppercase tracking-[0.3em] text-[#FF3B30] mb-3">
            FullTuneMedia · Admin
          </p>
          <h1 className="font-display text-5xl text-white mb-10 tracking-mega">
            Sign in.
          </h1>
          <form onSubmit={login} data-testid="admin-login-form" className="space-y-5">
            <div className="space-y-2">
              <Label className="font-stencil text-[10px] uppercase tracking-[0.3em] text-zinc-400">
                Admin Token
              </Label>
              <Input
                type="password"
                data-testid="admin-token-input"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="Enter your admin token"
                className="bg-[#121214] border-white/10 rounded-none h-12 text-white"
              />
            </div>
            <Button
              type="submit"
              disabled={verifying}
              data-testid="admin-login-button"
              className="w-full bg-[#FF3B30] hover:bg-[#FF5247] text-white font-stencil text-xs uppercase tracking-[0.25em] rounded-none h-12"
            >
              {verifying ? "Verifying…" : "Enter"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return <AdminDashboard onLogout={logout} />;
}

function AdminDashboard({ onLogout }) {
  const [photos, setPhotos] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // upload form
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("automotive");
  const [description, setDescription] = useState("");
  const [imageData, setImageData] = useState("");
  const [previewName, setPreviewName] = useState("");
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const [p, c] = await Promise.all([
        api.get("/photos"),
        api.get("/contact"),
      ]);
      setPhotos(p.data || []);
      setContacts(c.data || []);
    } catch {
      toast.error("Couldn&apos;t load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Max 5 MB per image.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImageData(String(reader.result));
      setPreviewName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const upload = async (e) => {
    e.preventDefault();
    if (!title.trim() || !imageData) {
      toast.error("Title and image are required.");
      return;
    }
    setUploading(true);
    try {
      await api.post("/photos", {
        title: title.trim(),
        category,
        description: description.trim() || null,
        image_data: imageData,
        featured: false,
      });
      toast.success("Frame uploaded.");
      setTitle("");
      setDescription("");
      setImageData("");
      setPreviewName("");
      load();
    } catch (err) {
      toast.error("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this frame?")) return;
    try {
      await api.delete(`/photos/${id}`);
      toast.success("Frame removed.");
      setPhotos((p) => p.filter((x) => x.id !== id));
    } catch {
      toast.error("Delete failed.");
    }
  };

  return (
    <div className="grain min-h-screen bg-[#0a0a0c] text-white">
      <div className="border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <Link
            to="/"
            data-testid="admin-home-link"
            className="flex items-center gap-3 group"
          >
            <span className="w-2 h-2 bg-[#FF3B30] rounded-full" />
            <span className="font-stencil text-sm uppercase tracking-[0.25em]">
              FullTuneMedia · Admin
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <span className="font-stencil text-[10px] uppercase tracking-[0.3em] text-zinc-500 hidden md:inline">
              {photos.length} frames · {contacts.length} inquiries
            </span>
            <button
              onClick={onLogout}
              data-testid="admin-logout-button"
              className="flex items-center gap-2 text-zinc-400 hover:text-[#FF3B30] font-stencil text-xs uppercase tracking-[0.25em]"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload */}
        <div className="lg:col-span-1">
          <h2 className="font-display text-3xl mb-6">Upload Frame</h2>
          <form
            onSubmit={upload}
            data-testid="admin-upload-form"
            className="bg-[#121214] border border-white/5 p-6 space-y-5"
          >
            <div className="space-y-2">
              <Label className="font-stencil text-[10px] uppercase tracking-[0.3em] text-zinc-400">
                Title
              </Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                data-testid="admin-photo-title"
                placeholder="Silver Drophead, 11:42 PM"
                className="bg-[#0a0a0c] border-white/10 rounded-none h-11 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-stencil text-[10px] uppercase tracking-[0.3em] text-zinc-400">
                Category
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger
                  data-testid="admin-photo-category"
                  className="bg-[#0a0a0c] border-white/10 rounded-none h-11 text-white"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#0a0a0c] border-white/10 text-white rounded-none">
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c} className="capitalize">
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-stencil text-[10px] uppercase tracking-[0.3em] text-zinc-400">
                Description (optional)
              </Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                data-testid="admin-photo-description"
                rows={3}
                placeholder="Hamilton, ON — late-night roll out."
                className="bg-[#0a0a0c] border-white/10 rounded-none text-white resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-stencil text-[10px] uppercase tracking-[0.3em] text-zinc-400">
                Image (max 5 MB)
              </Label>
              <label
                htmlFor="photo-file"
                className="block cursor-pointer border border-dashed border-white/15 hover:border-[#FF3B30] p-6 text-center transition-colors"
                data-testid="admin-photo-file-label"
              >
                <ImageIcon size={20} className="mx-auto mb-2 text-zinc-500" />
                <div className="font-stencil text-[10px] uppercase tracking-[0.3em] text-zinc-400">
                  {previewName || "Click to choose an image"}
                </div>
                <input
                  id="photo-file"
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  data-testid="admin-photo-file"
                  className="hidden"
                />
              </label>
              {imageData && (
                <img
                  src={imageData}
                  alt="preview"
                  className="w-full h-40 object-cover border border-white/5"
                />
              )}
            </div>
            <Button
              type="submit"
              disabled={uploading}
              data-testid="admin-upload-button"
              className="w-full bg-[#FF3B30] hover:bg-[#FF5247] text-white font-stencil text-xs uppercase tracking-[0.25em] rounded-none h-12"
            >
              {uploading ? "Uploading…" : (
                <>
                  <Upload size={14} className="mr-2" /> Upload Frame
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Photos */}
        <div className="lg:col-span-2 space-y-12">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-3xl">Library</h2>
              <span className="font-stencil text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                {photos.length} frames
              </span>
            </div>
            {loading ? (
              <p className="text-zinc-500">Loading…</p>
            ) : photos.length === 0 ? (
              <p data-testid="admin-empty-photos" className="text-zinc-500 font-stencil text-xs uppercase tracking-[0.3em]">
                No frames yet — upload your first.
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {photos.map((p) => (
                  <div
                    key={p.id}
                    data-testid={`admin-photo-${p.id}`}
                    className="group relative aspect-square bg-[#121214] border border-white/5"
                  >
                    <img
                      src={p.image_data}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between">
                      <div>
                        <p className="font-stencil text-[9px] uppercase tracking-[0.25em] text-[#FF3B30]">
                          {p.category}
                        </p>
                        <p className="font-display text-base text-white mt-1 line-clamp-2">
                          {p.title}
                        </p>
                      </div>
                      <button
                        onClick={() => remove(p.id)}
                        data-testid={`admin-delete-${p.id}`}
                        className="self-start flex items-center gap-2 px-3 py-1.5 bg-[#FF3B30] text-white font-stencil text-[10px] uppercase tracking-[0.2em]"
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-3xl">Inquiries</h2>
              <span className="font-stencil text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                {contacts.length} total
              </span>
            </div>
            {contacts.length === 0 ? (
              <p data-testid="admin-empty-contacts" className="text-zinc-500 font-stencil text-xs uppercase tracking-[0.3em]">
                No messages yet.
              </p>
            ) : (
              <div className="space-y-3">
                {contacts.map((c) => (
                  <div
                    key={c.id}
                    data-testid={`admin-contact-${c.id}`}
                    className="bg-[#121214] border border-white/5 p-5"
                  >
                    <div className="flex items-start justify-between mb-2 gap-3 flex-wrap">
                      <div>
                        <p className="font-display text-lg text-white">{c.name}</p>
                        <a
                          href={`mailto:${c.email}`}
                          className="font-body text-sm text-[#FF3B30]"
                        >
                          {c.email}
                        </a>
                      </div>
                      <span className="font-stencil text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                        {new Date(c.created_at).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    {c.subject && (
                      <p className="font-stencil text-[10px] uppercase tracking-[0.25em] text-zinc-400 mb-1">
                        Re: {c.subject}
                      </p>
                    )}
                    <p className="font-body text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
                      {c.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
