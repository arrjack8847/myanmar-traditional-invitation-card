import { useState } from "react";
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

  return (
    <>
      <LanguageToggle />

      <AnimatePresence mode="wait">
        {!opened ? (
          <EnvelopeOpening key="envelope" onOpen={() => setOpened(true)} />
        ) : (
          <motion.div
            key="main-site"
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-full overflow-x-hidden"
          >
            <MusicPlayer play={opened} />

            <FloatingPetals />

            <div className="hidden md:block">
              <MouseGlow />
            </div>

            <HeroSection />
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
