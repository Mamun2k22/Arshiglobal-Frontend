import React, { useEffect, useMemo, useState } from "react";
import { api } from "../../lib/api";

const Badge = ({ children, tone = "slate" }) => {
  const cls =
    tone === "green"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
      : tone === "red"
      ? "bg-red-50 text-red-700 ring-red-100"
      : "bg-slate-100 text-slate-700 ring-slate-200";
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ring-1 ${cls}`}>
      {children}
    </span>
  );
};

const Button = ({ variant = "primary", className = "", ...props }) => {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold shadow-sm transition disabled:opacity-60";
  const cls =
    variant === "primary"
      ? "bg-slate-900 text-white hover:bg-slate-800"
      : variant === "secondary"
      ? "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
      : variant === "danger"
      ? "bg-red-600 text-white hover:bg-red-700"
      : "bg-slate-900 text-white";
  return <button className={`${base} ${cls} ${className}`} {...props} />;
};

const Input = (props) => (
  <input
    {...props}
    className={
      "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 " +
      "placeholder:text-slate-400 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100"
    }
  />
);

const Textarea = (props) => (
  <textarea
    {...props}
    className={
      "w-full min-h-[120px] resize-y rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 " +
      "placeholder:text-slate-400 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100"
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

const Modal = ({ open, title, children, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

const Banner = ({ type = "info", title, message }) => {
  const styles =
    type === "error"
      ? "border-red-200 bg-red-50 text-red-900"
      : type === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-900"
      : "border-slate-200 bg-slate-50 text-slate-900";
  return (
    <div className={`rounded-2xl border p-4 ${styles}`}>
      <div className="font-semibold">{title}</div>
      {message ? <div className="mt-1 text-sm opacity-90">{message}</div> : null}
    </div>
  );
};

const emptyForm = {
  question: "",
  answer: "",
  order: 0,
  isActive: true,
};

export default function AdminFaqs() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [items, setItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState("true"); // true | false | all
  const [q, setQ] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null); // faq object or null
  const [form, setForm] = useState(emptyForm);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const fetchFaqs = async () => {
    setLoading(true);
    setError("");
    setNotice("");
    try {
      const params = {};
      if (activeFilter !== "all") params.active = activeFilter;
      const { data } = await api.get("/api/faqs", { params });
      setItems(data?.items || []);
    } catch (e) {
      setError(e?.response?.data?.message || e.message || "Failed to load FAQs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return items;
    return items.filter((x) => {
      const a = (x.question || "").toLowerCase();
      const b = (x.answer || "").toLowerCase();
      return a.includes(term) || b.includes(term);
    });
  }, [items, q]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setError("");
    setNotice("");
    setModalOpen(true);
  };

  const openEdit = (faq) => {
    setEditing(faq);
    setForm({
      question: faq.question || "",
      answer: faq.answer || "",
      order: typeof faq.order === "number" ? faq.order : 0,
      isActive: !!faq.isActive,
    });
    setError("");
    setNotice("");
    setModalOpen(true);
  };

  const validate = () => {
    if (!form.question.trim()) return "Question is required.";
    if (!form.answer.trim()) return "Answer is required.";
    if (Number.isNaN(Number(form.order))) return "Order must be a number.";
    return "";
  };

  const saveFaq = async () => {
    const v = validate();
    if (v) {
      setError(v);
      setNotice("");
      return;
    }

    setSaving(true);
    setError("");
    setNotice("");

    const payload = {
      ...form,
      order: Number(form.order) || 0,
    };

    try {
      if (!editing?._id) {
        await api.post("/api/faqs", payload);
        setNotice("FAQ created successfully.");
      } else {
        await api.put(`/api/faqs/${editing._id}`, payload);
        setNotice("FAQ updated successfully.");
      }
      setModalOpen(false);
      await fetchFaqs();
    } catch (e) {
      setError(e?.response?.data?.message || e.message || "Failed to save FAQ.");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (faq) => {
    // optimistic UI
    setItems((prev) => prev.map((x) => (x._id === faq._id ? { ...x, isActive: !x.isActive } : x)));
    try {
      await api.patch(`/api/faqs/${faq._id}/toggle`);
    } catch (e) {
      // rollback
      setItems((prev) => prev.map((x) => (x._id === faq._id ? { ...x, isActive: faq.isActive } : x)));
      setError(e?.response?.data?.message || e.message || "Failed to toggle status.");
    }
  };

  const askDelete = (faq) => {
    setDeleting(faq);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleting?._id) return;
    setSaving(true);
    setError("");
    setNotice("");
    try {
      await api.delete(`/api/faqs/${deleting._id}`);
      setNotice("FAQ deleted successfully.");
      setDeleteOpen(false);
      setDeleting(null);
      await fetchFaqs();
    } catch (e) {
      setError(e?.response?.data?.message || e.message || "Failed to delete FAQ.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-full px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">FAQs</h1>
            <p className="mt-1 text-sm text-slate-600">
              Create, edit, order, and publish frequently asked questions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="secondary" onClick={fetchFaqs} disabled={loading || saving}>
              Refresh
            </Button>
            <Button onClick={openCreate} disabled={loading || saving}>
              + New FAQ
            </Button>
          </div>
        </div>

        {/* Alerts */}
        <div className="mb-5 space-y-3">
          {error ? <Banner type="error" title="Action required" message={error} /> : null}
          {notice ? <Banner type="success" title="Done" message={notice} /> : null}
        </div>

        {/* Toolbar */}
        <div className="mb-4 grid grid-cols-1 gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-3">
          <div className="md:col-span-1">
            <label className="text-xs font-semibold text-slate-500">Status</label>
            <div className="mt-1 flex gap-2">
              <button
                onClick={() => setActiveFilter("true")}
                className={`rounded-xl px-3 py-2 text-sm font-semibold ${
                  activeFilter === "true" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setActiveFilter("false")}
                className={`rounded-xl px-3 py-2 text-sm font-semibold ${
                  activeFilter === "false" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Inactive
              </button>
              <button
                onClick={() => setActiveFilter("all")}
                className={`rounded-xl px-3 py-2 text-sm font-semibold ${
                  activeFilter === "all" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                All
              </button>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-slate-500">Search</label>
            <div className="mt-1">
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by question or answer..."
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-4 py-3 text-sm font-semibold text-slate-900">
            FAQ List <span className="ml-2 text-slate-400">({filtered.length})</span>
          </div>

          {loading ? (
            <div className="p-6">
              <div className="h-24 animate-pulse rounded-xl bg-slate-100" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-10 text-center">
              <div className="text-lg font-semibold text-slate-900">No FAQs found</div>
              <div className="mt-1 text-sm text-slate-600">Try changing the filter or create a new FAQ.</div>
              <div className="mt-4">
                <Button onClick={openCreate}>+ New FAQ</Button>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filtered.map((faq) => (
                <div key={faq._id} className="p-4 hover:bg-slate-50">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-sm font-semibold text-slate-900">
                          {faq.question}
                        </h3>
                        <Badge tone={faq.isActive ? "green" : "red"}>
                          {faq.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <Badge>Order: {faq.order ?? 0}</Badge>
                      </div>
                      <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                        {faq.answer}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <Button variant="secondary" onClick={() => openEdit(faq)}>
                        Edit
                      </Button>

                      <button
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
                        onClick={() => toggleActive(faq)}
                        title="Toggle Active"
                      >
                        <span className="mr-2 text-xs text-slate-500">Active</span>
                        <Toggle checked={!!faq.isActive} onChange={() => toggleActive(faq)} />
                      </button>

                      <Button variant="danger" onClick={() => askDelete(faq)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Create/Edit Modal */}
        <Modal
          open={modalOpen}
          title={editing?._id ? "Edit FAQ" : "Create FAQ"}
          onClose={() => (!saving ? setModalOpen(false) : null)}
        >
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">Question</label>
              <div className="mt-1">
                <Input
                  value={form.question}
                  onChange={(e) => setForm((p) => ({ ...p, question: e.target.value }))}
                  placeholder="Enter question..."
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">Answer</label>
              <div className="mt-1">
                <Textarea
                  value={form.answer}
                  onChange={(e) => setForm((p) => ({ ...p, answer: e.target.value }))}
                  placeholder="Enter answer..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-slate-700">Order</label>
                <div className="mt-1">
                  <Input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm((p) => ({ ...p, order: e.target.value }))}
                    placeholder="0"
                  />
                </div>
                <p className="mt-1 text-xs text-slate-500">Lower order appears first.</p>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">Active</label>
                <div className="mt-2 flex items-center gap-3">
                  <Toggle
                    checked={!!form.isActive}
                    onChange={(v) => setForm((p) => ({ ...p, isActive: v }))}
                  />
                  <span className="text-sm text-slate-700">{form.isActive ? "Active" : "Inactive"}</span>
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() => setModalOpen(false)}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button onClick={saveFaq} disabled={saving}>
                {saving ? "Saving..." : editing?._id ? "Save Changes" : "Create FAQ"}
              </Button>
            </div>
          </div>
        </Modal>

        {/* Delete confirm */}
        <Modal
          open={deleteOpen}
          title="Delete FAQ"
          onClose={() => (!saving ? setDeleteOpen(false) : null)}
        >
          <div className="space-y-4">
            <p className="text-sm text-slate-700">
              Are you sure you want to delete this FAQ? This action cannot be undone.
            </p>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="text-sm font-semibold text-slate-900">{deleting?.question}</div>
              <div className="mt-1 text-sm text-slate-600 line-clamp-2">{deleting?.answer}</div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button variant="secondary" onClick={() => setDeleteOpen(false)} disabled={saving}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDelete} disabled={saving}>
                {saving ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
