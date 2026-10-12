"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Maximize2, Pause, Play } from "lucide-react";

const pad = (n) => String(n).padStart(2, "0");

const timecode = (seconds) => {
  if (!Number.isFinite(seconds)) return "0:00";
  const s = Math.floor(seconds);
  return `${Math.floor(s / 60)}:${pad(s % 60)}`;
};

export default function BuildReel({ eyebrow = "Building", title, clips }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const [durations, setDurations] = useState(() => clips.map(() => NaN));

  const stageRef = useRef(null);
  const videoRefs = useRef([]);
  const fillRefs = useRef([]);
  const clockRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPlaying(false);
    }
  }, []);

  useEffect(() => {
    setDurations(videoRefs.current.map((video) => video?.duration ?? NaN));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    if (stageRef.current) observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === active && playing && inView) {
        video.play().catch(() => setPlaying(false));
      } else {
        video.pause();
      }
    });
  }, [active, playing, inView]);

  useEffect(() => {
    let frame;
    const paint = () => {
      const video = videoRefs.current[active];
      if (video) {
        const ratio = video.duration ? video.currentTime / video.duration : 0;
        fillRefs.current.forEach((fill, i) => {
          if (!fill) return;
          const value = i < active ? 1 : i > active ? 0 : ratio;
          fill.style.transform = `scaleX(${value})`;
        });
        if (clockRef.current) {
          clockRef.current.textContent = timecode(video.currentTime);
        }
      }
      frame = requestAnimationFrame(paint);
    };
    paint();
    return () => cancelAnimationFrame(frame);
  }, [active]);

  const goTo = (i) => {
    const video = videoRefs.current[i];
    if (video) video.currentTime = 0;
    setActive(i);
    setPlaying(true);
  };

  const advance = () => goTo((active + 1) % clips.length);

  const fullscreen = () => {
    const video = videoRefs.current[active];
    if (!video) return;
    if (video.requestFullscreen) video.requestFullscreen();
    else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
  };

  const total = durations.reduce((sum, d) => sum + (d || 0), 0);
  const clip = clips[active];

  return (
    <section className="mt-16 md:mt-20 lg:-mx-16">
      <div className="mb-5 flex items-end justify-between gap-6">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-8 bg-accent" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-warm-400">
              {eyebrow}
            </span>
          </div>
          <h2 className="font-serif text-2xl tracking-tight text-warm-900 md:text-3xl">
            {title}
          </h2>
        </div>
        {total > 0 && (
          <span className="shrink-0 pb-1 text-sm tabular-nums text-warm-400">
            {clips.length} clips · {timecode(total)}
          </span>
        )}
      </div>

      <div
        ref={stageRef}
        className="group relative aspect-video overflow-hidden rounded-2xl bg-black shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)] ring-1 ring-warm-200"
      >
        {clips.map((c, i) => (
          <video
            key={c.src}
            ref={(el) => (videoRefs.current[i] = el)}
            src={c.src}
            poster={c.poster}
            muted
            playsInline
            preload={i === 0 ? "auto" : "metadata"}
            onEnded={advance}
            onLoadedMetadata={(e) => {
              const { duration } = e.currentTarget;
              setDurations((prev) => prev.map((d, j) => (j === i ? duration : d)));
            }}
            aria-hidden={i !== active}
            style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[900ms] ${i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
              }`}
          />
        ))}

        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause" : "Play"}
          className="absolute inset-0 z-10 cursor-pointer focus-visible:outline-none"
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/45 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between p-3 md:p-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-white/80 ring-1 ring-white/10 backdrop-blur-md">
            <span className="relative flex h-1.5 w-1.5">
              {playing && inView && (
                <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-75" />
              )}
              <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="tabular-nums">
              {pad(active + 1)} / {pad(clips.length)}
            </span>
          </span>
          <button
            type="button"
            onClick={fullscreen}
            aria-label="Watch fullscreen"
            className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white/80 opacity-0 ring-1 ring-white/10 backdrop-blur-md transition-opacity duration-300 hover:text-white focus-visible:opacity-100 group-hover:opacity-100 max-md:opacity-100"
          >
            <Maximize2 size={14} />
          </button>
        </div>

        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <AnimatePresence>
            {!playing && (
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-md"
              >
                <Play size={22} className="translate-x-0.5" fill="currentColor" />
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-4 p-4 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex min-w-0 items-baseline gap-3 md:gap-4"
            >
              <span className="font-serif text-3xl leading-none text-white/35 md:text-5xl">
                {pad(active + 1)}
              </span>
              <div className="min-w-0">
                <p className="text-base font-medium text-white md:text-lg">
                  {clip.title}
                </p>
                {clip.caption && (
                  <p className="mt-1 hidden max-w-md text-sm leading-relaxed text-white/65 sm:block">
                    {clip.caption}
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex shrink-0 items-center gap-3">
            <span className="text-xs tabular-nums text-white/60">
              <span ref={clockRef}>0:00</span> / {timecode(durations[active])}
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15 backdrop-blur-md">
              {playing ? (
                <Pause size={14} fill="currentColor" />
              ) : (
                <Play size={14} className="translate-x-px" fill="currentColor" />
              )}
            </span>
          </div>
        </div>
      </div>

      <div
        className="mt-3 grid gap-3"
        style={{ gridTemplateColumns: `repeat(${clips.length}, minmax(0, 1fr))` }}
      >
        {clips.map((c, i) => (
          <button
            key={c.src}
            type="button"
            onClick={() => goTo(i)}
            aria-current={i === active ? "step" : undefined}
            className={`group/chapter flex cursor-pointer flex-col gap-3 rounded-xl p-2 text-left transition-colors duration-300 hover:bg-warm-100 ${i === active ? "" : "opacity-60 hover:opacity-100"
              }`}
          >
            <span className="relative h-[2px] w-full overflow-hidden rounded-full bg-warm-200">
              <span
                ref={(el) => (fillRefs.current[i] = el)}
                className="absolute inset-0 origin-left scale-x-0 bg-accent"
              />
            </span>
            <span className="flex items-center gap-3">
              {c.poster && (
                <img
                  src={c.poster}
                  alt=""
                  className="hidden aspect-video w-16 shrink-0 rounded-md object-cover ring-1 ring-warm-200 sm:block"
                />
              )}
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] uppercase tracking-[0.2em] text-warm-400 tabular-nums">
                  {pad(i + 1)} · {timecode(durations[i])}
                </span>
                <span className="block truncate text-sm text-warm-800">
                  {c.title}
                </span>
              </span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
