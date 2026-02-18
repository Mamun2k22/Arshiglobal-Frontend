import { useEffect, useMemo, useState } from "react";

const API_BASE = (import.meta.env.VITE_APP_SERVER_URL || "").replace(/\/$/, "");

async function api(path, opts = {}) {
  const res = await fetch(`${API_BASE}${path}`, { credentials: "include", ...opts });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || "Request failed");
  return data;
}

function Card({ children }) {
  return <div className="rounded-2xl border bg-white shadow-sm">{children}</div>;
}
function Badge({ children }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
      {children}
    </span>
  );
}

function getYouTubeEmbed(url) {
  if (!url) return "";
  const m1 = url.match(/v=([^&]+)/);
  const m2 = url.match(/youtu\.be\/([^?]+)/);
  const id = m1?.[1] || m2?.[1] || "";
  return id ? `https://www.youtube.com/embed/${id}` : "";
}

export default function AdminVideoManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({ title: "", description: "", youtubeUrl: "" });
  const [saving, setSaving] = useState(false);

  const [toast, setToast] = useState({ type: "", msg: "" });
  const show = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast({ type: "", msg: "" }), 2200);
  };

  const load = async () => {
    setLoading(true);
    try {
      const data = await api("/api/videos/admin");
      setItems(data.items || []);
    } catch (e) {
      show("err", e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const preview = useMemo(() => getYouTubeEmbed(form.youtubeUrl), [form.youtubeUrl]);

  const add = async () => {
    if (!form.title.trim() || !form.youtubeUrl.trim()) return show("err", "Title and YouTube URL required");
    setSaving(true);
    try {
      const created = await api("/api/videos/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setItems((prev) => [created, ...prev]);
      setForm({ title: "", description: "", youtubeUrl: "" });
      show("ok", "Video added");
    } catch (e) {
      show("err", e.message);
    } finally {
      setSaving(false);
    }
  };

  const toggle = async (v) => {
    try {
      const updated = await api(`/api/videos/admin/${v._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !(v.isActive ?? true) }),
      });
      setItems((prev) => prev.map((x) => (x._id === v._id ? updated : x)));
      show("ok", updated.isActive ? "Activated" : "Hidden");
    } catch (e) {
      show("err", e.message);
    }
  };

  const remove = async (v) => {
    if (!window.confirm("Delete this video?")) return;
    try {
      await api(`/api/videos/admin/${v._id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((x) => x._id !== v._id));
      show("ok", "Deleted");
    } catch (e) {
      show("err", e.message);
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <div className="text-2xl font-extrabold">Video Manager</div>
        <div className="mt-1 text-sm text-slate-600">Add YouTube videos, show/hide, and delete.</div>
      </div>

      {/* Add new */}
      <Card>
        <div className="p-5 md:p-6 grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="block">
              <div className="text-sm font-semibold text-slate-700">Title *</div>
              <input
                className="mt-2 w-full rounded-xl border px-4 py-3"
                value={form.title}
                onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
                placeholder="How to apply for job"
              />
            </label>

            <label className="block">
              <div className="text-sm font-semibold text-slate-700">YouTube URL *</div>
              <input
                className="mt-2 w-full rounded-xl border px-4 py-3"
                value={form.youtubeUrl}
                onChange={(e) => setForm((s) => ({ ...s, youtubeUrl: e.target.value }))}
                placeholder="https://www.youtube.com/watch?v=..."
              />
              <div className="mt-1 text-xs text-slate-500">Supports youtube.com/watch?v=ID or youtu.be/ID</div>
            </label>

            <label className="block">
              <div className="text-sm font-semibold text-slate-700">Description</div>
              <textarea
                className="mt-2 w-full rounded-xl border px-4 py-3 min-h-[120px]"
                value={form.description}
                onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
                placeholder="Short description..."
              />
            </label>

            <button
              onClick={add}
              disabled={saving}
              className="rounded-xl bg-emerald-600 px-5 py-3 text-white font-semibold hover:bg-emerald-700 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Add Video"}
            </button>
          </div>

          <div>
            <div className="text-sm font-semibold text-slate-700">Preview</div>
            <div className="mt-2 rounded-2xl border overflow-hidden bg-black aspect-video">
              {preview ? (
                <iframe
                  className="w-full h-full"
                  src={preview}
                  title="Preview"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full grid place-items-center text-white/80 text-sm">
                  Paste a valid YouTube URL to preview
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* List */}
      <Card>
        <div className="p-5 md:p-6 flex items-center justify-between">
          <div className="text-sm text-slate-600">
            Total: <span className="font-semibold">{items.length}</span>
          </div>
          <button className="rounded-xl border px-4 py-2 font-semibold hover:bg-slate-50" onClick={load}>
            Refresh
          </button>
        </div>

        <div className="border-t">
          {loading ? (
            <div className="p-6 text-slate-600">Loading...</div>
          ) : items.length ? (
            <div className="divide-y">
              {items.map((v) => (
                <div key={v._id} className="p-5 md:p-6 flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="font-bold text-lg truncate">{v.title}</div>
                      <Badge>{v.isActive ? "Active" : "Hidden"}</Badge>
                    </div>
                    {v.description ? <div className="mt-2 text-sm text-slate-600 line-clamp-2">{v.description}</div> : null}
                    <a href={v.youtubeUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs text-emerald-700 hover:underline">
                      Open YouTube
                    </a>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => toggle(v)}
                      className="rounded-xl bg-slate-900 px-4 py-2 text-white font-semibold hover:bg-slate-800"
                    >
                      {v.isActive ? "Hide" : "Show"}
                    </button>
                    <button
                      onClick={() => remove(v)}
                      className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 font-semibold text-rose-700 hover:bg-rose-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 text-center">
              <div className="text-lg font-semibold">No videos</div>
              <div className="mt-1 text-slate-600">Add YouTube links to show on media page.</div>
            </div>
          )}
        </div>
      </Card>

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
