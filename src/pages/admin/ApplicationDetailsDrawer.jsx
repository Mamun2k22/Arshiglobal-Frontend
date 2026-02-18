import { useEffect } from "react";

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
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-bold ${cls}`}>
      {children}
    </span>
  );
}

const toneFor = (st) =>
  st === "approved" ? "emerald" : st === "rejected" ? "rose" : st === "reviewing" ? "slate" : "amber";

const Row = ({ label, value, mono }) => (
  <div className="grid grid-cols-3 gap-3 py-2 border-b last:border-b-0">
    <div className="text-xs font-bold text-slate-500">{label}</div>
    <div className={`col-span-2 text-sm text-slate-900 ${mono ? "font-mono" : ""}`}>
      {value || <span className="text-slate-400">—</span>}
    </div>
  </div>
);

export default function ApplicationDetailsDrawer({
  open,
  onClose,
  item,
  saving,
  onUpdateStatus,
  onUpdateNote,
}) {
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    if (open) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open || !item) return null;

  const st = item.status || "pending";
  const created = item.createdAt ? new Date(item.createdAt).toLocaleString() : "—";
  const updated = item.updatedAt ? new Date(item.updatedAt).toLocaleString() : "—";

  const copy = async (txt) => {
    try {
      await navigator.clipboard.writeText(txt);
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-[999]">
      {/* overlay */}
      <div onClick={onClose} className="absolute inset-0 bg-black/50" />

      {/* panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-xl bg-white shadow-2xl flex flex-col">
        <div className="p-5 border-b flex items-start justify-between gap-3">
          <div>
            <div className="text-lg font-extrabold text-slate-900">Application Details</div>
            <div className="mt-1 flex items-center gap-2">
              <Pill tone={toneFor(st)}>{st}</Pill>
              <span className="text-xs text-slate-500">ID: {item._id}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border px-3 py-1.5 text-sm font-semibold hover:bg-slate-50"
          >
            Close
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-5">
          {/* Applicant */}
          <div className="rounded-2xl border p-4">
            <div className="font-bold text-slate-900 mb-2">Applicant</div>
            <Row label="Full Name" value={item.fullName} />
            <div className="grid grid-cols-3 gap-3 py-2 border-b">
              <div className="text-xs font-bold text-slate-500">Email</div>
              <div className="col-span-2 flex items-center justify-between gap-2">
                <div className="text-sm text-slate-900">{item.email || "—"}</div>
                {item.email ? (
                  <button onClick={() => copy(item.email)} className="text-xs font-bold text-emerald-700 hover:underline">
                    Copy
                  </button>
                ) : null}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 py-2 border-b">
              <div className="text-xs font-bold text-slate-500">Phone</div>
              <div className="col-span-2 flex items-center justify-between gap-2">
                <div className="text-sm text-slate-900">{item.phone || "—"}</div>
                {item.phone ? (
                  <button onClick={() => copy(item.phone)} className="text-xs font-bold text-emerald-700 hover:underline">
                    Copy
                  </button>
                ) : null}
              </div>
            </div>

            <Row label="Passport" value={item.passportNumber} mono />
            <Row label="Education" value={item.education} />
            <Row label="Experience" value={item.experience} />
          </div>

          {/* Job */}
          <div className="rounded-2xl border p-4">
            <div className="font-bold text-slate-900 mb-2">Job</div>
            <Row label="Title" value={item.job?.title || item.jobTitle} />
            <Row label="Country" value={item.job?.country} />
            <Row label="Category" value={item.job?.category} />
          </div>

          {/* Message */}
          <div className="rounded-2xl border p-4">
            <div className="font-bold text-slate-900 mb-2">Message</div>
            <div className="text-sm text-slate-700 whitespace-pre-line">
              {item.message || <span className="text-slate-400">—</span>}
            </div>
          </div>

          {/* CV */}
          <div className="rounded-2xl border p-4">
            <div className="font-bold text-slate-900 mb-2">CV / Attachment</div>
            {item.cvUrl ? (
              <a
                href={item.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-white text-sm font-bold hover:bg-slate-800"
              >
                Open CV Link
              </a>
            ) : (
              <div className="text-sm text-slate-500">No CV provided</div>
            )}
          </div>

          {/* Admin Controls */}
          <div className="rounded-2xl border p-4">
            <div className="font-bold text-slate-900 mb-3">Admin Controls</div>

            <div className="grid gap-3">
              <label className="text-xs font-bold text-slate-600">Status</label>
              <select
                className="rounded-xl border px-3 py-2 font-semibold"
                value={st}
                disabled={saving}
                onChange={(e) => onUpdateStatus?.(e.target.value)}
              >
                <option value="pending">pending</option>
                <option value="reviewing">reviewing</option>
                <option value="approved">approved</option>
                <option value="rejected">rejected</option>
              </select>

              <label className="text-xs font-bold text-slate-600">Admin Note</label>
              <textarea
                className="min-h-[90px] rounded-xl border px-3 py-2 text-sm"
                defaultValue={item.adminNote || ""}
                disabled={saving}
                onBlur={(e) => onUpdateNote?.(e.target.value)}
                placeholder="Write internal note..."
              />

              <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 pt-2">
                <div>
                  <div className="font-bold text-slate-500">Created</div>
                  <div>{created}</div>
                </div>
                <div>
                  <div className="font-bold text-slate-500">Updated</div>
                  <div>{updated}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="p-4 border-t bg-white flex items-center justify-between">
          <div className="text-xs text-slate-500">Tip: Press ESC to close</div>
          <button onClick={onClose} className="rounded-xl bg-slate-900 px-4 py-2 text-white text-sm font-bold hover:bg-slate-800">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
