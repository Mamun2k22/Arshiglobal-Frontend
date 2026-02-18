import { useEffect, useMemo, useState } from "react";
import { Link, useLoaderData, useNavigate, useSearchParams } from "react-router-dom";

function Badge({ children }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
      {children}
    </span>
  );
}

function Card({ children }) {
  return (
    <div className="rounded-2xl border bg-white shadow-sm hover:shadow-md transition">
      {children}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border bg-white overflow-hidden">
      <div className="h-40 bg-slate-100 animate-pulse" />
      <div className="p-5 space-y-3">
        <div className="h-4 w-2/3 bg-slate-100 animate-pulse rounded" />
        <div className="h-3 w-full bg-slate-100 animate-pulse rounded" />
        <div className="h-3 w-5/6 bg-slate-100 animate-pulse rounded" />
        <div className="h-9 w-28 bg-slate-100 animate-pulse rounded-xl" />
      </div>
    </div>
  );
}

export default function Services() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  // loader data shape: { items, pagination }
  const loaded = useLoaderData();
  const items = loaded?.items || [];

  const [search, setSearch] = useState(params.get("search") || "");

  useEffect(() => {
    setSearch(params.get("search") || "");
  }, [params]);

  const stats = useMemo(() => {
    return {
      total: loaded?.pagination?.total ?? items.length,
      showing: items.length,
    };
  }, [loaded, items]);

  const applySearch = (value) => {
    const q = new URLSearchParams();
    if (value?.trim()) q.set("search", value.trim());
    navigate({ pathname: "/services", search: q.toString() });
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 md:py-16 mt-8 md:mt-10">
          <div className="max-w-2xl">
            <Badge>Our Services</Badge>
            <h1 className="mt-4 text-3xl md:text-4xl font-extrabold leading-tight">
              Clear guidance, documentation, and end-to-end support
            </h1>
            <p className="mt-3 text-slate-200">
              Choose a service to see details, requirements, and how we work with you step by step.
            </p>
          </div>

          {/* Search */}
          <div className="mt-7 max-w-2xl">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-slate-200 outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="Search services (e.g. Europe Job Visa)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") applySearch(search);
                }}
              />
              <button
                className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold hover:bg-emerald-600"
                onClick={() => applySearch(search)}
              >
                Search
              </button>
              <button
                className="rounded-xl bg-white/10 px-5 py-3 font-semibold hover:bg-white/15 border border-white/10"
                onClick={() => applySearch("")}
              >
                Reset
              </button>
            </div>

            <div className="mt-3 text-sm text-slate-200">
              Showing <span className="font-semibold">{stats.showing}</span> of{" "}
              <span className="font-semibold">{stats.total}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          {/* If you want loading state later, keep skeletons */}
          {/* Grid */}
          {Array.isArray(items) && items.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((s) => (
                <Card key={s._id}>
                  <div className="overflow-hidden rounded-2xl">
                    <div className="h-40 bg-slate-100">
                      {s.image ? (
                        <img
                          src={
                            s.image.startsWith("http")
                              ? s.image
                              : `${import.meta.env.VITE_API_URL}${s.image}`
                          }
                          alt={s.title}
                          className="h-40 w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="h-40 w-full grid place-items-center text-slate-500 text-sm">
                          No image
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold text-lg leading-snug">{s.title}</h3>
                      <Badge>Service</Badge>
                    </div>

                    <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                      {s.shortDescription || s.description || "—"}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <Link
                        to={`/services/${s._id}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                      >
                        View details
                        <span aria-hidden>→</span>
                      </Link>

                      <span className="text-xs text-slate-500">
                        {s.isActive ? "Active" : "Hidden"}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border bg-white p-10 text-center">
              <div className="text-lg font-semibold">No services found</div>
              <p className="mt-2 text-slate-600">
                Try a different keyword or reset your search.
              </p>
              <button
                className="mt-5 rounded-xl bg-slate-900 px-5 py-3 text-white font-semibold hover:bg-slate-800"
                onClick={() => applySearch("")}
              >
                Reset search
              </button>
            </div>
          )}

          {/* Help CTA */}
          <div className="mt-10 rounded-2xl border bg-slate-50 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div>
              <div className="text-lg font-semibold">Not sure which service you need?</div>
              <p className="mt-1 text-slate-600">
                Contact us and we’ll guide you based on your profile and requirements.
              </p>
            </div>
            <Link
              to="/contact"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-white font-semibold hover:bg-emerald-700"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
