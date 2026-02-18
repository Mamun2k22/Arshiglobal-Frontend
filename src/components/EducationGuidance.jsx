import React from "react";

const Container = ({ children }) => (
  <div className="mx-auto max-w-6xl px-4 py-10">{children}</div>
);

const SectionTitle = ({ eyebrow, title, desc }) => (
  <div className="mb-6">
    {eyebrow ? (
      <p className="text-sm font-bold tracking-wide text-emerald-700">{eyebrow}</p>
    ) : null}
    <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-slate-900">{title}</h2>
    {desc ? <p className="mt-2 text-slate-600 max-w-3xl">{desc}</p> : null}
  </div>
);

const Card = ({ title, children }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition">
    <h3 className="text-base font-extrabold text-slate-900">{title}</h3>
    <div className="mt-2 text-sm text-slate-600 leading-relaxed">{children}</div>
  </div>
);

const Bullet = ({ children }) => (
  <li className="flex gap-2">
    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-600 shrink-0" />
    <span className="text-slate-700">{children}</span>
  </li>
);

export default function EducationGuidance() {
  return (
    <div className="bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-b from-slate-950 to-slate-900">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 items-center py-10 md:py-14">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">
                🎓 Global Education & Migration Guidance
              </p>
              <h1 className="mt-4 text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Arshi Global Education — Your Trusted Partner for Global Education & Migration
              </h1>
              <p className="mt-4 text-white/80 text-base md:text-lg leading-relaxed">
                In today’s competitive and globalized education landscape, students and professionals
                need expert guidance to study, work, or settle abroad with confidence.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/contact"
                  className="rounded-2xl bg-emerald-600 px-5 py-3 text-white font-extrabold hover:bg-emerald-700 transition"
                >
                  Contact Us
                </a>
                <a
                  href="/about"
                  className="rounded-2xl bg-white/10 px-5 py-3 text-white font-extrabold hover:bg-white/15 transition"
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* Highlights */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-5 text-white">
                <div className="text-sm font-extrabold">Transparent & Ethical</div>
                <div className="mt-1 text-sm text-white/80">Honest advice with clear steps & timelines.</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-5 text-white">
                <div className="text-sm font-extrabold">Student-focused Support</div>
                <div className="mt-1 text-sm text-white/80">Guidance aligned with goals & budget.</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-5 text-white">
                <div className="text-sm font-extrabold">End-to-End Process</div>
                <div className="mt-1 text-sm text-white/80">From course selection to visa & departure.</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-5 text-white">
                <div className="text-sm font-extrabold">Long-term Success</div>
                <div className="mt-1 text-sm text-white/80">We care beyond admission success.</div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* About */}
      <Container>
        <SectionTitle
          eyebrow="About"
          title="About Arshi Global Education"
          desc="A professional education consultancy firm dedicated to helping students and professionals achieve overseas academic and career goals."
        />

        <div className="grid gap-5 md:grid-cols-3">
          <Card title="Who we are">
            We deliver structured, ethical, and result-driven solutions for international education
            and migration planning.
          </Card>
          <Card title="How we work">
            We provide end-to-end support — from course & country selection to visa processing and
            pre-departure preparation.
          </Card>
          <Card title="What makes us different">
            We focus on realistic pathways that maximize success and long-term benefits — not random options.
          </Card>
        </div>
      </Container>

      {/* Services */}
      <div className="bg-white border-y border-slate-100">
        <Container>
          <SectionTitle
            eyebrow="Services"
            title="Core Services Offered"
            desc="Everything you need — counseling, applications, visa assistance, and support before & after you travel."
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <Card title="1. Study Abroad Counseling">
              Comprehensive counseling to recommend suitable institutions and programs based on academic profile, language skills, and career goals.
            </Card>

            <Card title="2. University & Course Selection">
              Guidance to select accredited universities and industry-relevant programs aligned with global job market demands.
            </Card>

            <Card title="3. Admission Processing Support">
              Help with documentation, SOP guidance, transcripts, and submission timelines for smooth processing.
            </Card>

            <Card title="4. Student Visa Assistance">
              Professional visa guidance including documentation, financial assessment, and interview preparation to boost approval chances.
            </Card>

            <Card title="5. Scholarship & Financial Guidance">
              Support to identify and apply for scholarships, tuition discounts, and financial aid opportunities.
            </Card>

            <Card title="6. Pre-Departure & Post-Arrival Support">
              Accommodation guidance, travel prep, and support after arrival to settle smoothly in the destination country.
            </Card>
          </div>
        </Container>
      </div>

      {/* Why Choose */}
      <Container>
        <SectionTitle
          eyebrow="Why Choose Us"
          title="Trusted, Transparent, and Student-Centric"
          desc="We help you make confident decisions with expert support, clear steps, and personalized planning."
        />

        <div className="grid gap-5 md:grid-cols-2">
          <Card title="Experienced & Qualified Advisors">
            Advisors with strong knowledge of international education systems, visa policies, and global academic trends.
          </Card>

          <Card title="Personalized Student Support">
            Tailored guidance based on academic background, career objectives, and financial capacity.
          </Card>

          <Card title="Transparent & Ethical Practices">
            Honest advice with clear explanations of eligibility, costs, timelines, and expected outcomes.
          </Card>

          <Card title="Strong Institutional Network">
            Partnerships with recognized universities and institutions, enabling quality study opportunities worldwide.
          </Card>
        </div>
      </Container>

      {/* Countries */}
      <div className="bg-slate-50 border-y border-slate-100">
        <Container>
          <SectionTitle
            eyebrow="Destinations"
            title="Countries & Study Destinations"
            desc="We support study opportunities across multiple destinations, selected based on quality, affordability, and post-study prospects."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {["United Kingdom", "Canada", "Australia", "Europe", "Asia"].map((c) => (
              <div key={c} className="rounded-2xl bg-white border border-slate-200 p-5 text-center shadow-sm">
                <div className="text-sm font-extrabold text-slate-900">{c}</div>
                <div className="mt-1 text-xs text-slate-600">
                  Education quality • Career prospects • Affordability
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Commitment + Contact */}
      <Container>
        <SectionTitle
          eyebrow="Commitment"
          title="Commitment to Student Success"
          desc="Global education is a life-changing investment. We support not only admission success, but also long-term academic and career outcomes."
        />

        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-extrabold text-slate-900">Contact Information</h3>
            <p className="mt-2 text-sm text-slate-600">
              For professional education and migration guidance, connect with us:
            </p>

            <ul className="mt-4 space-y-2 text-sm">
              <Bullet>Official Website: <span className="text-slate-500">https://arshiglobal.com</span></Bullet>
              <Bullet>Email: <span className="text-slate-500">[Insert Email]</span></Bullet>
              <Bullet>Phone: <span className="text-slate-500">+880 1316-889944</span></Bullet>
              <Bullet>Address: <span className="text-slate-500">924-A, BNS CENTER, SECTOR-07, UTTARA, Dhaka</span></Bullet>
            </ul>

            <div className="mt-5 flex gap-3">
              <a
                href="/contact"
                className="rounded-2xl bg-slate-900 px-5 py-3 text-white font-extrabold hover:bg-slate-800 transition"
              >
                Contact Page
              </a>
              <a
                href="/"
                className="rounded-2xl bg-slate-100 px-5 py-3 text-slate-900 font-extrabold hover:bg-slate-200 transition"
              >
                Back to Home
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-extrabold text-slate-900">Quick FAQs</h3>
            <p className="mt-2 text-sm text-slate-600">
              Common questions from students and guardians.
            </p>

            <div className="mt-4 space-y-3">
              {[
                {
                  q: "What services does Arshi Global Education provide?",
                  a: "Study abroad counseling, university selection, admission processing, visa assistance, scholarship guidance, and pre-departure support.",
                },
                {
                  q: "Is Arshi Global Education reliable for student visa processing?",
                  a: "Yes. We follow a structured and transparent visa process that improves success rate.",
                },
                {
                  q: "Which countries do you support?",
                  a: "We support the UK, Canada, Australia, Europe, and Asia.",
                },
                {
                  q: "Do you assist with scholarships?",
                  a: "Yes. Eligible students receive guidance for scholarships and financial aid opportunities.",
                },
              ].map((x) => (
                <details key={x.q} className="group rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <summary className="cursor-pointer list-none font-extrabold text-slate-900 flex items-center justify-between">
                    <span className="text-sm">{x.q}</span>
                    <span className="text-slate-400 group-open:rotate-180 transition">⌄</span>
                  </summary>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{x.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
