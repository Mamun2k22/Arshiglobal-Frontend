import useSiteSettings from "../hooks/useSiteSettings";
import { Link } from "react-router-dom";

export default function Footer() {
  const s = useSiteSettings();

  return (
    <footer className="border-t bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <div className="font-semibold text-lg">{s?.siteName || "Arshiglobal"}</div>
          <p className="mt-2 text-sm text-slate-600">
            {s?.footerText || "We help you with job visa guidance, documentation and submission."}
          </p>
        </div>

        <div className="text-sm">
          <div className="font-semibold mb-2">Links</div>
          <div className="grid gap-2 text-slate-700">
            <Link to="/jobs" className="hover:underline">Jobs</Link>
            <Link to="/services" className="hover:underline">Services</Link>
            <Link to="/media" className="hover:underline">Media</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
          </div>
        </div>

        <div className="text-sm">
          <div className="font-semibold mb-2">Contact</div>
          <div className="space-y-1 text-slate-700">
            <div>{s?.address || "Dhaka, Bangladesh"}</div>
            <div>{s?.phone || "+880..."}</div>
            <div>{s?.email || "info@example.com"}</div>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-slate-500 py-4">
        © {new Date().getFullYear()} {s?.siteName || "Arshiglobal"}
      </div>
    </footer>
  );
}
