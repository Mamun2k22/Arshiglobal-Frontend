import { useEffect, useMemo, useState } from "react";
import { apiJSON } from "../../../src/lib/http";

export default function ApplyJobModal({ open, onClose, job }) {
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ type: "", msg: "" });

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    passportNumber: "",
    education: "",
    experience: "",
    message: "",
    cvUrl: "", // optional
  });

  const show = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast({ type: "", msg: "" }), 2200);
  };

  useEffect(() => {
    if (!open) return;
    // reset each open
    setForm({
      fullName: "",
      email: "",
      phone: "",
      passportNumber: "",
      education: "",
      experience: "",
      message: "",
      cvUrl: "",
    });
  }, [open]);

  const title = useMemo(() => job?.title || job?.jobTitle || "Job", [job]);
  const jobId = job?._id || job?.id;

  const submit = async (e) => {
    e.preventDefault();
    if (!jobId) return show("err", "Job not found");
    if (!form.fullName.trim() || !form.email.trim()) return show("err", "Name & Email required");

    setSaving(true);
    try {
      await apiJSON("/api/applications", {
        method: "POST",
        body: { job: jobId, ...form },
      });
      show("ok", "Application submitted!");
      setTimeout(() => onClose?.(), 600);
    } catch (err) {
      show("err", err.message || "Failed to apply");
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl overflow-hidden">
        <div className="flex items-start justify-between gap-4 px-6 py-4 border-b">
          <div>
            <div className="text-lg font-extrabold">Apply Now</div>
            <div className="text-sm text-slate-600 mt-0.5">
              Applying for: <span className="font-semibold text-slate-900">{title}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border px-3 py-1.5 text-sm font-semibold hover:bg-slate-50"
            type="button"
          >
            Close
          </button>
        </div>

        <form onSubmit={submit} className="p-6 grid gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              className="rounded-xl border px-4 py-3"
              placeholder="Full name *"
              value={form.fullName}
              onChange={(e) => setForm((s) => ({ ...s, fullName: e.target.value }))}
              required
            />
            <input
              className="rounded-xl border px-4 py-3"
              placeholder="Email *"
              type="email"
              value={form.email}
              onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              className="rounded-xl border px-4 py-3"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
            />
            <input
              className="rounded-xl border px-4 py-3"
              placeholder="Passport number (optional)"
              value={form.passportNumber}
              onChange={(e) => setForm((s) => ({ ...s, passportNumber: e.target.value }))}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              className="rounded-xl border px-4 py-3"
              placeholder="Education (optional)"
              value={form.education}
              onChange={(e) => setForm((s) => ({ ...s, education: e.target.value }))}
            />
            <input
              className="rounded-xl border px-4 py-3"
              placeholder="Experience (optional)"
              value={form.experience}
              onChange={(e) => setForm((s) => ({ ...s, experience: e.target.value }))}
            />
          </div>

          <textarea
            className="rounded-xl border px-4 py-3 min-h-[120px]"
            placeholder="Message (optional)"
            value={form.message}
            onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
          />

          <input
            className="rounded-xl border px-4 py-3"
            placeholder="CV URL (optional) - ImgBB link"
            value={form.cvUrl}
            onChange={(e) => setForm((s) => ({ ...s, cvUrl: e.target.value }))}
          />

          <button
            disabled={saving}
            className="rounded-xl bg-emerald-600 px-5 py-3 text-white font-extrabold hover:bg-emerald-700 disabled:opacity-60"
          >
            {saving ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>

      {toast.msg ? (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[1000]">
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
