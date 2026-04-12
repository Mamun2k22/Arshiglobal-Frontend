import { Link, useLoaderData } from "react-router-dom";

function Badge({ children }) {
  return (
    <span className="inline-flex max-w-full items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
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
        <div className="rounded-2xl border bg-white p-6 text-center sm:p-10">
          <div className="text-lg font-semibold">Service not found</div>
          <p className="mt-2 text-slate-600">
            The service you’re looking for doesn’t exist.
          </p>
          <Link
            to="/services"
            className="mt-5 inline-flex rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800"
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
        <div className="mx-auto max-w-6xl px-4 pb-8 pt-24 sm:pb-10 sm:pt-28">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-200 sm:text-sm">
            <Link className="hover:underline" to="/">
              Home
            </Link>
            <span>›</span>
            <Link className="hover:underline" to="/services">
              Services
            </Link>
            <span>›</span>
            <span className="break-words text-slate-100">{service.title}</span>
          </div>

          <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0 flex-1">
              <Badge>Service details</Badge>

              <h1 className="mt-3 break-words text-2xl font-extrabold leading-snug sm:text-3xl md:text-4xl">
                {service.title}
              </h1>

              <p className="mt-3 max-w-2xl break-words text-sm leading-relaxed text-slate-200 sm:text-base">
                {service.shortDescription ||
                  "End-to-end guidance from documentation to submission."}
              </p>
            </div>

            <Link
              to="/contact"
              className="inline-flex w-full shrink-0 items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-center font-semibold hover:bg-emerald-600 sm:w-auto"
            >
              Get consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 lg:grid-cols-3 lg:gap-8">
          {/* Main */}
          <div className="space-y-6 lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="h-52 bg-slate-100 sm:h-64">
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt={service.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center text-slate-500">
                    No image
                  </div>
                )}
              </div>

              <div className="p-5 sm:p-6 md:p-8">
                <h2 className="text-lg font-bold sm:text-xl">Overview</h2>
                <p className="mt-3 whitespace-pre-line break-words text-sm leading-relaxed text-slate-700 sm:text-base">
                  {service.description || "Details will be added soon."}
                </p>
              </div>
            </Card>

            <Card className="border-emerald-100 bg-emerald-50">
              <div className="flex flex-col gap-4 p-5 sm:p-6 md:flex-row md:items-center md:justify-between md:p-8">
                <div>
                  <div className="text-lg font-bold">Ready to get started?</div>
                  <div className="mt-1 text-sm text-slate-700 sm:text-base">
                    Contact us and we’ll guide you with the next steps.
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="w-full rounded-xl bg-emerald-600 px-5 py-3 text-center font-semibold text-white hover:bg-emerald-700 md:w-auto"
                >
                  Contact now
                </Link>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="lg:sticky lg:top-20">
              <div className="p-5 sm:p-6">
                <div className="font-bold">Quick actions</div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Reach out for consultation and required documents list.
                </p>

                <div className="mt-4 space-y-3">
                  <Link
                    to="/contact"
                    className="inline-flex w-full justify-center rounded-xl bg-slate-900 px-4 py-3 text-white font-semibold hover:bg-slate-800"
                  >
                    Contact form
                  </Link>

               <a
  href="https://wa.me/8801316889944"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex w-full justify-center rounded-xl border px-4 py-3 font-semibold hover:bg-slate-50"
>
  WhatsApp
</a>

                  <Link
                    to="/services"
                    className="inline-flex w-full justify-center rounded-xl border px-4 py-3 font-semibold hover:bg-slate-50"
                  >
                    Back to services
                  </Link>
                </div>

                <div className="mt-5 text-xs leading-relaxed text-slate-500">
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