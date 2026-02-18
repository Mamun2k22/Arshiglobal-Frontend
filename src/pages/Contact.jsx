import { useLoaderData } from "react-router-dom";
import { useState } from "react";

const API_BASE = (import.meta.env.VITE_APP_SERVER_URL || "").replace(/\/$/, "");

async function postJSON(path, body) {
  const res = await fetch(`${API_BASE}${path.startsWith("/") ? "" : "/"}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || "Request failed");
  return data;
}

function Card({ children }) {
  return <div className="rounded-2xl border bg-white shadow-sm">{children}</div>;
}

export default function Contact() {
  const settings = useLoaderData() || {};

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [newsEmail, setNewsEmail] = useState("");

  const [sending, setSending] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [toast, setToast] = useState({ type: "", msg: "" });

  const show = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast({ type: "", msg: "" }), 2500);
  };

  const submitMessage = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await postJSON("/api/contact", form);
      show("ok", "Message sent successfully!");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      show("err", err.message || "Failed to send message");
    } finally {
      setSending(false);
    }
  };

  const subscribe = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await postJSON("/api/newsletter/subscribe", { email: newsEmail });
      show("ok", "Subscribed successfully!");
      setNewsEmail("");
    } catch (err) {
      show("err", err.message || "Failed to subscribe");
    } finally {
      setSubmitting(false);
    }
  };

  const wa = settings?.whatsapp ? `https://wa.me/${String(settings.whatsapp).replace(/\D/g, "")}` : "#";

  return (
    <div>
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 mt-2 md:mt-10">
          <div className="text-3xl md:text-4xl font-extrabold">Contact</div>
          <p className="mt-2 text-slate-200 max-w-2xl">
            Send a message and we’ll guide you with required documents and next steps.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="p-6 md:p-8">
                <h2 className="text-xl font-bold">Send us a message</h2>
                <p className="mt-1 text-slate-600">We usually reply quickly on WhatsApp.</p>

                <form onSubmit={submitMessage} className="mt-6 grid gap-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      className="rounded-xl border px-4 py-3"
                      placeholder="Your name *"
                      value={form.name}
                      onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                      required
                    />
                    <input
                      className="rounded-xl border px-4 py-3"
                      placeholder="Phone"
                      value={form.phone}
                      onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                    />
                  </div>

                  <input
                    className="rounded-xl border px-4 py-3"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                    type="email"
                  />

                  <textarea
                    className="rounded-xl border px-4 py-3 min-h-[140px]"
                    placeholder="Your message *"
                    value={form.message}
                    onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                    required
                  />

                  <button
                    disabled={sending}
                    className="rounded-xl bg-emerald-600 px-5 py-3 text-white font-semibold hover:bg-emerald-700 disabled:opacity-60"
                  >
                    {sending ? "Sending..." : "Send message"}
                  </button>
                </form>
              </div>
            </Card>

            <Card>
              <div className="p-6 md:p-8">
                <h3 className="text-lg font-bold">Newsletter</h3>
                <p className="mt-1 text-slate-600">Get updates on new jobs and announcements.</p>

                <form onSubmit={subscribe} className="mt-4 flex flex-col sm:flex-row gap-3">
                  <input
                    className="flex-1 rounded-xl border px-4 py-3"
                    placeholder="Your email"
                    value={newsEmail}
                    onChange={(e) => setNewsEmail(e.target.value)}
                    type="email"
                    required
                  />
                  <button
                    disabled={submitting}
                    className="rounded-xl bg-slate-900 px-5 py-3 text-white font-semibold hover:bg-slate-800 disabled:opacity-60"
                  >
                    {submitting ? "Submitting..." : "Subscribe"}
                  </button>
                </form>
              </div>
            </Card>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <Card>
              <div className="p-6">
                <div className="font-bold">Office</div>
                <div className="mt-2 text-sm text-slate-700 space-y-1">
                  <div>{settings?.address || "Address will be updated"}</div>
                  <div>{settings?.phone || "Phone will be updated"}</div>
                  <div>{settings?.email || "Email will be updated"}</div>
                </div>

                <div className="mt-4 space-y-3">
                  <a
                    href={wa}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex justify-center rounded-xl bg-emerald-600 px-4 py-3 text-white font-semibold hover:bg-emerald-700"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <div className="font-bold">Working hours</div>
                <div className="mt-2 text-sm text-slate-700">
                  Saturday–Thursday: 10:00 AM – 7:00 PM <br />
                  Friday: Closed
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Toast */}
      {toast.msg ? (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
          <div
            className={`rounded-xl px-4 py-3 text-sm font-semibold shadow-lg border ${
              toast.type === "ok"
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-rose-50 text-rose-800 border-rose-200"
            }`}
          >
            {toast.msg}
          </div>
        </div>
      ) : null}
    </div>
  );
}
