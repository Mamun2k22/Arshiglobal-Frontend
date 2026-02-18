import { useEffect, useMemo, useState } from "react";

const API_BASE = (import.meta.env.VITE_APP_SERVER_URL || "").replace(/\/$/, "");

async function api(path, opts = {}) {
  const res = await fetch(`${API_BASE}${path}`, { credentials: "include", ...opts });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || "Request failed");
  return data;
}

function Badge({ children, tone = "default" }) {
  const cls =
    tone === "green"
      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
      : tone === "red"
      ? "bg-rose-50 text-rose-800 border-rose-200"
      : "bg-slate-100 text-slate-700 border-slate-200";
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${cls}`}>{children}</span>;
}

function Card({ children }) {
  return <div className="rounded-2xl border bg-white shadow-sm">{children}</div>;
}

function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[999] bg-black/40 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-xl border">
        <div className="p-5 border-b flex items-center justify-between">
          <div className="text-lg font-bold">{title}</div>
          <button onClick={onClose} className="rounded-xl border px-3 py-1.5 font-semibold hover:bg-slate-50">Close</button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

export default function AdminInbox() {
  const [toast, setToast] = useState({ type: "", msg: "" });
  const show = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast({ type: "", msg: "" }), 2200);
  };

  const [q, setQ] = useState({ search: "", isRead: "" }); // "" | "false" | "true"
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0 });
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  const qs = useMemo(() => {
    const p = new URLSearchParams();
    if (q.search.trim()) p.set("search", q.search.trim());
    if (q.isRead) p.set("isRead", q.isRead);
    p.set("page", String(pagination.page));
    p.set("limit", String(pagination.limit));
    return p.toString();
  }, [q, pagination.page, pagination.limit]);

  const load = async () => {
    setLoading(true);
    try {
      const data = await api(`/api/admin/messages?${qs}`);
      setItems(data.items || []);
      setPagination((s) => ({ ...s, total: data?.pagination?.total ?? 0 }));
    } catch (e) {
      show("err", e.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qs]);

  const totalPages = Math.max(1, Math.ceil((pagination.total || 0) / pagination.limit));

  const openItem = async (m) => {
    setActive(m);
    setOpen(true);
    if (!m.isRead) {
      try {
        const updated = await api(`/api/admin/messages/${m._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isRead: true }),
        });
        setItems((prev) => prev.map((x) => (x._id === m._id ? updated : x)));
      } catch {}
    }
  };

  const mark = async (m, isRead) => {
    try {
      const updated = await api(`/api/admin/messages/${m._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead }),
      });
      setItems((prev) => prev.map((x) => (x._id === m._id ? updated : x)));
      show("ok", isRead ? "Marked as read" : "Marked as unread");
    } catch (e) {
      show("err", e.message || "Update failed");
    }
  };

  const remove = async (m) => {
    const ok = window.confirm("Delete this message?");
    if (!ok) return;
    try {
      await api(`/api/admin/messages/${m._id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((x) => x._id !== m._id));
      show("ok", "Deleted");
    } catch (e) {
      show("err", e.message || "Delete failed");
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <div className="text-2xl font-extrabold">Applications / Inbox</div>
          <div className="mt-1 text-sm text-slate-600">
            Apply & contact messages (job info included if user came from job details).
          </div>
        </div>
      </div>

      <Card>
        <div className="p-5 md:p-6 grid md:grid-cols-4 gap-4">
          <label className="block md:col-span-2">
            <div className="text-sm font-semibold text-slate-700">Search</div>
            <input
              className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="name / phone / job title ..."
              value={q.search}
              onChange={(e) => setQ((s) => ({ ...s, search: e.target.value }))}
            />
          </label>

          <label className="block">
            <div className="text-sm font-semibold text-slate-700">Status</div>
            <select
              className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-400"
              value={q.isRead}
              onChange={(e) => setQ((s) => ({ ...s, isRead: e.target.value }))}
            >
              <option value="">All</option>
              <option value="false">Unread</option>
              <option value="true">Read</option>
            </select>
          </label>

          <div className="flex items-end gap-3">
            <button
              onClick={() => setPagination((s) => ({ ...s, page: 1 }))}
              className="w-full rounded-xl bg-slate-900 px-5 py-3 text-white font-semibold hover:bg-slate-800"
            >
              Apply
            </button>
            <button
              onClick={() => {
                setQ({ search: "", isRead: "" });
                setPagination((s) => ({ ...s, page: 1 }));
              }}
              className="w-full rounded-xl border px-5 py-3 font-semibold hover:bg-slate-50"
            >
              Reset
            </button>
          </div>
        </div>
      </Card>

      <Card>
        <div className="p-5 md:p-6 flex items-center justify-between gap-3">
          <div className="text-sm text-slate-600">
            Total: <span className="font-semibold">{pagination.total}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="rounded-xl border px-3 py-2 font-semibold hover:bg-slate-50 disabled:opacity-50"
              disabled={pagination.page <= 1}
              onClick={() => setPagination((s) => ({ ...s, page: Math.max(1, s.page - 1) }))}
            >
              Prev
            </button>
            <Badge>
              Page {pagination.page} / {Math.max(1, totalPages)}
            </Badge>
            <button
              className="rounded-xl border px-3 py-2 font-semibold hover:bg-slate-50 disabled:opacity-50"
              disabled={pagination.page >= totalPages}
              onClick={() => setPagination((s) => ({ ...s, page: Math.min(totalPages, s.page + 1) }))}
            >
              Next
            </button>
          </div>
        </div>

        <div className="border-t">
          {loading ? (
            <div className="p-6 text-slate-600">Loading...</div>
          ) : items.length ? (
            <div className="divide-y">
              {items.map((m) => (
                <div key={m._id} className="p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="font-bold truncate">
                        {m.name} {m.phone ? <span className="text-slate-500 font-semibold">• {m.phone}</span> : null}
                      </div>
                      {m.source === "apply" ? <Badge tone="green">Apply</Badge> : <Badge>Contact</Badge>}
                      {m.isRead ? <Badge>Read</Badge> : <Badge tone="red">Unread</Badge>}
                      {m.jobTitle ? <Badge>{m.jobTitle}</Badge> : null}
                      {m.jobCountry ? <Badge>{m.jobCountry}</Badge> : null}
                    </div>
                    <div className="mt-2 text-sm text-slate-600 line-clamp-2">
                      {m.message}
                    </div>
                    <div className="mt-2 text-xs text-slate-500">
                      {new Date(m.createdAt).toLocaleString()}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => openItem(m)}
                      className="rounded-xl border px-4 py-2 font-semibold hover:bg-slate-50"
                    >
                      View
                    </button>
                    <button
                      onClick={() => mark(m, !m.isRead)}
                      className="rounded-xl bg-slate-900 px-4 py-2 text-white font-semibold hover:bg-slate-800"
                    >
                      {m.isRead ? "Mark Unread" : "Mark Read"}
                    </button>
                    <button
                      onClick={() => remove(m)}
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
              <div className="text-lg font-semibold">No messages</div>
              <div className="mt-1 text-slate-600">When users apply/contact, messages will appear here.</div>
            </div>
          )}
        </div>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="Message details">
        {active ? (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge>{active.source === "apply" ? "Apply" : "Contact"}</Badge>
              {active.isRead ? <Badge>Read</Badge> : <Badge tone="red">Unread</Badge>}
              {active.jobTitle ? <Badge>{active.jobTitle}</Badge> : null}
              {active.jobCountry ? <Badge>{active.jobCountry}</Badge> : null}
            </div>

            <Card>
              <div className="p-5">
                <div className="font-bold">{active.name}</div>
                <div className="mt-1 text-sm text-slate-700">
                  {active.phone ? <div>Phone: {active.phone}</div> : null}
                  {active.email ? <div>Email: {active.email}</div> : null}
                </div>
                <div className="mt-4 text-slate-800 whitespace-pre-line">{active.message}</div>
              </div>
            </Card>

            <div className="flex gap-3">
              <button
                onClick={() => mark(active, false)}
                className="rounded-xl border px-5 py-3 font-semibold hover:bg-slate-50"
              >
                Mark Unread
              </button>
              <button
                onClick={() => mark(active, true)}
                className="rounded-xl bg-slate-900 px-5 py-3 text-white font-semibold hover:bg-slate-800"
              >
                Mark Read
              </button>
            </div>
          </div>
        ) : null}
      </Modal>

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
