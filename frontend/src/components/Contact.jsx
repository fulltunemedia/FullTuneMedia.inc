import { useState } from "react";
import { Mail, MapPin, Instagram, Send } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { api } from "../lib/apiClient";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in name, email, and message.");
      return;
    }
    setSending(true);
    try {
      await api.post("/contact", form);
      toast.success("Message received. I&apos;ll be in touch within 48 hrs.");
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error(
        err?.response?.data?.detail
          ? String(err.response.data.detail)
          : "Couldn&apos;t send right now. Try again or email directly."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative bg-[#0a0a0c] py-24 md:py-32 border-t border-white/5"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          {/* Left */}
          <div className="md:col-span-5">
            <p className="font-stencil text-xs uppercase tracking-[0.3em] text-[#FF3B30] mb-4">
              § 04 — Start a Project
            </p>
            <h2 className="font-display text-5xl md:text-7xl tracking-mega leading-[0.95] text-white mb-8">
              Let&apos;s make <br />
              <em className="italic font-normal text-zinc-400">something</em> <br />
              worth keeping.
            </h2>
            <p className="font-body text-zinc-400 leading-relaxed mb-12 max-w-md">
              Tell me about the build, the person, the place. Booking 4–6 sessions per
              month right now — early outreach is the move.
            </p>

            <div className="space-y-6">
              <a
                href="mailto:Fulltunemedia@gmail.com"
                data-testid="contact-email-link"
                className="group flex items-center gap-4 text-zinc-300 hover:text-[#FF3B30] transition-colors"
              >
                <span className="w-10 h-10 border border-white/15 flex items-center justify-center group-hover:border-[#FF3B30]">
                  <Mail size={16} />
                </span>
                <div>
                  <div className="font-stencil text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                    Email
                  </div>
                  <div className="font-body">Fulltunemedia@gmail.com</div>
                </div>
              </a>
              <div className="flex items-center gap-4 text-zinc-300">
                <span className="w-10 h-10 border border-white/15 flex items-center justify-center">
                  <MapPin size={16} />
                </span>
                <div>
                  <div className="font-stencil text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                    Based in
                  </div>
                  <div className="font-body">Hamilton, Ontario · Travel-friendly</div>
                </div>
              </div>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                data-testid="contact-instagram-link"
                className="group flex items-center gap-4 text-zinc-300 hover:text-[#FF3B30] transition-colors"
              >
                <span className="w-10 h-10 border border-white/15 flex items-center justify-center group-hover:border-[#FF3B30]">
                  <Instagram size={16} />
                </span>
                <div>
                  <div className="font-stencil text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                    Follow
                  </div>
                  <div className="font-body">@fulltunemedia</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right form */}
          <div className="md:col-span-7">
            <form
              onSubmit={submit}
              data-testid="contact-form"
              className="bg-[#121214] border border-white/5 p-6 md:p-10 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="font-stencil text-[10px] uppercase tracking-[0.3em] text-zinc-400"
                  >
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    data-testid="contact-input-name"
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Alex Chen"
                    className="bg-[#0a0a0c] border-white/10 rounded-none h-12 text-white placeholder:text-zinc-600 focus-visible:ring-[#FF3B30] focus-visible:ring-offset-0 focus-visible:border-[#FF3B30]"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="font-stencil text-[10px] uppercase tracking-[0.3em] text-zinc-400"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    data-testid="contact-input-email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="alex@email.com"
                    className="bg-[#0a0a0c] border-white/10 rounded-none h-12 text-white placeholder:text-zinc-600 focus-visible:ring-[#FF3B30] focus-visible:ring-offset-0 focus-visible:border-[#FF3B30]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="subject"
                  className="font-stencil text-[10px] uppercase tracking-[0.3em] text-zinc-400"
                >
                  Project Type (optional)
                </Label>
                <Input
                  id="subject"
                  data-testid="contact-input-subject"
                  value={form.subject}
                  onChange={update("subject")}
                  placeholder="Build shoot, portrait session, architecture…"
                  className="bg-[#0a0a0c] border-white/10 rounded-none h-12 text-white placeholder:text-zinc-600 focus-visible:ring-[#FF3B30] focus-visible:ring-offset-0 focus-visible:border-[#FF3B30]"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="message"
                  className="font-stencil text-[10px] uppercase tracking-[0.3em] text-zinc-400"
                >
                  Tell me about it
                </Label>
                <Textarea
                  id="message"
                  data-testid="contact-input-message"
                  value={form.message}
                  onChange={update("message")}
                  rows={6}
                  placeholder="What are we shooting? Where? When? Send pictures, vibes, references…"
                  className="bg-[#0a0a0c] border-white/10 rounded-none text-white placeholder:text-zinc-600 focus-visible:ring-[#FF3B30] focus-visible:ring-offset-0 focus-visible:border-[#FF3B30] resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="font-stencil text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                  {sent ? "Message sent ✓" : "Replies within 48 hours"}
                </span>
                <Button
                  type="submit"
                  data-testid="contact-submit-button"
                  disabled={sending}
                  className="bg-[#FF3B30] hover:bg-[#FF5247] text-white font-stencil text-xs uppercase tracking-[0.25em] rounded-none px-8 h-12 disabled:opacity-50"
                >
                  {sending ? "Sending…" : (
                    <>
                      Send Message
                      <Send size={14} className="ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
