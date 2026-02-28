import { useEffect } from "react";
import { Toaster } from "sonner";
import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";
import { CasesSection } from "./CasesSection";
import { ProcessSection } from "./ProcessSection";
import { AboutSection } from "./AboutSection";
import {
  ContactFormProvider,
  ContactSidebar,
  ContactSection,
} from "./ContactSidebar";
import { Footer } from "./Footer";
import { MouseGlow } from "./MouseGlow";

export function HomePage() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <ContactFormProvider>
      <div
        className="min-h-screen bg-[#09090b] text-white antialiased relative"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Global grid pattern */}
        <div className="fixed inset-0 bg-[linear-gradient(rgba(34,197,94,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.025)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none z-0" />

        {/* Global radial glow - top */}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_800px_500px_at_50%_0%,rgba(22,101,52,0.08),transparent)] pointer-events-none z-0" />

        <MouseGlow />
        <Navbar />

        <main className="relative z-[1]">
          <HeroSection />

          <div className="xl:pr-[360px]">
            <CasesSection />
            <ProcessSection />
            <AboutSection />
          </div>

          {/* ContactSection outside the sidebar-padded area
              so it uses full width when the floating sidebar hides */}
          <ContactSection />
        </main>

        <Footer />

        <ContactSidebar />

        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#1a1a1e",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
              fontSize: "14px",
            },
          }}
        />
      </div>
    </ContactFormProvider>
  );
}