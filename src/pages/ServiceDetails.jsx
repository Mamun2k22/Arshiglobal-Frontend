import { Link, useLoaderData } from "react-router-dom";

function Badge({ children }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
      {children}
    </span>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export default function ServiceDetails() {
  const service = useLoaderData();

  if (!service?._id) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-2xl border bg-white p-10 text-center">
          <div className="text-lg font-semibold">Service not found</div>
          <p className="mt-2 text-slate-600">The service you’re looking for doesn’t exist.</p>
          <Link
            to="/services"
            className="mt-5 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-white font-semibold hover:bg-slate-800"
          >
            Back to services
          </Link>
        </div>
      </div>
    );
  }

  const imgSrc =
    service.image && service.image.startsWith("http")
      ? service.image
      : service.image
      ? `${import.meta.env.VITE_API_URL}${service.image}`
      : null;

  return (
    <div>
      {/* Top header */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex items-center gap-2 text-sm text-slate-200">
            <Link className="hover:underline" to="/">Home</Link>
            <span>›</span>
            <Link className="hover:underline" to="/services">Services</Link>
            <span>›</span>
            <span className="text-slate-100">{service.title}</span>
          </div>

          <div className="mt-4 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <Badge>Service details</Badge>
              <h1 className="mt-3 text-3xl md:text-4xl font-extrabold leading-tight">
                {service.title}
              </h1>
              <p className="mt-3 text-slate-200 max-w-2xl">
                {service.shortDescription || "End-to-end guidance from documentation to submission."}
              </p>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 font-semibold hover:bg-emerald-600"
            >
              Get consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden">
              <div className="h-64 bg-slate-100">
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt={service.title}
                    className="h-64 w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="h-64 w-full grid place-items-center text-slate-500">
                    No image
                  </div>
                )}
              </div>

              <div className="p-6 md:p-8">
                <h2 className="text-xl font-bold">Overview</h2>
                <p className="mt-3 text-slate-700 leading-relaxed whitespace-pre-line">
                  {service.description || "Details will be added soon."}
                </p>
              </div>
            </Card>

            {/* Work process block (nice UX even if static) */}
            <Card>
              <div className="p-6 md:p-8">
                <h3 className="text-lg font-bold">How it works</h3>
                <p className="mt-2 text-slate-600">
                  A simple process we follow for most services.
                </p>
                <div className="mt-5 grid sm:grid-cols-2 gap-4">
                  {[
                    ["Counseling", "We understand your profile and requirements."],
                    ["Document Check", "We review documents to reduce mistakes."],
                    ["Documentation", "We help you prepare and organize everything."],
                    ["Submission & Result", "We submit and keep you updated."],
                  ].map(([t, d]) => (
                    <div key={t} className="rounded-2xl border bg-slate-50 p-4">
                      <div className="font-semibold">{t}</div>
                      <div className="mt-1 text-sm text-slate-600">{d}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* CTA */}
            <Card className="bg-emerald-50 border-emerald-100">
              <div className="p-6 md:p-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                <div>
                  <div className="text-lg font-bold">Ready to get started?</div>
                  <div className="mt-1 text-slate-700">
                    Contact us and we’ll guide you with the next steps.
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="rounded-xl bg-emerald-600 px-5 py-3 text-white font-semibold hover:bg-emerald-700 text-center"
                >
                  Contact now
                </Link>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-20">
              <div className="p-6">
                <div className="font-bold">Quick actions</div>
                <p className="mt-2 text-sm text-slate-600">
                  Reach out for consultation and required documents list.
                </p>

                <div className="mt-4 space-y-3">
                  <Link
                    to="/contact"
                    className="w-full inline-flex justify-center rounded-xl bg-slate-900 px-4 py-3 text-white font-semibold hover:bg-slate-800"
                  >
                    Contact form
                  </Link>

                  <a
                    href="#"
                    className="w-full inline-flex justify-center rounded-xl border px-4 py-3 font-semibold hover:bg-slate-50"
                    onClick={(e) => e.preventDefault()}
                  >
                    WhatsApp (set in settings)
                  </a>

                  <Link
                    to="/services"
                    className="w-full inline-flex justify-center rounded-xl border px-4 py-3 font-semibold hover:bg-slate-50"
                  >
                    Back to services
                  </Link>
                </div>

                <div className="mt-5 text-xs text-slate-500">
                  Tip: Keep service descriptions short and clear for better trust.
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
