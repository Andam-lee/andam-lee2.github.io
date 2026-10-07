import React from "react";
import { ArrowLeft, Shield } from "lucide-react";
import EditableText from "../components/EditableText";

export default function KoreaMilitaryAcademyPage() {
  return (
    <div className="min-h-screen bg-[#0b1013] text-white pt-28 pb-20 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto">
      {/* Top navigation bar inside page */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-12">
        <a
          href="#"
          className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Home</span>
        </a>
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/40">
          <span>Editorial</span>
          <span>/</span>
          <span className="text-white/80">
            <EditableText
              id="title_kma_breadcrumb"
              defaultText="Korea Military Academy"
              section="kma"
              as="span"
            />
          </span>
        </div>
      </div>

      {/* Header */}
      <header className="mb-12">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          <EditableText
            id="title_kma"
            defaultText="Korea Military Academy: Institutional Documentation"
            section="kma"
            as="span"
          />
        </h1>
      </header>

      {/* Blank Page Staging Canvas */}
      <div className="relative border border-dashed border-white/15 rounded-2xl p-12 md:p-24 flex flex-col items-center justify-center text-center bg-white/[0.02]">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 text-white/40">
          <Shield className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-medium text-white/90 mb-2">
          <EditableText
            id="canvas_kma_title"
            defaultText="Korea Military Academy: Institutional Documentation"
            section="kma"
            as="span"
          />
        </h2>
        <div className="text-sm text-white/50 max-w-md mb-8 leading-relaxed">
          <EditableText
            id="canvas_kma_desc"
            defaultText="Official coverage of cadet field training, ceremonial events, and daily academy life."
            section="kma"
            multiline={true}
            as="p"
          />
        </div>
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="px-5 py-2.5 rounded-full bg-white text-black font-medium text-sm hover:bg-neutral-200 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
