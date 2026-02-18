import { useEffect, useMemo, useState } from "react";

const API_BASE = (import.meta.env.VITE_APP_SERVER_URL || "").replace(/\/$/, "");

async function apiFetch(path, opts = {}) {
  const res = await fetch(`${API_BASE}${path.startsWith("/") ? "" : "/"}${path}`, {
    credentials: "include",
    ...opts,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || "Request failed");
  return data;
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
      {children}
    </span>
  );
}

function Card({ children }) {
  return <div className="rounded-2xl border bg-white shadow-sm">{children}</div>;
}

function Input({ label, ...props }) {
  return (
    <label className="block">
      {label ? <div className="text-sm font-semibold text-slate-700">{label}</div> : null}
      <input
        {...props}
        className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-400"
      />
    </label>
  );
}

function Textarea({ label, ...props }) {
  return (
    <label className="block">
      {label ? <div className="text-sm font-semibold text-slate-700">{label}</div> : null}
      <textarea
        {...props}
        className="mt-2 w-full rounded-xl border px-4 py-3 min-h-[120px] outline-none focus:ring-2 focus:ring-emerald-400"
      />
    </label>
  );
}

function PillInput({ label, items, setItems, placeholder }) {
  const [v, setV] = useState("");

  const add = () => {
    const t = v.trim();
    if (!t) return;
    setItems([...(items || []), t]);
    setV("");
  };

  const remove = (i) => setItems((items || []).filter((_, idx) => idx !== i));

  return (
    <div>
      <div className="text-sm font-semibold text-slate-700">{label}</div>
      <div className="mt-2 flex gap-2">
        <input
          value={v}
          onChange={(e) => setV(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
          placeholder={placeholder}
          className="flex-1 rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <button
          type="button"
          onClick={add}
          className="rounded-xl bg-slate-900 px-4 py-3 text-white font-semibold hover:bg-slate-800"
        >
          Add
        </button>
      </div>

      {(items?.length || 0) > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {items.map((x, i) => (
            <span
              key={`${x}-${i}`}
              className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-sm"
            >
              {x}
              <button
                type="button"
                onClick={() => remove(i)}
                className="text-slate-500 hover:text-rose-600"
                title="Remove"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Modal({ open, title, children, onClose }) {
  // ✅ body scroll lock (design only)
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [open]);

  // ✅ ESC close (optional but UI-friendly; remove if you want)
  useEffect(() => {
    if (!open) return;
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999]">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* center wrapper */}
      <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4">
        {/* modal box */}
        <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl border overflow-hidden max-h-[92vh] flex flex-col">
          {/* header (fixed) */}
          <div className="p-5 border-b flex items-center justify-between shrink-0">
            <div className="text-lg font-bold">{title}</div>
            <button
              onClick={onClose}
              className="rounded-xl border px-3 py-1.5 font-semibold hover:bg-slate-50"
              type="button"
            >
              Close
            </button>
          </div>

          {/* ✅ body scroll */}
          <div className="p-5 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}


export default function AdminJobsManage() {
  const [toast, setToast] = useState({ type: "", msg: "" });

  const show = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast({ type: "", msg: "" }), 2200);
  };

  // filters
  const [q, setQ] = useState({ search: "", country: "", category: "" });

  // list state
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0 });

  // modal state
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    title: "",
    country: "",
    category: "",
    salary: "",
    accommodation: "",
    food: "",
    description: "",
    requirements: [],
    benefits: [],
    isActive: true,
  });

  const queryString = useMemo(() => {
    const p = new URLSearchParams();
    if (q.search.trim()) p.set("search", q.search.trim());
    if (q.country.trim()) p.set("country", q.country.trim());
    if (q.category.trim()) p.set("category", q.category.trim());
    p.set("page", String(pagination.page || 1));
    p.set("limit", String(pagination.limit || 20));
    return p.toString();
  }, [q, pagination.page, pagination.limit]);

  const load = async () => {
    setLoading(true);
    try {
      const data = await apiFetch(`/api/jobs?${queryString}`);
      setItems(data?.items || []);
      setPagination((s) => ({
        ...s,
        total: data?.pagination?.total ?? (data?.items?.length || 0),
        page: data?.pagination?.page ?? s.page,
        limit: data?.pagination?.limit ?? s.limit,
      }));
    } catch (e) {
      show("err", e.message || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString]);

  const openCreate = () => {
    setEditing(null);
    setForm({
      title: "",
      country: "",
      category: "",
      salary: "",
      accommodation: "",
      food: "",
      description: "",
      requirements: [],
      benefits: [],
      isActive: true,
    });
    setOpen(true);
  };

  const openEdit = (job) => {
    setEditing(job);
    setForm({
      title: job.title || "",
      country: job.country || "",
      category: job.category || "",
      salary: job.salary || "",
      accommodation: job.accommodation || "",
      food: job.food || "",
      description: job.description || "",
      requirements: job.requirements || [],
      benefits: job.benefits || [],
      isActive: job.isActive ?? true,
    });
    setOpen(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        requirements: (form.requirements || []).filter(Boolean),
        benefits: (form.benefits || []).filter(Boolean),
      };

      if (!editing?._id) {
        // create
        await apiFetch("/api/jobs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        show("ok", "Job created");
      } else {
        // update (PATCH preferred, fallback to PUT)
        try {
          await apiFetch(`/api/jobs/${editing._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        } catch {
          await apiFetch(`/api/jobs/${editing._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        }
        show("ok", "Job updated");
      }

      setOpen(false);
      await load();
    } catch (e) {
      show("err", e.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (job) => {
    const next = !(job.isActive ?? true);
    try {
      // try PATCH
      try {
        await apiFetch(`/api/jobs/${job._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isActive: next }),
        });
      } catch {
        await apiFetch(`/api/jobs/${job._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isActive: next }),
        });
      }
      show("ok", next ? "Activated" : "Deactivated");
      await load();
    } catch (e) {
      show("err", e.message || "Update failed");
    }
  };

  const remove = async (job) => {
    const ok = window.confirm(`Delete job: "${job.title}" ?`);
    if (!ok) return;
    try {
      await apiFetch(`/api/jobs/${job._id}`, { method: "DELETE" });
      show("ok", "Deleted");
      await load();
    } catch (e) {
      show("err", e.message || "Delete failed");
    }
  };

  const totalPages = Math.max(1, Math.ceil((pagination.total || 0) / (pagination.limit || 20)));

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <div className="text-2xl font-extrabold">Jobs Manager</div>
          <div className="mt-1 text-sm text-slate-600">
            Create, edit, activate/deactivate and delete jobs.
          </div>
        </div>
        <button
          onClick={openCreate}
          className="rounded-3xl bg-emerald-600 px-3 py-1.5 text-white font-medium hover:bg-emerald-700"
        >
          + Add Job
        </button>
      </div>

      {/* filters */}
      <Card>
        <div className="p-5 md:p-6 grid md:grid-cols-4 gap-4">
          <Input
            label="Search"
            placeholder="title / keyword"
            value={q.search}
            onChange={(e) => setQ((s) => ({ ...s, search: e.target.value }))}
          />
          <Input
            label="Country"
            placeholder="Serbia"
            value={q.country}
            onChange={(e) => setQ((s) => ({ ...s, country: e.target.value }))}
          />
          <Input
            label="Category"
            placeholder="Factory"
            value={q.category}
            onChange={(e) => setQ((s) => ({ ...s, category: e.target.value }))}
          />
          <div className="flex items-end gap-3">
            <button
              onClick={() => setPagination((s) => ({ ...s, page: 1 }))}
              className="w-full rounded-xl bg-slate-900 px-5 py-2 text-white font-medium hover:bg-slate-800"
            >
              Apply
            </button>
            <button
              onClick={() => {
                setQ({ search: "", country: "", category: "" });
                setPagination((s) => ({ ...s, page: 1 }));
              }}
              className="w-full rounded-xl border px-5 py-2 font-medium hover:bg-slate-50"
            >
              Reset
            </button>
          </div>
        </div>
      </Card>

      {/* list */}
      <Card>
        <div className="p-5 md:p-6 flex items-center justify-between gap-3">
          <div className="text-sm text-slate-600">
            Showing <span className="font-semibold">{items.length}</span> of{" "}
            <span className="font-semibold">{pagination.total}</span>
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
              Page {pagination.page} / {totalPages}
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
              {items.map((j) => (
                <div key={j._id} className="p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="font-bold text-lg truncate">{j.title}</div>
                      <Badge>{j.country}</Badge>
                      <Badge>{j.category}</Badge>
                      {j.salary ? <Badge>{j.salary}</Badge> : null}
                      <Badge>{(j.isActive ?? true) ? "Active" : "Inactive"}</Badge>
                    </div>
                    {j.description ? (
                      <div className="mt-2 text-sm text-slate-600 line-clamp-2">
                        {j.description}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => openEdit(j)}
                      className="rounded-xl border px-4 py-1 font-medium hover:bg-slate-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => toggleActive(j)}
                      className="rounded-xl bg-slate-900 px-4 py-1 text-white font-medium hover:bg-slate-800"
                    >
                      {(j.isActive ?? true) ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      onClick={() => remove(j)}
                      className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-1 font-medium text-rose-700 hover:bg-rose-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 text-center">
              <div className="text-lg font-semibold">No jobs found</div>
              <div className="mt-1 text-slate-600">Try changing filters or add a new job.</div>
              <button
                onClick={openCreate}
                className="mt-5 rounded-xl bg-emerald-600 px-5 py-3 text-white font-semibold hover:bg-emerald-700"
              >
                + Add Job
              </button>
            </div>
          )}
        </div>
      </Card>

      {/* modal */}
      <Modal
        open={open}
        title={editing?._id ? "Edit Job" : "Add New Job"}
        onClose={() => setOpen(false)}
      >
        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Title" value={form.title} onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))} />
          <Input label="Country" value={form.country} onChange={(e) => setForm((s) => ({ ...s, country: e.target.value }))} />
          <Input label="Category" value={form.category} onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))} />
          <Input label="Salary" value={form.salary} onChange={(e) => setForm((s) => ({ ...s, salary: e.target.value }))} />
          <Input label="Accommodation" value={form.accommodation} onChange={(e) => setForm((s) => ({ ...s, accommodation: e.target.value }))} />
          <Input label="Food" value={form.food} onChange={(e) => setForm((s) => ({ ...s, food: e.target.value }))} />

          <div className="md:col-span-2">
            <Textarea
              label="Description"
              value={form.description}
              onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
            />
          </div>

          <div className="md:col-span-2">
            <PillInput
              label="Requirements"
              items={form.requirements}
              setItems={(arr) => setForm((s) => ({ ...s, requirements: arr }))}
              placeholder="e.g. Age 18-45"
            />
          </div>

          <div className="md:col-span-2">
            <PillInput
              label="Benefits"
              items={form.benefits}
              setItems={(arr) => setForm((s) => ({ ...s, benefits: arr }))}
              placeholder="e.g. Accommodation"
            />
          </div>

          <div className="md:col-span-2 flex items-center justify-between gap-3 pt-2">
            <label className="inline-flex items-center gap-2 font-semibold">
              <input
                type="checkbox"
                checked={!!form.isActive}
                onChange={(e) => setForm((s) => ({ ...s, isActive: e.target.checked }))}
              />
              Active
            </label>

            <div className="flex gap-3">
              <button
                onClick={() => setOpen(false)}
                className="rounded-xl border px-5 py-3 font-semibold hover:bg-slate-50"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="rounded-xl bg-emerald-600 px-5 py-3 text-white font-semibold hover:bg-emerald-700 disabled:opacity-60"
                type="button"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* toast */}
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
