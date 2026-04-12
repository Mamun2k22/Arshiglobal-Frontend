import React from "react";
import {
  MdFlight,
  MdSchool,
  MdWork,
  MdFamilyRestroom,
  MdBusinessCenter,
  MdHomeWork,
} from "react-icons/md";
import { Link } from "react-router-dom";

const Check = () => (
  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 6L9 17l-5-5"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

const ServiceIcon = ({ icon, bg, color }) => (
  <div className={`h-16 w-16 rounded-2xl ${bg} flex items-center justify-center`}>
    <div className={`text-3xl ${color}`}>{icon}</div>
  </div>
);

const Card = ({ icon, bg, color, title, desc, bullets }) => (
  <div className="rounded-2xl bg-white p-8 shadow-md ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl">
    <ServiceIcon icon={icon} bg={bg} color={color} />

    <h3 className="mt-6 font-serif text-lg font-semibold text-slate-900">
      {title}
    </h3>

    <p className="mt-3 text-sm leading-6 text-slate-500">{desc}</p>

    <ul className="mt-5 space-y-2.5">
      {bullets.map((b) => (
        <li key={b} className="flex items-center gap-2 text-sm text-slate-600">
          <Check />
          <span>{b}</span>
        </li>
      ))}
    </ul>

   <Link to={"/services"}>
    <button className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700">
      Learn More →
    </button>
  </Link>
  </div>
);

export default function ServicesSection() {
  return (
    <section className="bg-[#f6f9fc] py-20">
      <div className="mx-auto max-w-6xl px-4">
        {/* Top Label */}
        <div className="flex items-center justify-center gap-3">
          <span className="h-[2px] w-10 bg-sky-500/70" />
          <p className="text-[11px] font-semibold tracking-[0.28em] text-sky-600">
            OUR SERVICES
          </p>
          <span className="h-[2px] w-10 bg-sky-500/70" />
        </div>

        <h2 className="mt-4 text-center font-serif text-4xl font-semibold text-slate-900 sm:text-5xl">
          Complete Immigration Solutions
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-slate-500">
          Comprehensive visa services tailored to your unique needs and
          aspirations.
        </p>

        {/* Cards Grid */}
        <div className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          <Card
            icon={<MdSchool />}
            bg="bg-sky-100"
            color="text-sky-600"
            title="Student Visa"
            desc="Pursue your academic dreams at world-renowned universities with our expert guidance."
            bullets={["University Selection", "Scholarship Assistance", "SOP & LOR Writing"]}
          />

          <Card
            icon={<MdWork />}
            bg="bg-rose-100"
            color="text-rose-500"
            title="Work Permit"
            desc="Advance your career globally with skilled worker programs and employment visas."
            bullets={["Skilled Worker Visa", "LMIA Processing", "Employer Sponsorship"]}
          />

          <Card
            icon={<MdHomeWork />}
            bg="bg-violet-100"
            color="text-violet-600"
            title="Permanent Residency"
            desc="Make your dream country your forever home through PR and immigration programs."
            bullets={["Express Entry", "Provincial Nominee", "Points Assessment"]}
          />

          <Card
            icon={<MdFamilyRestroom />}
            bg="bg-emerald-100"
            color="text-emerald-600"
            title="Family Sponsorship"
            desc="Reunite with your loved ones through our family sponsorship programs."
            bullets={["Spouse Sponsorship", "Parent & Grandparent", "Dependent Children"]}
          />

          <Card
            icon={<MdBusinessCenter />}
            bg="bg-orange-100"
            color="text-orange-600"
            title="Business Immigration"
            desc="Expand your business globally with investor and entrepreneur visa programs."
            bullets={["Investor Visa", "Startup Visa", "Self-Employed"]}
          />

          <Card
            icon={<MdFlight />}
            bg="bg-teal-100"
            color="text-teal-600"
            title="Tourist & Visitor"
            desc="Explore the world with hassle-free tourist visas and visitor permits."
            bullets={["Tourist Visa", "Super Visa", "Transit Visa"]}
          />
        </div>
      </div>
    </section>
  );
}