// src/pages/admin/AdminSiteSettings.jsx
import React, { useEffect, useMemo, useState } from "react";
import { api } from "../../lib/api";

const Section = ({ title, desc, children }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      {desc ? <p className="mt-1 text-sm text-slate-500">{desc}</p> : null}
    </div>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>
  </div>
);

const Field = ({ label, hint, children, full }) => (
  <label className={`block ${full ? "md:col-span-2" : ""}`}>
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-slate-700">{label}</span>
    </div>
    <div className="mt-1">{children}</div>
    {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
  </label>
);

const Input = (props) => (
  <input
    {...props}
    className={
      "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 " +
      "placeholder:text-slate-400 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100 " +
      (props.className || "")
    }
  />
);

const Textarea = (props) => (
  <textarea
    {...props}
    className={
      "w-full min-h-[140px] resize-y rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 " +
      "placeholder:text-slate-400 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100 " +
      (props.className || "")
    }
  />
);

const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={
      "relative inline-flex h-6 w-11 items-center rounded-full transition " +
      (checked ? "bg-slate-900" : "bg-slate-200")
    }
  >
    <span
      className={
        "inline-block h-5 w-5 transform rounded-full bg-white transition " +
        (checked ? "translate-x-5" : "translate-x-1")
      }
    />
  </button>
);

const Banner = ({ type = "info", title, message }) => {
  const styles = useMemo(() => {
    if (type === "error") return "border-rose-200 bg-rose-50 text-rose-900";
    if (type === "success") return "border-emerald-200 bg-emerald-50 text-emerald-900";
    return "border-slate-200 bg-slate-50 text-slate-900";
  }, [type]);

  return (
    <div className={`rounded-2xl border p-4 ${styles}`}>
      <div className="font-semibold">{title}</div>
      {message ? <div className="mt-1 text-sm opacity-90">{message}</div> : null}
    </div>
  );
};

const defaultForm = {
  siteName: "",
  logo: "",      // ImgBB URL
  favicon: "",   // ImgBB URL

  phone: "",
  whatsapp: "",
  email: "",
  address: "",

  aboutTitle: "",
  aboutContent: "",

  footerText: "",
  isActive: true,
};

