import { Link, useLoaderData } from "react-router-dom";
import {
  Phone,
  Mail,
  ChevronRight,
  Home,
  Clock3,
  Check,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import ApplicationProcessSection from "../components/ApplicationProcessSection";

function InfoCard({ label, value }) {
  return (
    <div className="border-b sm:border-b-0 sm:border-r last:border-r-0 last:border-b-0">
      <div className="p-5 sm:p-6">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="mt-2 text-base font-semibold leading-7 text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
}

function SectionBadge({ children }) {
  return (
    <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-600 shadow-sm">
      {children}
    </div>
  );
}

function ChecklistCard({ title, items }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      </div>

      <div className="divide-y divide-slate-200">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 px-5 py-4 sm:px-6"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-semibold text-slate-700">
              {index + 1}
            </div>

            <div className="flex-1 text-sm leading-6 text-slate-700">
              {item}
            </div>

            <Check size={16} className="shrink-0 text-slate-400" />
          </div>
        ))}
      </div>
    </div>
  );
}

function HighlightPill({ icon, text }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm">
      {icon}
      <span>{text}</span>
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

  const serviceDisplayName =
    service?.title || service?.country || service?.name || "this service";

  const serviceCategory =
    service?.category || service?.visaType || service?.type || "Service";

  const servicePrice =
    service?.price || service?.serviceFee || "Call for Price";

  const serviceProcessingTime =
    service?.processingTime || "Processing time depends on profile";

  const serviceAudience =
    service?.audience || "Eligible applicants";

  const serviceShortDescription =
    service?.shortDescription ||
    "We help you prepare documents, requirements, and next steps based on your profile.";

  const serviceDescription =
    service?.description ||
    "This service is prepared based on the applicant's profile, documentation, financial strength, previous history, and intended purpose. Final approval or outcome depends on the relevant authority, institution, embassy, or processing body.";

  const standardDocuments = [
    "Valid passport",
    "Recent passport-size photographs",
    "Completed application form",
    "Cover letter explaining purpose",
    "Travel or study plan",
    "Proof of accommodation",
    "Bank statement showing financial capacity",
    "Employment, student, or business documents",
    "Proof of ties to home country or current status",
  ];

  const additionalItems = [
    "Proof of temporary visit or study intention",
    "Evidence of sufficient funds for travel and stay",
    "Invitation or offer letter where applicable",
    "Sponsor or host documents if applicable",
    "Biometrics or interview requirements if applicable",
  ];

  const eligibilityItems = [
    "Must provide truthful and complete information",
    "Should demonstrate a clear and genuine purpose",
    "Should meet financial and documentation requirements",
  ];

  const supportPhones = ["0 1316-889944", "+880 9639-246345"];

  return (
    <div className="bg-[#f6f8fb]">
      {/* Hero */}
      <section className="py-8 sm:py-10 md:py-12 md:mt-14 mt-12">
        <div className="mx-auto max-w-6xl px-4">
          {/* Breadcrumb */}
          <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link to="/" className="inline-flex items-center hover:text-slate-700">
              <Home size={14} />
            </Link>

            <ChevronRight size={14} />

            <Link to="/services" className="hover:text-slate-700">
              Visa Services
            </Link>

            <ChevronRight size={14} />

            <span className="font-medium text-slate-900">
              {serviceDisplayName}
            </span>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-10">
            {/* Left content */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 shadow-sm sm:text-sm">
                {serviceCategory}
              </div>

              <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-slate-900  lg:text-4xl">
                <span className="text-amber-600">{serviceDisplayName}</span>
              </h1>

              <p className="mt-5 max-w-3xl text-[15px] leading-8 text-slate-700">
                {serviceShortDescription}
              </p>

              <p className="mt-5 max-w-3xl whitespace-pre-line text-[15px] leading-8 text-slate-700">
                {serviceDescription}
              </p>

              <div className="mt-8 grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:grid-cols-3">
                <InfoCard
                  label="Typical processing"
                  value={serviceProcessingTime}
                />
                <InfoCard label="Service from" value={servicePrice} />
                <InfoCard label="Audience" value={serviceAudience} />
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/contact"
                  className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-xl bg-[#f4b400] px-6 py-4 font-semibold text-slate-900 shadow-sm transition hover:bg-[#e5a800]"
                >
                  <Mail size={18} />
                  Start application
                </Link>

                <a
                  href="tel:+8801316889944"
                  className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-4 font-semibold text-slate-800 transition hover:bg-slate-50"
                >
                  <Phone size={18} />
                  +880 1316-889944
                </a>
              </div>

            </div>

            {/* Right image */}
            <div className="order-1 lg:order-2">
              <div className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-slate-200">
                <div className="aspect-[4/3] bg-slate-100">
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={serviceDisplayName}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-500">
                      No image available
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What you can expect */}
      <section className="border-t border-slate-200 py-12 sm:py-14">
        <div className="mx-auto max-w-6xl px-4">
          <SectionBadge>At a glance</SectionBadge>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900">
            What you can expect
          </h2>

          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-slate-600">
            Straight answers and careful document preparation before you proceed
            with the next steps.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <HighlightPill
              icon={<ShieldCheck size={16} className="text-slate-500" />}
              text="Docs checked before final submission"
            />
            <HighlightPill
              icon={<Clock3 size={16} className="text-slate-500" />}
              text="Honest timelines"
            />
            <HighlightPill
              icon={<MapPin size={16} className="text-slate-500" />}
              text="Office & WhatsApp support"
            />
          </div>
        </div>
      </section>

      {/* Main lower content */}
      <section className="border-t border-slate-200 py-12 sm:py-14">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[minmax(0,1fr)_340px]">
          {/* Left content */}
          <div className="space-y-6">
            <div>
              <SectionBadge>Document checklist</SectionBadge>

              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900">
                What to prepare
              </h2>

              <p className="mt-3 max-w-2xl text-[15px] leading-7 text-slate-600">
                Use this as your working list for{" "}
                <span className="font-semibold text-slate-800">
                  {serviceDisplayName}
                </span>
                . Final requirements depend on the authority and your profile—we’ll
                confirm when you reach out.
              </p>
            </div>

            <ChecklistCard
              title="Standard documents"
              items={standardDocuments}
            />

            <ChecklistCard
              title={`${serviceDisplayName} — additional items`}
              items={additionalItems}
            />

            <ChecklistCard title="Eligibility" items={eligibilityItems} />
          </div>

          {/* Right sidebar */}
          <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm lg:sticky lg:top-24">
              <div className="border-b border-slate-200 px-5 py-5 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Enquire about this service
                </p>
                <h3 className="mt-2 text-lg font-bold text-slate-900">
                  {serviceDisplayName}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {servicePrice} · {serviceProcessingTime}
                </p>
              </div>

              <div className="p-5">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-6 text-center">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Service fee
                  </p>
                  <div className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">
                    {servicePrice}
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    Additional official fees may apply where applicable
                  </p>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <a
                    href="https://wa.me/8801316889944"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-green-500 px-4 text-sm font-semibold text-white hover:bg-green-600"
                  >
                    WhatsApp
                  </a>

                  <a
                    href="tel:+8801316889944"
                    className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                  >
                    Call
                  </a>
                </div>

                <Link
                  to="/contact"
                  className="mt-3 inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-[#f4b400] px-5 text-sm font-semibold text-slate-900 hover:bg-[#e5a800]"
                >
                  Get a call back
                </Link>

                <div className="mt-6 border-t border-slate-200 pt-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Phone lines
                  </p>

                  <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <div className="space-y-2">
                      {supportPhones.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                          className="flex items-center gap-3 rounded-xl bg-white px-3 py-3 text-sm text-slate-700 shadow-sm hover:bg-slate-50"
                        >
                          <Phone size={15} className="text-slate-500" />
                          <span>{phone}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-200 pt-6">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <ShieldCheck size={16} className="text-slate-500" />
                    Trusted support
                  </div>

                  <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="flex items-start gap-3">
                        <Check size={16} className="mt-0.5 shrink-0 text-green-600" />
                        <span>Document checklist reviewed before submission</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check size={16} className="mt-0.5 shrink-0 text-green-600" />
                        <span>Realistic timelines—we don’t promise guaranteed results</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check size={16} className="mt-0.5 shrink-0 text-green-600" />
                        <span>Profile-based guidance for applicants</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check size={16} className="mt-0.5 shrink-0 text-green-600" />
                        <span>Multiple lines & WhatsApp for quick answers</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End sidebar */}
        </div>
      </section>

      <ApplicationProcessSection />
    </div>
  );
}