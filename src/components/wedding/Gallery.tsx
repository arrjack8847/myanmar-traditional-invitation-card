import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useWeddingContent } from "@/context/language";

const Gallery = () => {
  const { gallery, ui } = useWeddingContent();
  const [selected, setSelected] = useState<number | null>(null);
  const photoCount = gallery.photos.length;

  const popup = {
    maxWidth: "1100px", // popup width
    maxHeight: "85vh",  // popup image height
  };

  const showPrev = () => {
    setSelected((current) =>
      current === null ? current : current === 0 ? photoCount - 1 : current - 1,
    );
  };

  const showNext = () => {
    setSelected((current) =>
      current === null ? current : current === photoCount - 1 ? 0 : current + 1,
    );
  };

  useEffect(() => {
    if (selected === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelected(null);
      }

      if (event.key === "ArrowLeft") {
        setSelected((current) =>
          current === null
            ? current
            : current === 0
              ? photoCount - 1
              : current - 1,
        );
      }

      if (event.key === "ArrowRight") {
        setSelected((current) =>
          current === null
            ? current
            : current === photoCount - 1
              ? 0
              : current + 1,
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [photoCount, selected]);

  const modal =
    selected !== null ? (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setSelected(null)}
        role="dialog"
        aria-modal="true"
        aria-label={ui.galleryDialogLabel}
      >
        <button
          className="absolute right-6 top-6 z-[60] flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          onClick={(e) => {
            e.stopPropagation();
            setSelected(null);
          }}
          aria-label={ui.close}
        >
          <X className="h-5 w-5" />
        </button>

        <button
          className="absolute left-4 top-1/2 z-[60] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
          onClick={(e) => {
            e.stopPropagation();
            showPrev();
          }}
          aria-label={ui.previous}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          className="absolute right-4 top-1/2 z-[60] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
          onClick={(e) => {
            e.stopPropagation();
            showNext();
          }}
          aria-label={ui.next}
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <motion.div
          className="relative flex max-h-[85vh] w-full items-center justify-center overflow-hidden rounded-2xl"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25 }}
          style={{
            maxWidth: popup.maxWidth,
            maxHeight: popup.maxHeight,
          }}
        >
          <img
            src={gallery.photos[selected].src}
            alt={gallery.photos[selected].label}
            className="max-h-[85vh] max-w-full object-contain"
            style={{
              maxHeight: popup.maxHeight,
            }}
          />

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent px-6 py-6 text-left">
            <p className="font-display text-lg text-white sm:text-2xl">
              {gallery.photos[selected].label}
            </p>
            <p className="mt-2 text-sm text-white/80">
              {selected + 1} / {gallery.photos.length}
            </p>
          </div>
        </motion.div>
      </motion.div>
    ) : null;

  return (
    <section id="gallery" className="relative px-4 py-24 sm:py-28">
      <div className="mx-auto max-w-5xl text-center">
        <motion.p
          className="mb-4 text-[10px] uppercase tracking-[0.42em] text-gold/75 sm:text-[11px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {gallery.eyebrow}
        </motion.p>

        <motion.h2
          className="font-display text-4xl text-foreground sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {gallery.title}
        </motion.h2>

        <motion.div
          className="gold-line mx-auto mt-5 h-px w-24 sm:w-28"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
        />

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {gallery.photos.map((photo, i) => (
            <motion.button
              key={photo.src}
              type="button"
              className="cursor-pointer overflow-hidden rounded-[24px] luxury-card text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(i)}
              aria-label={`${ui.openGalleryItem} ${photo.label}`}
            >
              <img
                src={photo.src}
                alt={photo.label}
                className="aspect-[4/5] w-full object-cover transition duration-500"
              />
            </motion.button>
          ))}
        </div>
      </div>

      {typeof document !== "undefined" &&
        createPortal(<AnimatePresence>{modal}</AnimatePresence>, document.body)}
    </section>
  );
};

export default Gallery;
