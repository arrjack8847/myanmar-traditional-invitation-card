import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import EnvelopeOpening from "@/components/wedding/EnvelopeOpening";
import HeroSection from "@/components/wedding/HeroSection";
import StorySection from "@/components/wedding/StorySection";
import EventDetails from "@/components/wedding/EventDetails";
import VenueSection from "@/components/wedding/VenueSection";
import Gallery from "@/components/wedding/Gallery";
import RSVPSection from "@/components/wedding/RSVPSection";
import ContactSection from "@/components/wedding/ContactSection";
import FloatingPetals from "@/components/wedding/FloatingPetals";
import MouseGlow from "@/components/wedding/MouseGlow";
import MusicPlayer from "@/components/wedding/MusicPlayer";
import LanguageToggle from "@/components/wedding/LanguageToggle";

const Index = () => {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (!opened) return;

    window.history.replaceState(null, "", window.location.pathname);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [opened]);

  return (
    <>
      {opened && <LanguageToggle />}

      <AnimatePresence mode="wait">
        {!opened ? (
          <EnvelopeOpening key="envelope" onOpen={() => setOpened(true)} />
        ) : (
          <motion.div
            key="main-site"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
            className="myanmar-paper-bg relative w-full overflow-x-hidden"
          >
            <MusicPlayer />

            <FloatingPetals />

            <div className="hidden md:block">
              <MouseGlow />
            </div>

            <div id="main-invitation">
              <HeroSection />
            </div>
            <EventDetails />
            <VenueSection />
            <RSVPSection />
            <StorySection />
            <Gallery />
            <ContactSection />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
