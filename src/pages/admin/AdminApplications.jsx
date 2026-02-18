import { useEffect, useMemo, useState } from "react";
import { apiJSON } from "../../lib/http";
import ApplicationDetailsDrawer from "../admin/ApplicationDetailsDrawer";

function Pill({ children, tone = "slate" }) {
  const cls =
    tone === "emerald"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : tone === "amber"
      ? "bg-amber-50 text-amber-800 border-amber-200"
      : tone === "rose"
      ? "bg-rose-50 text-rose-700 border-rose-200"
      : "bg-slate-50 text-slate-700 border-slate-200";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-bold ${cls}`}
    >
      {children}
    </span>
  );
}

const toneFor = (st) =>
  st === "approved"
    ? "emerald"
    : st === "rejected"
    ? "rose"
    : st === "reviewing"
    ? "slate"
    : "amber";

export default function AdminApplications() {
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState("");
  const [err, setErr] = useState("");
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [items, setItems] = useState([]);

  const [openDetails, setOpenDetails] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const load = async () => {
    setLoading(true);
    setErr("");
    try {
      const data = await apiJSON("/api/applications");
      const list = Array.isArray(data) ? data : data.items || [];
      setItems(list);
    } catch (e) {
      setErr(e.message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const text = q.trim().toLowerCase();
    return items.filter((x) => {
      const st = x.status || "pending";
      const sOk = status === "all" ? true : st === status;
      if (!sOk) return false;

      if (!text) return true;

      const hay = [
        x.fullName,
        x.email,
        x.phone,
        x.job?.title,
        x.jobTitle,
        x.passportNumber,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return hay.includes(text);
    });
  }, [items, q, status]);

  const update = async (id, patch) => {
    setSavingId(id);
    try {
      const updated = await apiJSON(`/api/applications/${id}`, {
        method: "PUT",
        body: patch,
      });

      // update table list
      setItems((prev) => prev.map((x) => (x._id === id ? updated : x)));

      // update open drawer item too
      setActiveItem((cur) => (cur?._id === id ? updated : cur));
    } catch (e) {
      alert(e.message || "Update failed");
    } finally {
      setSavingId("");
    }
  };

  const openDrawer = (x) => {
    setActiveItem(x);
    setOpenDetails(true);
  };

  return (
    <div className="p-4 md:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-2xl font-extrabold">Applications</div>
          <div className="text-sm text-slate-600 mt-1">
            Manage job applications and update status.
          </div>
        </div>
        <button
          onClick={load}
          className="rounded-xl border px-4 py-2 font-semibold hover:bg-slate-50"
          disabled={loading}
        >
          Refresh
        </button>
      </div>

      {/* Error */}
      {err ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-800">
          <div className="font-bold">Error</div>
          <div className="text-sm mt-1">{err}</div>
        </div>
      ) : null}

      {/* Filter Bar */}
      <div className="rounded-2xl border bg-white p-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <input
          className="w-full md:max-w-md rounded-xl border px-4 py-2.5"
          placeholder="Search name, email, phone, job title..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        <div className="flex items-center gap-2">
          <select
            className="rounded-xl border px-3 py-2.5 font-semibold"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="reviewing">Reviewing</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <div className="text-sm text-slate-600">
            Total:{" "}
            <span className="font-bold text-slate-900">{filtered.length}</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border bg-white shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th className="text-left px-4 py-3">Applicant</th>
              <th className="text-left px-4 py-3">Job</th>
              <th className="text-left px-4 py-3">Status</th>
              {/* <th className="text-left px-4 py-3">Note</th> */}
              <th className="text-left px-4 py-3">Date</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-4">
                    <div className="h-4 w-40 bg-slate-100 rounded animate-pulse" />
                    <div className="h-3 w-52 bg-slate-100 rounded animate-pulse mt-2" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-4 w-44 bg-slate-100 rounded animate-pulse" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-4 w-24 bg-slate-100 rounded animate-pulse" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-10 w-64 bg-slate-100 rounded animate-pulse" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-4 w-20 bg-slate-100 rounded animate-pulse" />
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="h-8 w-28 bg-slate-100 rounded animate-pulse ml-auto" />
                  </td>
                </tr>
              ))
            ) : filtered.length ? (
              filtered.map((x) => {
                const st = x.status || "pending";
                const date = x.createdAt
                  ? new Date(x.createdAt).toLocaleDateString()
                  : "—";

                return (
                  <tr key={x._id} className="border-t">
                    <td className="px-4 py-4">
                      <div className="font-extrabold text-slate-900">
                        {x.fullName || "—"}
                      </div>
                      <div className="text-xs text-slate-600">
                        {x.email || "—"}
                      </div>
                      {x.phone ? (
                        <div className="text-xs text-slate-600">{x.phone}</div>
                      ) : null}
                    </td>

                    <td className="px-4 py-4">
                      <div className="font-semibold text-slate-900">
                        {x.job?.title || x.jobTitle || "—"}
                      </div>
                      {x.job?.country ? (
                        <div className="text-xs text-slate-600">
                          {x.job.country}
                        </div>
                      ) : null}
                    </td>

                    <td className="px-4 py-4">
                      <Pill tone={toneFor(st)}>{st}</Pill>
                      <div className="mt-2">
                        <select
                          className="rounded-xl border px-3 py-2 text-xs font-bold"
                          value={st}
                          disabled={savingId === x._id}
                          onChange={(e) =>
                            update(x._id, { status: e.target.value })
                          }
                        >
                          <option value="pending">pending</option>
                          <option value="reviewing">reviewing</option>
                          <option value="approved">approved</option>
                          <option value="rejected">rejected</option>
                        </select>
                      </div>
                    </td>

                    {/* <td className="px-4 py-4">
                      <textarea
                        className="w-56 md:w-72 rounded-xl border px-3 py-2 text-xs"
                        placeholder="Admin note..."
                        defaultValue={x.adminNote || ""}
                        onBlur={(e) =>
                          update(x._id, { adminNote: e.target.value })
                        }
                        disabled={savingId === x._id}
                      />
                    </td> */}

                    <td className="px-4 py-4 text-slate-700">{date}</td>

                    <td className="px-4 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => openDrawer(x)}
                          className="rounded-xl border px-3 py-2 text-xs font-extrabold hover:bg-slate-50"
                        >
                          View
                        </button>

                        <button
                          onClick={() => update(x._id, { status: "reviewing" })}
                          disabled={savingId === x._id}
                          className="rounded-xl bg-slate-900 px-3 py-2 text-white text-xs font-extrabold hover:bg-slate-800 disabled:opacity-60"
                        >
                          {savingId === x._id ? "Saving..." : "Mark Reviewing"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-slate-600">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Details Drawer */}
      <ApplicationDetailsDrawer
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        item={activeItem}
        saving={!!savingId}
        onUpdateStatus={(st) => {
          if (!activeItem?._id) return;
          update(activeItem._id, { status: st });
        }}
        onUpdateNote={(note) => {
          if (!activeItem?._id) return;
          update(activeItem._id, { adminNote: note });
        }}
      />
    </div>
  );
}
