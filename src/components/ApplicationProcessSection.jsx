import {
  FileText,
  CalendarDays,
  Upload,
  CheckCircle2,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: FileText,
    title: "Apply Online",
    description:
      "Fill out our online application form with your personal details, travel purpose, and destination information.",
  },
  {
    icon: CalendarDays,
    title: "Get an Appointment",
    description:
      "We will schedule your appointment with the embassy or consulate and guide you through the preparation process.",
  },
  {
    icon: Upload,
    title: "Submit Documents",
    description:
      "Submit all required documents including passport, photos, financial statements, and supporting materials.",
  },
  {
    icon: CheckCircle2,
    title: "Receive Visa",
    description:
      "Once approved, collect your visa and get ready to embark on your journey to your dream destination.",
  },
];

export default function ApplicationProcessSection() {
  return (
    <section className="relative overflow-hidden bg-[#08132d] py-20 text-white">
      {/* Left background image */}
      <img
        src="https://giptravels.com/_next/image?url=%2Fimages%2Fbackground-icons%2Fpassport.png&w=256&q=75"
        alt="passport background"
        className="pointer-events-none absolute bottom-0 left-0 w-[220px] max-w-none opacity-10 md:w-[280px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">
            Simple Steps
          </span>
        </div>

        {/* Heading */}
        <div className="mx-auto mt-6 max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Application <span className="text-[#8aa4e8]">Process</span>
          </h2>
          <p className="mt-5 text-base leading-7 text-white/75 sm:text-lg">
            Follow our simple 4-step process to apply for your visa with
            professional guidance and support.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-16">
          {/* Desktop connector line */}
          <div className="absolute left-0 right-0 top-7 hidden border-t border-white/20 lg:block" />

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={index}
                  className="relative text-center"
                >
                  <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/70 bg-[#08132d] shadow-[0_0_0_8px_rgba(8,19,45,1)]">
                    <Icon size={26} className="text-white" />
                  </div>

                  <h3 className="mt-5 text-2xl font-bold leading-tight">
                    {step.title}
                  </h3>

                  <p className="mx-auto mt-5 max-w-xs text-base leading-8 text-white/75">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <div className="flex flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/70">
              <Mail size={24} />
            </div>
            <span className="mt-4 text-sm text-white/70">E-Message</span>
            <a
              href="mailto:arshitraveldhaka@gmail.com"
              className="mt-1 text-lg font-semibold hover:text-[#8aa4e8]"
            >
              arshitraveldhaka@gmail.com
            </a>
          </div>

          <div className="text-lg font-semibold text-white/80 sm:px-2">OR</div>

          <Link
           to="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-[#123a7a] px-8 py-4 text-base font-semibold text-white transition hover:bg-[#184a98]"
          >
            Apply Online
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}