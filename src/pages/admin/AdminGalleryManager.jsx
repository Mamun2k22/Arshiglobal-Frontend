import { useEffect, useState } from "react";

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
  return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">{children}</span>;
}

export default function AdminGalleryManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [toast, setToast] = useState({ type: "", msg: "" });
  const show = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast({ type: "", msg: "" }), 2200);
  };

  const load = async () => {
    setLoading(true);
    try {
      const data = await api("/api/gallery/admin");
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

  const upload = async () => {
    if (!files.length) return show("err", "Please select images");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("caption", caption);
      files.forEach((f) => fd.append("images", f));

      const data = await api("/api/gallery/admin", { method: "POST", body: fd });
      show("ok", `Uploaded ${data?.items?.length || 0} image(s)`);
      setTitle("");
      setCaption("");
      setFiles([]);
      await load();
    } catch (e) {
      show("err", e.message);
    } finally {
      setUploading(false);
    }
  };

  const toggle = async (g) => {
    try {
      const updated = await api(`/api/gallery/admin/${g._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !(g.isActive ?? true) }),
      });
      setItems((prev) => prev.map((x) => (x._id === g._id ? updated : x)));
      show("ok", updated.isActive ? "Activated" : "Deactivated");
    } catch (e) {
      show("err", e.message);
    }
  };

  const remove = async (g) => {
    if (!window.confirm("Delete this image?")) return;
    try {
      await api(`/api/gallery/admin/${g._id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((x) => x._id !== g._id));
      show("ok", "Deleted");
    } catch (e) {
      show("err", e.message);
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <div className="text-2xl font-extrabold">Gallery Manager</div>
          <div className="mt-1 text-sm text-slate-600">Images are hosted on ImgBB. DB stores only URLs.</div>
        </div>
      </div>

      <Card>
        <div className="p-5 md:p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <label className="block">
              <div className="text-sm font-semibold text-slate-700">Title (optional)</div>
              <input className="mt-2 w-full rounded-xl border px-4 py-3"
                value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Office Tour" />
            </label>

            <label className="block">
              <div className="text-sm font-semibold text-slate-700">Caption (optional)</div>
              <input className="mt-2 w-full rounded-xl border px-4 py-3"
                value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Uttara office" />
            </label>
          </div>

          <div className="rounded-xl border bg-slate-50 p-4">
            <div className="font-semibold">Upload images</div>
            <div className="mt-1 text-sm text-slate-600">Select up to 10 images. (jpg/png/webp)</div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files || []).slice(0, 10))}
              className="mt-3 block w-full text-sm"
            />
            {files.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {files.map((f, i) => (
                  <span key={i} className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-sm">
                    {f.name}
                    <button type="button" className="text-slate-500 hover:text-rose-600" onClick={() => setFiles(files.filter((_, idx) => idx !== i))}>
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            ) : null}

            <button
              onClick={upload}
              disabled={uploading}
              className="mt-4 rounded-xl bg-emerald-600 px-5 py-3 text-white font-semibold hover:bg-emerald-700 disabled:opacity-60"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </Card>

      <Card>
        <div className="p-5 md:p-6 flex items-center justify-between">
          <div className="text-sm text-slate-600">Total: <span className="font-semibold">{items.length}</span></div>
          <button className="rounded-xl border px-4 py-2 font-semibold hover:bg-slate-50" onClick={load}>
            Refresh
          </button>
        </div>

        <div className="border-t">
          {loading ? (
            <div className="p-6 text-slate-600">Loading...</div>
          ) : items.length ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5 md:p-6">
              {items.map((g) => (
                <div key={g._id} className="rounded-2xl border overflow-hidden bg-white">
                  <div className="h-44 bg-slate-100">
                    <img src={g.imageUrl} alt={g.title || "gallery"} className="h-44 w-full object-cover" />
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-semibold truncate">{g.title || "Untitled"}</div>
                        {g.caption ? <div className="text-sm text-slate-600 line-clamp-2">{g.caption}</div> : null}
                      </div>
                      <Badge>{g.isActive ? "Active" : "Hidden"}</Badge>
                    </div>

                    <div className="flex gap-2">
                      <button onClick={() => toggle(g)} className="w-full rounded-xl bg-slate-900 px-3 py-2 text-white font-semibold hover:bg-slate-800">
                        {g.isActive ? "Hide" : "Show"}
                      </button>
                      <button onClick={() => remove(g)} className="w-full rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 font-semibold text-rose-700 hover:bg-rose-100">
                        Delete
                      </button>
                    </div>

                    <a href={g.imageUrl} target="_blank" rel="noreferrer" className="text-xs text-emerald-700 hover:underline">
                      Open Img
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 text-center">
              <div className="text-lg font-semibold">No images</div>
              <div className="mt-1 text-slate-600">Upload images to show on media page.</div>
            </div>
          )}
        </div>
      </Card>

      {toast.msg ? (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
          <div className={`rounded-xl px-4 py-3 text-sm font-semibold shadow-lg border ${
            toast.type === "ok"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-rose-50 text-rose-800 border-rose-200"
          }`}>
            {toast.msg}
          </div>
        </div>
      ) : null}
    </div>
  );
}
