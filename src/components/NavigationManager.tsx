import { useEffect } from "react";
import { useAdmin } from "../context/AdminContext";

export default function NavigationManager() {
  const { texts, getText, isEditMode } = useAdmin();

  useEffect(() => {
    // 1. Update top nav triggers
    const triggerDiscover = document.querySelector(
      '.desktop-nav .trigger[data-menu="discover"] > span'
    );
    if (triggerDiscover) {
      triggerDiscover.textContent = getText("nav_editorial", "Editorial");
    }

    const triggerJourneys = document.querySelector(
      '.desktop-nav .trigger[data-menu="journeys"] > span'
    );
    if (triggerJourneys) {
      triggerJourneys.textContent = getText("nav_other_works", "Other works");
    }

    const triggerRegions = document.querySelector(
      '.desktop-nav .trigger[data-menu="regions"] > span'
    );
    if (triggerRegions) {
      triggerRegions.textContent = getText("nav_about_me", "About Me");
    }

    // 2. Update mobile sheet titles
    const sheetHeaders = document.querySelectorAll(".sheet .sheet-group h3");
    if (sheetHeaders.length >= 3) {
      sheetHeaders[0].textContent = getText("nav_editorial", "Editorial");
      sheetHeaders[1].textContent = getText("nav_other_works", "Other works");
      sheetHeaders[2].textContent = getText("nav_about_me", "About Me");
    }

    // Helper to update dropdown item title and description
    const updateItem = (
      href: string,
      tKey: string,
      tDef: string,
      dKey?: string,
      dDef?: string
    ) => {
      const el = document.querySelector(`.dd a[href="${href}"]`);
      if (el) {
        const strong = el.querySelector("strong");
        if (strong) strong.textContent = getText(tKey, tDef);
        if (dKey && dDef) {
          const span = el.querySelector("span");
          if (span) span.textContent = getText(dKey, dDef);
        }
      }
      // Also update mobile sheet anchor text
      const mobileEl = document.querySelector(`.sheet a[href="${href}"]`);
      if (mobileEl) {
        mobileEl.textContent = getText(tKey, tDef);
      }
    };

    updateItem(
      "#voices-of-the-street",
      "dd_voices_title",
      "Voices of the street",
      "dd_voices_desc",
      "Documenting the Pulse of Public Outcry"
    );
    updateItem(
      "#sports-editorial",
      "dd_sports_title",
      "Sports Editorial: Track and Field",
      "dd_sports_desc",
      "High-speed motion, decisive plays, and live competition coverage."
    );
    updateItem(
      "#korea-military-academy",
      "dd_kma_title",
      "Korea Military Academy: Institutional Documentation",
      "dd_kma_desc",
      "Official coverage of cadet field training, ceremonial events, and daily academy life."
    );
    updateItem(
      "#disaster-coverage",
      "dd_disaster_title",
      "Aftermath & Impact: Disaster Coverage",
      "dd_disaster_desc",
      "Documenting the immediate fallout of accidents and structural blazes."
    );
    updateItem(
      "#public-events",
      "dd_events_title",
      "Public Events & Festivals",
      "dd_events_desc",
      "Editorial coverage of public gatherings, cultural festivals, and large-scale public events."
    );
    updateItem(
      "#avian-life",
      "dd_avian_title",
      "Avian Life: Wild Birds",
      "dd_avian_desc",
      "Field documentation and behavioral observations of wild birds."
    );
    updateItem(
      "#videos",
      "dd_videos_title",
      "Videos",
      "dd_videos_desc",
      "Live performance recording, commercial product video production, and camera assistant work."
    );

    // Apply visual hint to header triggers when in edit mode
    const triggers = document.querySelectorAll(".desktop-nav .trigger");
    triggers.forEach((tr) => {
      if (isEditMode) {
        tr.classList.add("admin-nav-editable");
      } else {
        tr.classList.remove("admin-nav-editable");
      }
    });
  }, [texts, getText, isEditMode]);

  return null;
}
