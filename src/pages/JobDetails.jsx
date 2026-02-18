import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { useParams, Link } from "react-router-dom";
import Section from "../components/Section";
import Badge from "../components/Badge";
import ApplyJobModal from "../components/ui/ApplyJobModal";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openApply, setOpenApply] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/api/jobs/${id}`)
      .then((r) => setJob(r.data))
      .catch(() => setJob(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Section title="Loading...">
        <div className="animate-pulse space-y-3">
          <div className="h-6 bg-slate-200 rounded w-1/3" />
          <div className="h-4 bg-slate-200 rounded w-2/3" />
          <div className="h-4 bg-slate-200 rounded w-1/2" />
        </div>
      </Section>
    );
  }

  if (!job) {
    return (
      <Section title="Job not found">
        <Link
          to="/jobs"
          className="text-emerald-700 font-semibold hover:underline"
        >
          ← Back to Jobs
        </Link>
      </Section>
    );
  }

  return (
    <>
      <Section title={job.title} subtitle="Job details">
        {/* Meta Info */}
        <div className="flex flex-wrap gap-2">
          {job.country && <Badge>{job.country}</Badge>}
          {job.category && <Badge>{job.category}</Badge>}
          {job.salary && <Badge>{job.salary}</Badge>}
          {job.type && <Badge>{job.type}</Badge>}
        </div>

        {/* Description */}
        <div className="mt-6 text-slate-700 leading-relaxed whitespace-pre-line">
          {job.description}
        </div>

        {/* Requirements */}
        {(job.requirements?.length || 0) > 0 && (
          <div className="mt-8">
            <div className="text-lg font-bold text-slate-900">
              Requirements
            </div>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-slate-700">
              {job.requirements.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Benefits */}
        {(job.benefits?.length || 0) > 0 && (
          <div className="mt-8">
            <div className="text-lg font-bold text-slate-900">Benefits</div>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-slate-700">
              {job.benefits.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-10 rounded-2xl border bg-slate-50 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-lg font-extrabold text-slate-900">
              Interested in this position?
            </div>
            <div className="text-sm text-slate-600 mt-1">
              Submit your application now and our team will review it shortly.
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setOpenApply(true)}
              className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-extrabold hover:bg-emerald-700 transition"
            >
              Apply Now
            </button>

            <Link
              to="/jobs"
              className="px-6 py-3 rounded-xl border font-semibold hover:bg-slate-100 transition"
            >
              Back
            </Link>
          </div>
        </div>
      </Section>

      {/* Apply Modal */}
      <ApplyJobModal
        open={openApply}
        onClose={() => setOpenApply(false)}
        job={job}
      />
    </>
  );
}
