import React from "react";
import { ArrowLeft } from "lucide-react";
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
          <span className="text-white/80">Korea Military Academy</span>
        </div>
      </div>

      {/* Header */}
      <header>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          <EditableText
            id="title_kma"
            defaultText="Korea Military Academy: Institutional Documentation"
            section="kma"
            as="span"
          />
        </h1>
      </header>
    </div>
  );
}
