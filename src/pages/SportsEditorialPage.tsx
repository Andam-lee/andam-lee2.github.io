import React from "react";
import { ArrowLeft, Trophy } from "lucide-react";
import EditableText from "../components/EditableText";

export default function SportsEditorialPage() {
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
              id="title_sports_breadcrumb"
              defaultText="Sports Editorial"
              section="sports"
              as="span"
            />
          </span>
        </div>
      </div>

      {/* Header */}
      <header className="mb-12">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          <EditableText
            id="title_sports"
            defaultText="Sports Editorial: Track and Field"
            section="sports"
            as="span"
          />
        </h1>
      </header>

      {/* Blank Page Staging Canvas */}
      <div className="relative border border-dashed border-white/15 rounded-2xl p-12 md:p-24 flex flex-col items-center justify-center text-center bg-white/[0.02]">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 text-white/40">
          <Trophy className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-medium text-white/90 mb-2">
          <EditableText
            id="canvas_sports_title"
            defaultText="Sports Editorial Page"
            section="sports"
            as="span"
          />
        </h2>
        <div className="text-sm text-white/50 max-w-md mb-8 leading-relaxed">
          <EditableText
            id="canvas_sports_desc"
            defaultText="High-speed motion, decisive plays, and live competition coverage. Capturing the split-second triumphs, agony, and raw discipline of competitive athletes."
            section="sports"
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
