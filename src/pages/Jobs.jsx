import { useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";
import Card from "../components/Card";
import Badge from "../components/Badge";
import Section from "../components/Section";
import { Link } from "react-router-dom";

export default function Jobs() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState({ search: "", country: "", category: "" });

  const queryString = useMemo(() => {
    const p = new URLSearchParams();
    if (q.search) p.set("search", q.search);
    if (q.country) p.set("country", q.country);
    if (q.category) p.set("category", q.category);
    p.set("limit", "50");
    return p.toString();
  }, [q]);

  useEffect(() => {
    api.get(`/api/jobs?${queryString}`).then(r => setItems(r.data?.items || [])).catch(()=>{});
  }, [queryString]);

  return (
    <Section title="Jobs" subtitle="Search and filter jobs by country and category.">
      <div className="grid md:grid-cols-3 gap-4  ">
        <input
          className="border rounded-xl px-4 py-3"
          placeholder="Search jobs..."
          value={q.search}
          onChange={(e) => setQ((s) => ({ ...s, search: e.target.value }))}
        />
        <input
          className="border rounded-xl px-4 py-3"
          placeholder="Country (e.g. Serbia)"
          value={q.country}
          onChange={(e) => setQ((s) => ({ ...s, country: e.target.value }))}
        />
        <input
          className="border rounded-xl px-4 py-3"
          placeholder="Category (e.g. Factory)"
          value={q.category}
          onChange={(e) => setQ((s) => ({ ...s, category: e.target.value }))}
        />
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-5">
        {items.map((j) => (
          <Card key={j._id}>
            <div className="p-5">
              <div className="font-semibold text-lg">{j.title}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge>{j.country}</Badge>
                <Badge>{j.category}</Badge>
                {j.salary ? <Badge>{j.salary}</Badge> : null}
              </div>
              <p className="mt-3 text-sm text-slate-600 line-clamp-3">{j.description}</p>
              <div className="mt-4">
                <Link to={`/jobs/${j._id}`} className="text-sm font-semibold text-emerald-700 hover:underline">
                  View details →
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
