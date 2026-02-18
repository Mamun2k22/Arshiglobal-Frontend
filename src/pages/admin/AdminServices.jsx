import { useEffect, useMemo, useState } from "react";
import { apiJSON } from "../../lib/http";
import ServiceFormModal from "../admin/ServiceFormModal";

function Pill({ children, tone = "slate" }) {
  const cls =
    tone === "emerald"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : tone === "rose"
      ? "bg-rose-50 text-rose-700 border-rose-200"
      : "bg-slate-50 text-slate-700 border-slate-200";
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-bold ${cls}`}>
      {children}
    </span>
  );
}

export default function AdminServices() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [q, setQ] = useState("");
  const [items, setItems] = useState([]);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [savingId, setSavingId] = useState("");

  const load = async () => {
    setLoading(true);
    setErr("");
    try {
      const data = await apiJSON("/api/services");
      const list = Array.isArray(data) ? data : data.items || [];
      // sort by order
      list.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
      setItems(list);
    } catch (e) {
      setErr(e.message || "Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const text = q.trim().toLowerCase();
    if (!text) return items;
    return items.filter((x) => {
      const hay = [x.title, x.shortDescription, x.description].filter(Boolean).join(" ").toLowerCase();
      return hay.includes(text);
    });
  }, [items, q]);

  const createOne = async (payload) => {
    const created = await apiJSON("/api/services", { method: "POST", body: payload });
    setItems((prev) => [...prev, created].sort((a, b) => (a.order ?? 999) - (b.order ?? 999)));
  };

  const updateOne = async (id, patch) => {
    setSavingId(id);
    try {
      const updated = await apiJSON(`/api/services/${id}`, { method: "PUT", body: patch });
      setItems((prev) => prev.map((x) => (x._id === id ? updated : x)).sort((a, b) => (a.order ?? 999) - (b.order ?? 999)));
    } finally {
      setSavingId("");
    }
  };

  const removeOne = async (id) => {
    const ok = confirm("Delete this service?");
    if (!ok) return;
    setSavingId(id);
    try {
      await apiJSON(`/api/services/${id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((x) => x._id !== id));
    } catch (e) {
      alert(e.message || "Delete failed");
    } finally {
      setSavingId("");
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-2xl font-extrabold">Services</div>
          <div className="text-sm text-slate-600 mt-1">Create, update, reorder and hide/show services.</div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={load} className="rounded-xl border px-4 py-2 font-semibold hover:bg-slate-50">
            Refresh
          </button>
          <button
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-white font-extrabold hover:bg-emerald-700"
          >
            + Add Service
          </button>
        </div>
      </div>

      {err ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-800">
          <div className="font-bold">Error</div>
          <div className="text-sm mt-1">{err}</div>
        </div>
      ) : null}

      <div className="rounded-2xl border bg-white p-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <input
          className="w-full md:max-w-md rounded-xl border px-4 py-2.5"
          placeholder="Search services..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="text-sm text-slate-600">
          Total: <span className="font-bold text-slate-900">{filtered.length}</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-40 rounded-2xl bg-white border shadow-sm animate-pulse" />
            ))
          : filtered.map((x) => (
              <div key={x._id} className="rounded-2xl border bg-white shadow-sm overflow-hidden">
                <div className="h-36 bg-slate-50">
                  {x.image ? (
                    <img src={x.image} alt={x.title} className="h-36 w-full object-cover" />
                  ) : (
                    <div className="h-36 grid place-items-center text-slate-400">No image</div>
                  )}
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-lg font-extrabold text-slate-900">{x.title}</div>
                      <div className="text-xs text-slate-500 mt-1">Order: {x.order ?? "—"}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Pill tone={x.isActive ? "emerald" : "rose"}>{x.isActive ? "active" : "inactive"}</Pill>
                    </div>
                  </div>

                  <div className="text-sm text-slate-700 line-clamp-2">{x.shortDescription}</div>

                  <div className="pt-2 flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        setEditing(x);
                        setOpen(true);
                      }}
                      className="rounded-xl border px-3 py-2 text-xs font-extrabold hover:bg-slate-50"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => updateOne(x._id, { isActive: !x.isActive })}
                      disabled={savingId === x._id}
                      className="rounded-xl border px-3 py-2 text-xs font-extrabold hover:bg-slate-50 disabled:opacity-60"
                    >
                      {x.isActive ? "Disable" : "Enable"}
                    </button>

                    <button
                      onClick={() => removeOne(x._id)}
                      disabled={savingId === x._id}
                      className="rounded-xl bg-rose-600 px-3 py-2 text-xs font-extrabold text-white hover:bg-rose-700 disabled:opacity-60"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
      </div>

      <ServiceFormModal
        open={open}
        onClose={() => setOpen(false)}
        initial={editing}
        onSubmit={async (payload) => {
          if (editing?._id) return updateOne(editing._id, payload);
          return createOne(payload);
        }}
      />
    </div>
  );
}
