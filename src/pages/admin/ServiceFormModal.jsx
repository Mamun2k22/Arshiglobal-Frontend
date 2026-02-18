import { useEffect, useMemo, useState } from "react";

const defaultForm = {
  title: "",
  shortDescription: "",
  description: "",
  image: "",
  isActive: true,
  order: 1,
};

const Input = (props) => (
  <input
    {...props}
    className={
      "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 " +
      "placeholder:text-slate-400 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100 " +
      (props.className || "")
    }
  />
);

const Textarea = (props) => (
  <textarea
    {...props}
    className={
      "w-full min-h-[110px] resize-y rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 " +
      "placeholder:text-slate-400 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100 " +
      (props.className || "")
    }
  />
);

const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={
      "relative inline-flex h-6 w-11 items-center rounded-full transition " +
      (checked ? "bg-slate-900" : "bg-slate-200")
    }
  >
    <span
      className={
        "inline-block h-5 w-5 transform rounded-full bg-white transition " +
        (checked ? "translate-x-5" : "translate-x-1")
      }
    />
  </button>
);

async function uploadToImgbb(file) {
  const key = import.meta.env.VITE_IMAGE_API_KEY || import.meta.env.IMAGE_API_KEY;
  if (!key) throw new Error("Missing IMGBB key. Set VITE_IMAGE_API_KEY in .env");

  const fd = new FormData();
  fd.append("image", file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
    method: "POST",
    body: fd,
  });

  const json = await res.json();
  if (!res.ok || !json?.success) throw new Error(json?.error?.message || "Upload failed");
  return json.data.url; // direct url
}

export default function ServiceFormModal({ open, onClose, initial, onSubmit }) {
  const isEdit = !!initial?._id;

  const [form, setForm] = useState(defaultForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!open) return;
    setErr("");
    setSaving(false);
    setUploading(false);
    setForm({
      ...defaultForm,
      ...(initial || {}),
      order: Number(initial?.order || 1),
      isActive: initial?.isActive ?? true,
    });
  }, [open, initial]);

  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    if (open) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  const setField = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const validate = useMemo(() => {
    if (!form.title.trim()) return "Title is required.";
    if (!form.shortDescription.trim()) return "Short description is required.";
    return "";
  }, [form.title, form.shortDescription]);

  const pickFile = async (file) => {
    if (!file) return;
    setErr("");
    setUploading(true);
    try {
      const url = await uploadToImgbb(file);
      setField("image", url);
    } catch (e) {
      setErr(e.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const submit = async () => {
    const v = validate;
    if (v) return setErr(v);

    setSaving(true);
    setErr("");
    try {
      await onSubmit?.({
        title: form.title.trim(),
        shortDescription: form.shortDescription.trim(),
        description: form.description.trim(),
        image: form.image?.trim() || "",
        isActive: !!form.isActive,
        order: Number(form.order || 1),
      });
      onClose?.();
    } catch (e) {
      setErr(e.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999]">
      <div onClick={onClose} className="absolute inset-0 bg-black/50" />

      <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-2xl">
        <div className="p-5 border-b flex items-start justify-between gap-3">
          <div>
            <div className="text-lg font-extrabold text-slate-900">
              {isEdit ? "Edit Service" : "Add New Service"}
            </div>
            <div className="text-sm text-slate-600 mt-1">
              Title, details, image, order and visibility.
            </div>
          </div>
          <button onClick={onClose} className="rounded-xl border px-3 py-1.5 text-sm font-semibold hover:bg-slate-50">
            Close
          </button>
        </div>

        <div className="p-5 space-y-4">
          {err ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-800">
              <div className="font-bold">Fix required</div>
              <div className="text-sm mt-1">{err}</div>
            </div>
          ) : null}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <div className="text-sm font-semibold text-slate-700">Title *</div>
              <div className="mt-1">
                <Input value={form.title} onChange={(e) => setField("title", e.target.value)} placeholder="Europe Job Visa" />
              </div>
            </label>

            <label className="block">
              <div className="text-sm font-semibold text-slate-700">Order</div>
              <div className="mt-1">
                <Input
                  type="number"
                  min={1}
                  value={form.order}
                  onChange={(e) => setField("order", e.target.value)}
                />
              </div>
              <div className="mt-1 text-xs text-slate-500">Lower order shows first.</div>
            </label>

            <label className="block md:col-span-2">
              <div className="text-sm font-semibold text-slate-700">Short Description *</div>
              <div className="mt-1">
                <Textarea
                  value={form.shortDescription}
                  onChange={(e) => setField("shortDescription", e.target.value)}
                  placeholder="Schengen/Europe job visa processing support"
                />
              </div>
            </label>

            <label className="block md:col-span-2">
              <div className="text-sm font-semibold text-slate-700">Full Description</div>
              <div className="mt-1">
                <Textarea
                  value={form.description}
                  onChange={(e) => setField("description", e.target.value)}
                  placeholder="We guide you from counseling to documentation and submission..."
                  className="min-h-[140px]"
                />
              </div>
            </label>
          </div>

          {/* Image */}
          <div className="rounded-2xl border p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-slate-700">Image</div>
                <div className="text-xs text-slate-500 mt-1">Upload to imgbb and save URL.</div>
              </div>

              <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-white text-sm font-bold hover:bg-slate-800">
                {uploading ? "Uploading..." : "Upload Image"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => pickFile(e.target.files?.[0])}
                  disabled={uploading}
                />
              </label>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              <div className="rounded-xl border bg-slate-50 p-3">
                <div className="text-xs font-bold text-slate-500 mb-2">Image URL</div>
                <Input
                  value={form.image}
                  onChange={(e) => setField("image", e.target.value)}
                  placeholder="https://i.ibb.co/....jpg"
                />
              </div>

              <div className="rounded-xl border bg-white p-3">
                <div className="text-xs font-bold text-slate-500 mb-2">Preview</div>
                {form.image ? (
                  <img
                    src={form.image}
                    alt="preview"
                    className="h-28 w-full object-cover rounded-xl border"
                  />
                ) : (
                  <div className="h-28 rounded-xl grid place-items-center text-slate-400 border bg-slate-50">
                    No image
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Active */}
          <div className="flex items-center justify-between rounded-2xl border p-4">
            <div>
              <div className="text-sm font-semibold text-slate-700">Active</div>
              <div className="text-xs text-slate-500 mt-1">If inactive, hidden from public pages.</div>
            </div>
            <div className="flex items-center gap-3">
              <Toggle checked={!!form.isActive} onChange={(v) => setField("isActive", v)} />
              <div className="text-sm font-semibold">{form.isActive ? "Active" : "Inactive"}</div>
            </div>
          </div>
        </div>

        <div className="p-5 border-t flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-slate-50"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="rounded-xl bg-emerald-600 px-5 py-2 text-sm font-extrabold text-white hover:bg-emerald-700 disabled:opacity-60"
            disabled={saving || uploading}
          >
            {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Service"}
          </button>
        </div>
      </div>
    </div>
  );
}
