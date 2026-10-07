import React, { useState } from "react";
import { ArrowLeft, CheckCircle2, Send } from "lucide-react";
import EditableText from "../components/EditableText";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    affiliation: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0b1013] text-white pt-28 pb-28 px-6 sm:px-12 md:px-20 max-w-4xl mx-auto">
      {/* Top navigation / breadcrumbs */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-12">
        <a
          href="#"
          className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Home</span>
        </a>
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/40">
          <span>About Me</span>
          <span>/</span>
          <span className="text-white/80">Contact</span>
        </div>
      </div>

      {/* Main Title only (no top tag, no subtitle) */}
      <header className="mb-10">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          <EditableText
            id="title_contact"
            defaultText="Contact"
            section="contact"
            as="span"
          />
        </h1>
      </header>

      {/* Contact Form */}
      {submitted ? (
        <div className="border border-white/10 rounded-2xl p-12 text-center bg-white/[0.02]">
          <CheckCircle2 className="w-12 h-12 text-white/80 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Message Sent</h2>
          <p className="text-neutral-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
            Thank you for reaching out. Your inquiry has been recorded and will be
            reviewed promptly.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setFormData({
                firstName: "",
                lastName: "",
                affiliation: "",
                email: "",
                phone: "",
                message: "",
              });
            }}
            className="px-6 py-2.5 rounded-full bg-white text-black font-medium text-sm hover:bg-neutral-200 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-7">
          {/* 1. Name (First / Last) */}
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-wider text-white/40 font-medium">
              Name (First / Last)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all text-sm font-normal"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all text-sm font-normal"
                />
              </div>
            </div>
          </div>

          {/* 2. Affiliation */}
          <div className="space-y-2">
            <label
              htmlFor="affiliation"
              className="block text-xs uppercase tracking-wider text-white/40 font-medium"
            >
              Affiliation / Organization
            </label>
            <input
              type="text"
              name="affiliation"
              id="affiliation"
              value={formData.affiliation}
              onChange={handleChange}
              placeholder="Affiliation / Organization / Media Outlet"
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all text-sm font-normal"
            />
          </div>

          {/* 3. Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-xs uppercase tracking-wider text-white/40 font-medium"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="example@domain.com"
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all text-sm font-normal"
            />
          </div>

          {/* 4. Phone Number */}
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="block text-xs uppercase tracking-wider text-white/40 font-medium"
            >
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+82 10 0000 0000"
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all text-sm font-normal"
            />
          </div>

          {/* 5. Message / Content (Wide box with 20+ lines capacity) */}
          <div className="space-y-2">
            <label
              htmlFor="message"
              className="block text-xs uppercase tracking-wider text-white/40 font-medium"
            >
              Message / Inquiry Details
            </label>
            <textarea
              name="message"
              id="message"
              required
              rows={22}
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all text-sm font-normal leading-relaxed resize-y min-h-[460px]"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              <span>Submit Message</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
