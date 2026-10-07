import React from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import EditableText from "../components/EditableText";

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[#0b1013] text-white pt-28 pb-28 px-6 sm:px-12 md:px-16 lg:px-20 max-w-7xl mx-auto">
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
          <span className="text-white/80">Career</span>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* LEFT COLUMN (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-12">
          {/* Main Title & Subtitle */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white mb-4">
              <EditableText
                id="career_title"
                defaultText="Career / Lee Jeong-min"
                section="career"
                as="span"
              />
            </h1>
            <div className="flex items-center gap-3">
              <span className="w-[3px] h-5 bg-white inline-block shrink-0" />
              <p className="text-sm sm:text-base text-neutral-300 font-normal">
                <EditableText
                  id="career_bio_sub"
                  defaultText="Freelance Photojournalist Based in South Korea"
                  section="career"
                  as="span"
                />
              </p>
            </div>
          </div>

          {/* Section: Photojournalism & Media */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight pb-3 border-b border-white/10">
              <EditableText
                id="career_sec_photo"
                defaultText="Photojournalism & Media"
                section="career"
                as="span"
              />
            </h2>
            <ul className="mt-5 space-y-3.5 pl-5 list-disc text-sm text-neutral-300 marker:text-neutral-400 leading-relaxed">
              <li>
                <span className="font-semibold text-white">ZUMA Press</span> |{" "}
                <EditableText
                  id="career_zuma"
                  defaultText="Photojournalist (2025. 11. 12. – Present)"
                  section="career"
                />
              </li>
              <li>
                <span className="font-semibold text-white">Getty Images</span> |{" "}
                <EditableText
                  id="career_getty"
                  defaultText="Contributor Photographer (2021. 08. 30. – Present)"
                  section="career"
                />
              </li>
              <li>
                <span className="font-semibold text-white">ROK Army</span> |{" "}
                <EditableText
                  id="career_rok"
                  defaultText="Official Photographer, Public Affairs Office Headquarters of the Korea Military Academy (2026. 02. 02. - 2027. 08. 01.)"
                  section="career"
                />
              </li>
              <li>
                <span className="font-semibold text-white">
                  CJ O-NE SuperRace
                </span>{" "}
                |{" "}
                <EditableText
                  id="career_superrace"
                  defaultText="Official Photographer (2025. 04. 20. – 2025. 11. 01.)"
                  section="career"
                />
              </li>
            </ul>
          </section>

          {/* Section: Broadcast & Video Production */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight pb-3 border-b border-white/10">
              <EditableText
                id="career_sec_broadcast"
                defaultText="Broadcast & Video Production"
                section="career"
                as="span"
              />
            </h2>
            <ul className="mt-5 space-y-3.5 pl-5 list-disc text-sm text-neutral-300 marker:text-neutral-400 leading-relaxed">
              <li>
                <span className="font-semibold text-white">
                  KBS, Mnet, Netflix
                </span>{" "}
                |{" "}
                <EditableText
                  id="career_broadcast_1"
                  defaultText="Floor Director (FD) for Broadcast Production (2025. 07. 02. – 2025. 09. 01.)"
                  section="career"
                />
              </li>
              <li>
                <span className="font-semibold text-white">ELLE, Vogue</span> |{" "}
                <EditableText
                  id="career_broadcast_2"
                  defaultText="Brand Media Production Assistant Camera (AC) (2025. 07. 25. – 2025. 09. 01.)"
                  section="career"
                />
              </li>
              <li>
                <span className="font-semibold text-white">
                  Dankook University College of Dentistry Band '사랑니'
                </span>{" "}
                |{" "}
                <EditableText
                  id="career_broadcast_3"
                  defaultText="Video Director & Cinematographer (2025. 08. 29.)"
                  section="career"
                />
              </li>
              <li>
                <span className="font-semibold text-white">
                  Sangmyung University Band 'SOULO'
                </span>{" "}
                |{" "}
                <EditableText
                  id="career_broadcast_4"
                  defaultText="Director of Photography (2025. 09. 04. – 2025. 11. 19.)"
                  section="career"
                />
              </li>
              <li>
                <span className="font-semibold text-white">
                  TBS 'Citizen Video Feature' [시민영상 특이점]
                </span>{" "}
                |{" "}
                <EditableText
                  id="career_broadcast_5"
                  defaultText="Video Contributor"
                  section="career"
                />
              </li>
            </ul>
          </section>

          {/* Section: Awards & Media Appearances */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight pb-3 border-b border-white/10">
              <EditableText
                id="career_sec_awards"
                defaultText="Awards & Media Appearances"
                section="career"
                as="span"
              />
            </h2>
            <ul className="mt-5 space-y-3.5 pl-5 list-disc text-sm text-neutral-300 marker:text-neutral-400 leading-relaxed">
              <li>
                <span className="font-semibold text-white">
                  Featured on SBS 'Capture the Moment How is that Possible'
                  [세상에 이런일이]
                </span>{" "}
                |{" "}
                <EditableText
                  id="career_award_1"
                  defaultText="Main Guest as 'Middle School Bird Photographer' (Ep. 1160)"
                  section="career"
                />
              </li>
              <li>
                <span className="font-semibold text-white">
                  Featured on TBS 'Citizen Video Feature' [시민영상 특이점]
                </span>{" "}
                |{" "}
                <EditableText
                  id="career_award_2"
                  defaultText="Season 4-16 Main Guest"
                  section="career"
                />
              </li>
              <li>
                <span className="font-semibold text-white">
                  Korea Forest Photo Contest
                </span>{" "}
                |{" "}
                <EditableText
                  id="career_award_3"
                  defaultText="Excellence Award (2021. 11. 10.)"
                  section="career"
                />
              </li>
              <li>
                <span className="font-semibold text-white">
                  Korea Youth Photo Contest
                </span>{" "}
                |{" "}
                <EditableText
                  id="career_award_4"
                  defaultText="Honorable Mention (2021. 08. 31.)"
                  section="career"
                />
              </li>
              <li>
                <span className="font-semibold text-white">
                  Korea Military Academy Cadet Recruitment Video Contest
                </span>{" "}
                |{" "}
                <EditableText
                  id="career_award_5"
                  defaultText="Grand Prize (2026. 05. 29.)"
                  section="career"
                />
              </li>
              <li>
                <span className="font-semibold text-white">
                  ROK Ministry of National Defense Military Chaplaincy Video
                  Contest
                </span>{" "}
                |{" "}
                <EditableText
                  id="career_award_6"
                  defaultText="Honorable Mention (2026. 07.)"
                  section="career"
                />
              </li>
            </ul>
          </section>
        </div>

        {/* RIGHT COLUMN (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-12 lg:pl-4">
          {/* Section: Contact */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight pb-3 border-b border-white/10">
              <EditableText
                id="career_sec_contact"
                defaultText="Contact"
                section="career"
                as="span"
              />
            </h2>
            <div className="mt-5 space-y-2 text-sm text-neutral-300">
              <div>
                <a
                  href="mailto:aquascaperljm@gmail.com"
                  className="font-medium text-white underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors"
                >
                  <EditableText
                    id="contact_email"
                    defaultText="aquascaperljm@gmail.com"
                    section="career"
                  />
                </a>
              </div>
              <p>
                <span className="font-semibold text-white">Phone:</span>{" "}
                <a
                  href="tel:+821046719676"
                  className="hover:text-white transition-colors"
                >
                  <EditableText
                    id="contact_phone"
                    defaultText="+82 10 4671 9676"
                    section="career"
                  />
                </a>
              </p>
            </div>
          </section>

          {/* Section: Social */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight pb-3 border-b border-white/10">
              <EditableText
                id="career_sec_social"
                defaultText="Social"
                section="career"
                as="span"
              />
            </h2>
            <div className="mt-5 space-y-3.5">
              {/* Instagram (Editorial) */}
              <a
                href="https://www.instagram.com/andam_pic/"
                target="_blank"
                rel="noreferrer noopener"
                className="block p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all group"
              >
                <div className="text-xs text-neutral-400 mb-1">
                  Instagram (Editorial):
                </div>
                <div className="text-sm text-neutral-200 group-hover:text-white break-all flex items-center justify-between">
                  <span>https://www.instagram.com/andam_pic/</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity ml-2 shrink-0" />
                </div>
              </a>

              {/* Instagram (Bird Photography) */}
              <a
                href="https://www.instagram.com/andam_lee/"
                target="_blank"
                rel="noreferrer noopener"
                className="block p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all group"
              >
                <div className="text-xs text-neutral-400 mb-1">
                  Instagram (Bird Photography):
                </div>
                <div className="text-sm text-neutral-200 group-hover:text-white break-all flex items-center justify-between">
                  <span>https://www.instagram.com/andam_lee/</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity ml-2 shrink-0" />
                </div>
              </a>

              {/* Portfolio */}
              <a
                href="https://leejeongminjournal.myportfolio.com/"
                target="_blank"
                rel="noreferrer noopener"
                className="block p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all group"
              >
                <div className="text-xs text-neutral-400 mb-1">Portfolio:</div>
                <div className="text-sm text-neutral-200 group-hover:text-white break-all flex items-center justify-between">
                  <span>https://leejeongminjournal.myportfolio.com/</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity ml-2 shrink-0" />
                </div>
              </a>
            </div>
          </section>

          {/* Section: Education */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight pb-3 border-b border-white/10">
              <EditableText
                id="career_sec_edu"
                defaultText="Education"
                section="career"
                as="span"
              />
            </h2>
            <div className="mt-5 space-y-4 text-sm">
              <div>
                <div className="font-semibold text-white">
                  <EditableText
                    id="edu_school_1"
                    defaultText="Shinsung High School"
                    section="career"
                  />
                </div>
                <div className="text-neutral-400 mt-0.5">
                  <EditableText
                    id="edu_years_1"
                    defaultText="2021 – 2025"
                    section="career"
                  />
                </div>
              </div>
              <div>
                <div className="font-semibold text-white">
                  <EditableText
                    id="edu_school_2"
                    defaultText="Sangmyung University - Photography, Video Major"
                    section="career"
                  />
                </div>
                <div className="text-neutral-400 mt-0.5">
                  <EditableText
                    id="edu_years_2"
                    defaultText="2025 – Present"
                    section="career"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section: Skills */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight pb-3 border-b border-white/10">
              <EditableText
                id="career_sec_skills"
                defaultText="Skills"
                section="career"
                as="span"
              />
            </h2>
            <ul className="mt-5 space-y-3.5 pl-5 list-disc text-sm text-neutral-300 marker:text-neutral-400 leading-relaxed">
              <li>
                <span className="font-semibold text-white">Photography:</span>{" "}
                <EditableText
                  id="skills_photo"
                  defaultText="Professional Photojournalism, Editorial Photography"
                  section="career"
                />
              </li>
              <li>
                <span className="font-semibold text-white">Videography:</span>{" "}
                <EditableText
                  id="skills_video"
                  defaultText="News Gathering, Field Videography, Documentary Filming"
                  section="career"
                />
              </li>
              <li>
                <span className="font-semibold text-white">Photo Editing:</span>{" "}
                <EditableText
                  id="skills_photo_edit"
                  defaultText="Photoshop (Design), Lightroom"
                  section="career"
                />
              </li>
              <li>
                <span className="font-semibold text-white">Video Editing:</span>{" "}
                <EditableText
                  id="skills_video_edit"
                  defaultText="Adobe Premiere Pro and Final Cut Pro"
                  section="career"
                />
              </li>
            </ul>
          </section>

          {/* Section: Languages */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight pb-3 border-b border-white/10">
              <EditableText
                id="career_sec_lang"
                defaultText="Languages"
                section="career"
                as="span"
              />
            </h2>
            <ul className="mt-5 space-y-3.5 pl-5 list-disc text-sm text-neutral-300 marker:text-neutral-400 leading-relaxed">
              <li>
                <span className="font-semibold text-white">Korean:</span>{" "}
                <EditableText
                  id="lang_ko"
                  defaultText="Native"
                  section="career"
                />
              </li>
              <li>
                <span className="font-semibold text-white">English:</span>{" "}
                <EditableText
                  id="lang_en"
                  defaultText="Intermediate"
                  section="career"
                />
              </li>
              <li>
                <span className="font-semibold text-white">Japanese:</span>{" "}
                <EditableText
                  id="lang_ja"
                  defaultText="Intermediate"
                  section="career"
                />
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
