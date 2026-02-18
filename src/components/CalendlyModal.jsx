import { useEffect } from "react";

export default function CalendlyModal({ open, onClose, url }) {
  useEffect(() => {
    if (!open) return;

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <div className="text-lg font-bold">Book Consultation</div>
            <div className="text-sm text-slate-500">
              Select your preferred date and time
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg border px-3 py-1.5 text-sm font-semibold hover:bg-slate-50"
          >
            Close
          </button>
        </div>

        {/* Calendly */}
        <div className="p-2">
          <div
            className="calendly-inline-widget"
            data-url={url}
            style={{ minWidth: "320px", height: "500px" }}
          />
        </div>
      </div>
    </div>
  );
}
