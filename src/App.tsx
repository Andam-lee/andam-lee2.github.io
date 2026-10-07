import React, { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import VoicesOfTheStreetPage from "./pages/VoicesOfTheStreetPage";
import SportsEditorialPage from "./pages/SportsEditorialPage";
import KoreaMilitaryAcademyPage from "./pages/KoreaMilitaryAcademyPage";
import DisasterCoveragePage from "./pages/DisasterCoveragePage";
import PublicEventsPage from "./pages/PublicEventsPage";
import AvianLifePage from "./pages/AvianLifePage";
import VideosPage from "./pages/VideosPage";
import AboutMePage from "./pages/AboutMePage";
import CapabilitiesPage from "./pages/CapabilitiesPage";
import CareersPage from "./pages/CareersPage";
import ContactPage from "./pages/ContactPage";
import { AdminProvider } from "./context/AdminContext";
import AdminBar from "./components/AdminBar";
import AdminLoginModal from "./components/AdminLoginModal";
import AdminFooterButton from "./components/AdminFooterButton";
import NavigationManager from "./components/NavigationManager";

function parseHash(hash: string): string {
  const clean = hash.replace(/^#\/?/, "").trim();
  return clean || "home";
}

function PageContent({ currentRoute }: { currentRoute: string }) {
  switch (currentRoute) {
    case "voices-of-the-street":
      return <VoicesOfTheStreetPage />;
    case "sports-editorial":
      return <SportsEditorialPage />;
    case "korea-military-academy":
      return <KoreaMilitaryAcademyPage />;
    case "disaster-coverage":
      return <DisasterCoveragePage />;
    case "public-events":
      return <PublicEventsPage />;
    case "avian-life":
      return <AvianLifePage />;
    case "videos":
      return <VideosPage />;
    case "about-me":
      return <AboutMePage />;
    case "capabilities":
      return <CapabilitiesPage />;
    case "careers":
      return <CareersPage />;
    case "contact":
      return <ContactPage />;
    case "home":
    default:
      return <HomePage />;
  }
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(() =>
    typeof window !== "undefined" ? parseHash(window.location.hash) : "home"
  );

  useEffect(() => {
    const handleHashChange = () => {
      const route = parseHash(window.location.hash);
      setCurrentRoute(route);
      window.scrollTo(0, 0);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const siteLogo = document.getElementById("site-logo");
    if (siteLogo) {
      if (currentRoute !== "home") {
        siteLogo.classList.add("visible");
      } else {
        siteLogo.classList.remove("visible");
      }
    }
  }, [currentRoute]);

  return (
    <AdminProvider>
      <NavigationManager />
      <PageContent currentRoute={currentRoute} />
      <AdminBar />
      <AdminLoginModal />
      <AdminFooterButton />
    </AdminProvider>
  );
}
