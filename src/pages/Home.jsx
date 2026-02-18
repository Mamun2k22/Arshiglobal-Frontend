import { useEffect, useState } from "react";
import { api } from "../lib/api";
import Section from "../components/Section";
import Card from "../components/Card";
import Badge from "../components/Badge";
import { Link } from "react-router-dom";
import ProcessSection from "../components/sections/ProcessSection";
import Hero from "../components/Hero";
import { Stars } from "lucide-react";
import StatsSection from "../components/StatsSection";
import PremiumMarquee from "../components/MarqueeRtl";
import WhyChooseUs from "../components/WhyChooseUs";
import AboutSection from "../components/AboutSection";
import AboutShowcaseSection from "../components/AboutShowcaseSection";
import ServicesThreeCards from "../components/ui/ServicesThreeCards";

export default function Home() {
  const [services, setServices] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    api
      .get("/api/services?limit=6")
      .then((r) => setServices(r.data?.items || []))
      .catch(() => {});
    api
      .get("/api/jobs?limit=6")
      .then((r) => setJobs(r.data?.items || []))
      .catch(() => {});
    api
      .get("/api/faqs")
      .then((r) => setFaqs(r.data?.items || []))
      .catch(() => {});
  }, []);
  function FaqAccordion({ items = [] }) {
    const [openId, setOpenId] = useState(null);

    const toggle = (id) => {
      setOpenId((prev) => (prev === id ? null : id));
    };

    return (
      <div className="p-0">
        <div className="space-y-4 max-w-7xl mx-auto mt-4">
          {items.map((f, idx) => {
            const isOpen = openId === f._id;
            const accent =
              idx === 0
                ? "border-emerald-600 text-emerald-700"
                : "border-slate-900 text-slate-900";

            return (
              <div
                key={f._id}
                className={`[box-shadow:0_2px_10px_-3px_rgba(14,14,14,0.3)] rounded-lg border-l-8 ${accent} bg-white`}
                role="accordion"
              >
                <button
                  type="button"
                  onClick={() => toggle(f._id)}
                  className={`cursor-pointer w-full text-[15px] font-medium text-left py-5 px-6 flex items-center ${
                    idx === 0 ? "text-emerald-700" : "text-slate-900"
                  }`}
                >
                  {/* left icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current w-8 mr-4 shrink-0"
                    viewBox="0 0 532 532.001"
                  >
                    <path d="M521.893 197.182V117.17c-.037-31.46-25.533-56.956-56.993-56.992h-15.008V51.18c-.13-25.532-20.864-46.154-46.394-46.154s-46.26 20.621-46.397 46.154v8.998H189.483V51.18c-.13-25.533-20.866-46.155-46.395-46.155S96.83 25.646 96.691 51.179v8.998H81.68c-31.458.037-56.954 25.533-56.99 56.993v349.562c.037 31.46 25.532 56.957 56.99 56.993H464.9c31.46-.036 56.956-25.532 56.992-56.992V205.407a12.844 12.844 0 0 0 0-8.226zM403.499 30.729c11.285.015 20.43 9.157 20.442 20.45v27.324c-.085 11.225-9.217 20.28-20.45 20.28-11.23 0-20.357-9.055-20.447-20.28V51.18c.013-11.294 9.162-20.438 20.455-20.45zm-280.867 20.45c.09-11.232 9.219-20.288 20.447-20.288 11.233 0 20.358 9.055 20.451 20.288v27.324c-.093 11.225-9.218 20.28-20.45 20.28-11.229 0-20.358-9.055-20.447-20.28zM81.68 86.124h15.644c3.73 22.369 23.08 38.765 45.757 38.765 22.68 0 42.03-16.396 45.76-38.765h168.898c3.73 22.369 23.083 38.765 45.76 38.765s42.03-16.396 45.756-38.765H464.9c17.139.021 31.025 13.907 31.046 31.046v71.147H50.638v-71.143c.016-17.139 13.91-31.029 31.041-31.05zM464.9 497.777H81.68c-17.132-.02-31.022-13.905-31.042-31.044v-252.47h445.308v252.47c-.021 17.14-13.907 31.025-31.046 31.046zm0 0" />
                    <path d="m337.836 296.383-85.173 83.164-43.242-42.221c-5.095-4.978-13.244-4.92-18.265.125-5.021 5.05-5.038 13.2-.04 18.265l.178.17 52.31 51.078c5.037 4.92 13.084 4.92 18.122 0l94.242-92.007c5.082-4.997 5.183-13.163.228-18.285-4.965-5.119-13.127-5.273-18.286-.353l-.072.068zm0 0" />
                  </svg>

                  <span className="mr-4">
                    {f.question}
                    <span className="text-xs text-slate-600 mt-0.5 block font-normal">
                      Click to view the answer
                    </span>
                  </span>

                  {/* arrow */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-[14px] h-[14px] fill-current ml-auto shrink-0 transition-all duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 451.847 451.847"
                  >
                    <path d="M225.923 354.706c-8.098 0-16.195-3.092-22.369-9.263L9.27 151.157c-12.359-12.359-12.359-32.397 0-44.751 12.354-12.354 32.388-12.354 44.748 0l171.905 171.915 171.906-171.909c12.359-12.354 32.391-12.354 44.744 0 12.365 12.354 12.365 32.392 0 44.751L248.292 345.449c-6.177 6.172-14.274 9.257-22.369 9.257z" />
                  </svg>
                </button>

                {/* content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[600px]" : "max-h-0"
                  }`}
                >
                  <div className="pb-5 px-6">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {f.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Hero />
      <PremiumMarquee />
       <ServicesThreeCards />
      {/* Services */}
      <Section
        title="Services"
        subtitle="Our core services to support your visa and job process."
      >
        <div className="grid md:grid-cols-3 gap-5">
          {services.map((s) => (
            <Card key={s._id}>
              <div className="p-5">
                <div className="font-semibold text-lg">{s.title}</div>
                <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                  {s.shortDescription || s.description || ""}
                </p>
                <Link
                  to={`/services/${s._id}`}
                  className="inline-block mt-4 text-sm font-semibold text-emerald-700 hover:underline"
                >
                  View details →
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Section>
     
      <AboutSection />
      {/* <AboutShowcaseSection /> */}
      <ProcessSection />
      {/* Featured Jobs */}
      <Section
        title="Latest Jobs"
        subtitle="Browse latest opportunities and apply with confidence."
      >
        <div className="grid md:grid-cols-2 gap-5">
          {jobs.map((j) => (
            <Card key={j._id}>
              <div className="p-5 flex items-start justify-between gap-4">
                <div>
                  <div className="font-semibold text-lg">{j.title}</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge>{j.country}</Badge>
                    <Badge>{j.category}</Badge>
                    {j.salary ? <Badge>{j.salary}</Badge> : null}
                  </div>
                  <p className="mt-3 text-sm text-slate-600 line-clamp-2">
                    {j.description}
                  </p>
                </div>
                <Link
                  to={`/jobs/${j._id}`}
                  className="shrink-0 px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold"
                >
                  Details
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <Link
            to="/jobs"
            className="text-sm font-semibold text-slate-900 hover:underline"
          >
            See all jobs →
          </Link>
        </div>
      </Section>

      <StatsSection />
      {/* FAQ */}
      <WhyChooseUs />
      <Section title="FAQ" subtitle="Common questions from clients.">
        <FaqAccordion items={faqs} />
      </Section>
    </div>
  );
}
