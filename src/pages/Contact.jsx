import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FaWhatsapp, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaBell,
  FaCheckCircle,
  FaUser,
  FaComment,
  FaTelegramPlane
} from "react-icons/fa";
import { MdEmail, MdMessage } from "react-icons/md";

const API_BASE = (import.meta.env.VITE_APP_SERVER_URL || "").replace(/\/$/, "");

async function postJSON(path, body) {
  const res = await fetch(`${API_BASE}${path.startsWith("/") ? "" : "/"}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || "Request failed");
  return data;
}

function Card({ children, className = "" }) {
  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 ${className}`}>
      {children}
    </div>
  );
}

export default function Contact() {
  const settings = useLoaderData() || {};

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [newsEmail, setNewsEmail] = useState("");

  const [sending, setSending] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [toast, setToast] = useState({ type: "", msg: "" });

  const show = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast({ type: "", msg: "" }), 2500);
  };

  const submitMessage = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await postJSON("/api/contact", form);
      show("ok", "Message sent successfully!");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      show("err", err.message || "Failed to send message");
    } finally {
      setSending(false);
    }
  };

  const subscribe = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await postJSON("/api/newsletter/subscribe", { email: newsEmail });
      show("ok", "Subscribed successfully!");
      setNewsEmail("");
    } catch (err) {
      show("err", err.message || "Failed to subscribe");
    } finally {
      setSubmitting(false);
    }
  };

  const wa = settings?.whatsapp ? `https://wa.me/${String(settings.whatsapp).replace(/\D/g, "")}` : "#";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      
      {/* Hero Section with Background Image */}
      <section className="relative text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://n-immigrate.vercel.app/assets/images/background/page-title-4.jpg"
            alt="Contact background"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-purple-900/80 to-pink-900/90"></div>
          
          {/* Animated overlay */}
          <motion.div
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"
          />
        </div>

        {/* Content */}
        <div className="relative mx-auto max-w-7xl px-4 py-24 md:py-32">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <span className="inline-flex items-center gap-2 text-blue-200 font-medium">
                <span className="w-8 h-0.5 bg-blue-400"></span>
                Get in Touch
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-black mb-4"
            >
              Contact
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-xl text-gray-200 max-w-2xl"
            >
              Send a message and we'll guide you with required documents and next steps.
            </motion.p>
          </div>
        </div>

        {/* Bottom fade effect */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </section>

      {/* Main Content Section */}
      <section className="relative -mt-20 pb-20">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 30, 0],
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-200/20 via-purple-200/20 to-pink-200/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Column - Form and Newsletter */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Form Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white">
                        <MdMessage className="text-2xl" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Send us a message</h2>
                        <p className="text-gray-600">We usually reply quickly on WhatsApp</p>
                      </div>
                    </div>

                    <form onSubmit={submitMessage} className="space-y-5">
                      <div className="grid md:grid-cols-2 gap-5">
                        {/* Name Input */}
                        <div className="relative group">
                          <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                          <input
                            className="w-full rounded-xl border border-gray-200 bg-white/50 pl-12 pr-4 py-3.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                            placeholder="Your name *"
                            value={form.name}
                            onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                            required
                          />
                        </div>

                        {/* Phone Input */}
                        <div className="relative group">
                          <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                          <input
                            className="w-full rounded-xl border border-gray-200 bg-white/50 pl-12 pr-4 py-3.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                            placeholder="Phone"
                            value={form.phone}
                            onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                          />
                        </div>
                      </div>

                      {/* Email Input */}
                      <div className="relative group">
                        <MdEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        <input
                          className="w-full rounded-xl border border-gray-200 bg-white/50 pl-12 pr-4 py-3.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                          placeholder="Email"
                          value={form.email}
                          onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                          type="email"
                        />
                      </div>

                      {/* Message Input */}
                      <div className="relative group">
                        <FaComment className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        <textarea
                          className="w-full rounded-xl border border-gray-200 bg-white/50 pl-12 pr-4 py-3.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none min-h-[140px]"
                          placeholder="Your message *"
                          value={form.message}
                          onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                          required
                        />
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={sending}
                        className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-60 shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 group"
                      >
                        {sending ? (
                          "Sending..."
                        ) : (
                          <>
                            Send message
                            <FaPaperPlane className="group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </motion.button>
                    </form>
                  </div>
                </Card>
              </motion.div>

              {/* Newsletter Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card>
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-white">
                        <FaBell className="text-2xl" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">Newsletter</h3>
                        <p className="text-gray-600">Get updates on new jobs and announcements</p>
                      </div>
                    </div>

                    <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-3">
                      <div className="relative group flex-1">
                        <MdEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                        <input
                          className="w-full rounded-xl border border-gray-200 bg-white/50 pl-12 pr-4 py-3.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                          placeholder="Your email"
                          value={newsEmail}
                          onChange={(e) => setNewsEmail(e.target.value)}
                          type="email"
                          required
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={submitting}
                        className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3.5 text-white font-semibold hover:from-emerald-700 hover:to-teal-700 disabled:opacity-60 shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
                      >
                        {submitting ? "Submitting..." : "Subscribe"}
                        <FaTelegramPlane />
                      </motion.button>
                    </form>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Right Column - Contact Info */}
            <div className="space-y-8">
              {/* Office Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card>
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center text-white">
                        <FaMapMarkerAlt className="text-2xl" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Office</h3>
                    </div>

                    <div className="space-y-4">
                      {/* Address */}
                      <div className="flex items-start gap-3">
                        <FaMapMarkerAlt className="text-amber-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500">Address</p>
                          <p className="text-gray-900">{settings?.address || "924-A, BNS CENTER, SECTOR-07, UTTARA, Dhaka"}</p>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="flex items-start gap-3">
                        <FaPhone className="text-amber-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="text-gray-900">{settings?.phone || "+880 1316-889944"}</p>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-start gap-3">
                        <FaEnvelope className="text-amber-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="text-gray-900">{settings?.email || "arshitraveldhaka@gmail.com"}</p>
                        </div>
                      </div>

                      {/* WhatsApp Button */}
                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={wa}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 text-white font-semibold hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-600/30"
                      >
                        <FaWhatsapp className="text-xl" />
                        WhatsApp
                      </motion.a>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Working Hours Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card>
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white">
                        <FaClock className="text-2xl" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Working hours</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                        <span className="text-gray-600">Saturday - Thursday</span>
                        <span className="font-semibold text-gray-900">10:00 AM – 7:00 PM</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Friday</span>
                        <span className="font-semibold text-red-600">Closed</span>
                      </div>

                      {/* Quick Reply Message */}
                      <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                        <p className="text-sm text-blue-700 flex items-center gap-2">
                          <FaCheckCircle className="text-blue-500" />
                          We usually reply within 24 hours
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Toast Notification */}
      {toast.msg ? (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50"
        >
          <div
            className={`rounded-xl px-6 py-4 text-sm font-semibold shadow-2xl border flex items-center gap-3 ${
              toast.type === "ok"
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-rose-50 text-rose-800 border-rose-200"
            }`}
          >
            {toast.type === "ok" ? <FaCheckCircle className="text-emerald-600" /> : null}
            {toast.msg}
          </div>
        </motion.div>
      ) : null}
    </div>
  );
}