export default function AdminSiteSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [settingsId, setSettingsId] = useState(null);
  const [form, setForm] = useState(defaultForm);

  const setField = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const fetchSettings = async () => {
    setLoading(true);
    setError("");
    setNotice("");
    try {
      const { data } = await api.get("/api/site-settings");
      if (data && data._id) {
        setSettingsId(data._id);
        setForm({ ...defaultForm, ...data });
      } else {
        setSettingsId(null);
        setForm(defaultForm);
      }
    } catch (e) {
      setError(e?.response?.data?.message || e.message || "Failed to load settings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const validate = () => {
    if (!form.siteName?.trim()) return "Site name is required.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) return "Email is not valid.";
    if (form.whatsapp && !/^\+?\d{8,15}$/.test(String(form.whatsapp).replace(/\s/g, "")))
      return "WhatsApp number should be digits (8–15).";
    return "";
  };

  const onSave = async () => {
    const v = validate();
    if (v) {
      setError(v);
      setNotice("");
      return;
    }

    setSaving(true);
    setError("");
    setNotice("");

    const payload = {
      siteName: form.siteName,
      logo: form.logo,
      favicon: form.favicon,

      phone: form.phone,
      whatsapp: form.whatsapp,
      email: form.email,
      address: form.address,

      aboutTitle: form.aboutTitle,
      aboutContent: form.aboutContent,

      footerText: form.footerText,
      isActive: !!form.isActive,
    };

    try {
      if (!settingsId) {
        const { data } = await api.post("/api/site-settings", payload);
        setSettingsId(data._id);
        setNotice("Settings created successfully.");
      } else {
        await api.put(`/api/site-settings/${settingsId}`, payload);
        setNotice("Settings updated successfully.");
      }
      await fetchSettings();
    } catch (e) {
      setError(e?.response?.data?.message || e.message || "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-full px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Site Settings</h1>
            <p className="mt-1 text-sm text-slate-600">
              Update branding, contact info, About page content, and footer text.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchSettings}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
              disabled={loading || saving}
            >
              Refresh
            </button>
            <button
              type="button"
              onClick={onSave}
              disabled={loading || saving}
              className="rounded-xl bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 disabled:opacity-60"
            >
              {saving ? "Saving..." : settingsId ? "Save Changes" : "Create Settings"}
            </button>
          </div>
        </div>

        {/* Alerts */}
        <div className="mb-6 space-y-3">
          {error ? <Banner type="error" title="Action required" message={error} /> : null}
          {notice ? <Banner type="success" title="Done" message={notice} /> : null}
        </div>

        {loading ? (
          <div className="grid gap-4">
            <div className="h-36 animate-pulse rounded-2xl bg-white shadow-sm" />
            <div className="h-36 animate-pulse rounded-2xl bg-white shadow-sm" />
            <div className="h-36 animate-pulse rounded-2xl bg-white shadow-sm" />
          </div>
        ) : (
          <div className="grid gap-5">
            {/* General */}
            <Section title="General" desc="Basic branding used across the site.">
              <Field label="Site name" hint="Shown in header and titles.">
                <Input
                  value={form.siteName}
                  onChange={(e) => setField("siteName", e.target.value)}
                  placeholder="Arshi Global Education"
                />
              </Field>

              <Field label="Active settings" hint="Public site uses only active settings.">
                <div className="flex items-center gap-3">
                  <Toggle checked={!!form.isActive} onChange={(v) => setField("isActive", v)} />
                  <span className="text-sm text-slate-700">
                    {form.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </Field>
            </Section>

            {/* Branding */}
            <Section title="Branding" desc="Use ImgBB URLs for logo and favicon (no local uploads needed).">
              <Field label="Logo URL" hint="Paste ImgBB direct image URL.">
                <Input
                  value={form.logo}
                  onChange={(e) => setField("logo", e.target.value)}
                  placeholder="https://i.ibb.co/xxxx/logo.png"
                />
                {form.logo ? (
                  <div className="mt-3 rounded-xl border bg-slate-50 p-3 flex items-center gap-3">
                    <img
                      src={form.logo}
                      alt="logo"
                      className="h-12 w-12 rounded-xl object-cover bg-white"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                    <div className="text-xs text-slate-600 break-all">{form.logo}</div>
                  </div>
                ) : null}
              </Field>

              <Field label="Favicon URL" hint="Paste ImgBB direct image URL (32x32 recommended).">
                <Input
                  value={form.favicon}
                  onChange={(e) => setField("favicon", e.target.value)}
                  placeholder="https://i.ibb.co/xxxx/favicon.png"
                />
                {form.favicon ? (
                  <div className="mt-3 rounded-xl border bg-slate-50 p-3 flex items-center gap-3">
                    <img
                      src={form.favicon}
                      alt="favicon"
                      className="h-10 w-10 rounded-lg object-cover bg-white"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                    <div className="text-xs text-slate-600 break-all">{form.favicon}</div>
                  </div>
                ) : null}
              </Field>
            </Section>

            {/* Contact */}
            <Section title="Contact Info" desc="Shown in Contact page, footer, and quick contact cards.">
              <Field label="Phone">
                <Input
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  placeholder="+8801XXXXXXXXX"
                />
              </Field>

              <Field label="WhatsApp (number only)" hint="Example: 8801316889944">
                <Input
                  value={form.whatsapp}
                  onChange={(e) => setField("whatsapp", e.target.value)}
                  placeholder="8801316889944"
                />
              </Field>

              <Field label="Email">
                <Input
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  placeholder="arshitraveldhaka@gmail.com"
                />
              </Field>

              <Field label="Address" full>
                <Textarea
                  value={form.address}
                  onChange={(e) => setField("address", e.target.value)}
                  placeholder="Office address..."
                />
              </Field>
            </Section>

            {/* About */}
            <Section title="About Page" desc="Content shown on the About page.">
              <Field label="About title" hint="Main headline of About page.">
                <Input
                  value={form.aboutTitle}
                  onChange={(e) => setField("aboutTitle", e.target.value)}
                  placeholder="Arshi Global Education – Your Trusted Partner..."
                />
              </Field>

              <Field
                label="About content"
                hint="Paste full text here. You can use line breaks."
                full
              >
                <Textarea
                  value={form.aboutContent}
                  onChange={(e) => setField("aboutContent", e.target.value)}
                  placeholder="Long About content..."
                  className="min-h-[240px]"
                />
              </Field>
            </Section>

            {/* Footer */}
            <Section title="Footer" desc="Short text shown in footer.">
              <Field label="Footer text" full>
                <Textarea
                  value={form.footerText}
                  onChange={(e) => setField("footerText", e.target.value)}
                  placeholder="© 2026 Arshi Global Education. All rights reserved."
                />
              </Field>
            </Section>
          </div>
        )}

        {/* Footer actions */}
        <div className="mt-8 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onSave}
            disabled={loading || saving}
            className="rounded-xl bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
