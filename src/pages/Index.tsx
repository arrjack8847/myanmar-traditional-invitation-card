import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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

const CINEMATIC_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const pageTransition = {
  duration: 1.95,
  ease: CINEMATIC_EASE,
};

const CinematicSection = ({
  children,
  id,
  delay = 0,
  amount = 0.18,
}: {
  children: ReactNode;
  id?: string;
  delay?: number;
  amount?: number;
}) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      id={id}
      initial={{
        opacity: 0,
        y: reduceMotion ? 0 : 46,
        scale: reduceMotion ? 1 : 0.986,
        filter: reduceMotion ? "blur(0px)" : "blur(14px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      transition={{
        duration: reduceMotion ? 0.35 : 1.45,
        delay: reduceMotion ? 0 : delay,
        ease: CINEMATIC_EASE,
      }}
      viewport={{ once: true, amount, margin: "0px 0px -8% 0px" }}
      style={{ transformOrigin: "center top", willChange: "transform, opacity, filter" }}
    >
      {children}
    </motion.div>
  );
};

const Index = () => {
  const [opened, setOpened] = useState(false);
  const reduceMotion = useReducedMotion();

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
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 32,
              scale: reduceMotion ? 1 : 0.985,
              filter: reduceMotion ? "blur(0px)" : "blur(16px)",
            }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{
              opacity: 0,
              y: reduceMotion ? 0 : -10,
              scale: reduceMotion ? 1 : 0.992,
              filter: reduceMotion ? "blur(0px)" : "blur(8px)",
            }}
            transition={reduceMotion ? { duration: 0.35 } : pageTransition}
            className="myanmar-paper-bg relative w-full overflow-x-hidden"
          >
            <MusicPlayer />

            <FloatingPetals />

            <div className="hidden md:block">
              <MouseGlow />
            </div>

            <CinematicSection id="main-invitation" amount={0.1}>
              <HeroSection />
            </CinematicSection>
            <CinematicSection delay={0.04}>
              <EventDetails />
            </CinematicSection>
            <CinematicSection delay={0.04}>
              <VenueSection />
            </CinematicSection>
            <CinematicSection delay={0.04}>
              <RSVPSection />
            </CinematicSection>
            <CinematicSection delay={0.04}>
              <StorySection />
            </CinematicSection>
            <CinematicSection delay={0.04}>
              <Gallery />
            </CinematicSection>
            <CinematicSection delay={0.04}>
              <ContactSection />
            </CinematicSection>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
