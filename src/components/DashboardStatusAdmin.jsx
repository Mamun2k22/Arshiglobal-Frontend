import { useEffect, useMemo, useState } from "react";

const API_BASE = (import.meta.env.VITE_APP_SERVER_URL || "").replace(/\/$/, "");

async function getJSON(path) {
  const res = await fetch(`${API_BASE}${path.startsWith("/") ? "" : "/"}${path}`, {
    credentials: "include",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || "Request failed");
  return data;
}

function Card({ title, value, sub, right }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-slate-600">{title}</div>
          <div className="mt-2 text-3xl font-extrabold text-slate-900">{value}</div>
          {sub ? <div className="mt-1 text-xs text-slate-500">{sub}</div> : null}
        </div>
        {right ? <div className="text-slate-400">{right}</div> : null}
      </div>
    </div>
  );
}

function Pill({ children, tone = "slate" }) {
  const cls =
    tone === "emerald"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : tone === "amber"
      ? "bg-amber-50 text-amber-800 border-amber-200"
      : tone === "rose"
      ? "bg-rose-50 text-rose-700 border-rose-200"
      : "bg-slate-50 text-slate-700 border-slate-200";

  return <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-bold ${cls}`}>{children}</span>;
}

export default function DashboardStatus() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [stats, setStats] = useState({
    jobs: 0,
    applications: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    contacts: 0,
    newsletter: 0,
    recent: [],
  });

  const fetchAll = async () => {
    setLoading(true);
    setErr("");
    try {
      // ✅ আপনার backend অনুযায়ী endpoints adjust করতে পারেন
      // Suggested endpoints:
      // /api/admin/stats -> { jobs, applications, pending, approved, rejected, contacts, newsletter }
      // /api/applications?limit=8&sort=-createdAt -> { items: [...] }

      const [s, recent] = await Promise.all([
        getJSON("/api/admin/stats"),
        getJSON("/api/applications?limit=8"),
      ]);

      setStats({
        jobs: s?.jobs ?? 0,
        applications: s?.applications ?? 0,
        pending: s?.pending ?? 0,
        approved: s?.approved ?? 0,
        rejected: s?.rejected ?? 0,
        contacts: s?.contacts ?? 0,
        newsletter: s?.newsletter ?? 0,
        recent: recent?.items ?? recent ?? [],
      });
    } catch (e) {
      setErr(e.message || "Failed to load dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const headline = useMemo(() => {
    return `Overview of your platform activity`;
  }, []);

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-2xl font-extrabold text-slate-900">Dashboard</div>
          <div className="mt-1 text-sm text-slate-600">{headline}</div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchAll}
            disabled={loading}
            className="rounded-xl border bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>
      </div>

      {err ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-800">
          <div className="font-bold">Something went wrong</div>
          <div className="text-sm mt-1">{err}</div>
        </div>
      ) : null}

      {/* Stats grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card title="Total Jobs" value={loading ? "—" : stats.jobs} sub="Published job posts" />
        <Card title="Total Applications" value={loading ? "—" : stats.applications} sub="All applicants" />
        <Card title="Pending Review" value={loading ? "—" : stats.pending} sub="Needs action" />
        <Card title="Approved / Rejected" value={loading ? "—" : `${stats.approved} / ${stats.rejected}`} sub="Decision stats" />
      </div>

      {/* Secondary */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="font-bold text-slate-900">Quick Actions</div>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a className="rounded-xl border px-4 py-3 font-semibold hover:bg-slate-50" href="/dashboard/jobs">
              ➕ Add / Manage Jobs
            </a>
            <a className="rounded-xl border px-4 py-3 font-semibold hover:bg-slate-50" href="/dashboard/faqs">
              🧾 Manage FAQs
            </a>
            <a className="rounded-xl border px-4 py-3 font-semibold hover:bg-slate-50" href="/dashboard/site-settings">
              ⚙️ Site Settings
            </a>
            <a className="rounded-xl border px-4 py-3 font-semibold hover:bg-slate-50" href="/dashboard/newsletter">
              ✉️ Newsletter
            </a>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Pill tone="emerald">Approved: {loading ? "—" : stats.approved}</Pill>
            <Pill tone="amber">Pending: {loading ? "—" : stats.pending}</Pill>
            <Pill tone="rose">Rejected: {loading ? "—" : stats.rejected}</Pill>
            <Pill>Contacts: {loading ? "—" : stats.contacts}</Pill>
            <Pill>Subscribers: {loading ? "—" : stats.newsletter}</Pill>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="font-bold text-slate-900">Recent Applications</div>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-600">
                  <th className="py-2">Name</th>
                  <th className="py-2">Job</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {(loading ? Array.from({ length: 6 }) : stats.recent).map((row, idx) => {
                  if (loading) {
                    return (
                      <tr key={idx} className="border-t">
                        <td className="py-3"><div className="h-4 w-28 rounded bg-slate-100 animate-pulse" /></td>
                        <td className="py-3"><div className="h-4 w-32 rounded bg-slate-100 animate-pulse" /></td>
                        <td className="py-3"><div className="h-4 w-20 rounded bg-slate-100 animate-pulse" /></td>
                        <td className="py-3"><div className="h-4 w-24 rounded bg-slate-100 animate-pulse" /></td>
                      </tr>
                    );
                  }

                  const status = row?.status || "pending";
                  const tone =
                    status === "approved" ? "emerald" : status === "rejected" ? "rose" : "amber";

                  const created =
                    row?.createdAt ? new Date(row.createdAt).toLocaleDateString() : "—";

                  return (
                    <tr key={row?._id || idx} className="border-t">
                      <td className="py-3 font-semibold text-slate-900">{row?.name || "—"}</td>
                      <td className="py-3 text-slate-700">{row?.jobTitle || row?.job?.title || "—"}</td>
                      <td className="py-3">
                        <Pill tone={tone}>{status}</Pill>
                      </td>
                      <td className="py-3 text-slate-600">{created}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {!loading && (!stats.recent || stats.recent.length === 0) ? (
              <div className="mt-4 rounded-xl border bg-slate-50 p-4 text-slate-600">
                No applications yet.
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
