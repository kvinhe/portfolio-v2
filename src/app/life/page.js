"use client";

import { useCallback, useEffect, useState } from "react";
import * as motion from "motion/react-client";
import { ArrowLeft, Play, X } from "lucide-react";
import { exchange, intro, quotes } from "@/data/life";

/*
  This page opts out of the site palette on purpose. The homepage is warm
  paper, hairline rules and restraint; this is black, kinetic and loud. The
  colours are hard-coded rather than themed so the contrast survives the
  light/dark toggle — the jolt between the two pages IS the design.

  The motion belongs to the footage: the page itself holds still.
*/

const isVideo = (item) => Boolean(item.src && item.src.endsWith(".mp4"));

/* Film grain, inline so nothing extra crosses the network. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.42'/%3E%3C/svg%3E\")";

/* ── Section title ────────────────────────────────────────────────────── */

/*
  Static, at display size. The motion on this page belongs to the pictures —
  a heading that slides past too is just noise competing with them.
*/
function SectionTitle({ text }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="px-6 font-serif text-[15vw] leading-[0.85] tracking-[-0.03em] md:px-10 md:text-[11vw]"
      style={{ color: "#ffffff" }}
    >
      {text}
    </motion.h2>
  );
}

/* ── Film grid ────────────────────────────────────────────────────────── */

/*
  A 3×2 grid pinned to the viewport height, so the whole body of work is in
  one view. The set is small and finite — hiding any of it behind a scroll
  or a swipe would only make it look bigger than it is.
*/
function FilmTile({ item, n, total, onOpen }) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: (n - 1) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group relative block aspect-video w-full overflow-hidden text-left md:aspect-auto md:h-full"
    >
      {item.poster ? (
        /* YouTube embeds can't self-thumbnail, so those two carry a still
           pulled from img.youtube.com. */
        <img
          src={item.poster}
          alt={item.place}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-[1200ms] ease-out group-hover:scale-[1.04] group-hover:opacity-100"
        />
      ) : (
        /* A local clip paints its own first frame once metadata arrives, so
           it needs no poster file. The #t=0.1 fragment nudges Safari, which
           otherwise leaves the element blank until playback starts. */
        <video
          src={`${item.src}#t=0.1`}
          preload="metadata"
          muted
          playsInline
          aria-label={item.place}
          className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-[1200ms] ease-out group-hover:scale-[1.04] group-hover:opacity-100"
        />
      )}

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/10"
      />

      <div className="relative flex h-full flex-col justify-between p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/45 tabular-nums">
            {String(n).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </span>
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/30 bg-black/25 backdrop-blur-sm transition duration-500 group-hover:scale-110 group-hover:border-white/80 group-hover:bg-black/50 md:h-11 md:w-11">
            <Play size={14} className="ml-0.5 fill-white text-white" />
          </span>
        </div>

        <div>
          <h3 className="text-xl font-medium leading-tight tracking-tight text-white transition-transform duration-500 ease-out group-hover:translate-x-1 md:text-2xl">
            {item.place}
          </h3>
          {item.note && (
            <p className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-white/55">
              {item.note}
            </p>
          )}
        </div>
      </div>
    </motion.button>
  );
}

/* ── Lightbox ──────────────────────────────────────────────────────────── */

function Lightbox({ items, index, onClose, onStep }) {
  const item = items[index];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onStep]);

  if (!item) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 z-10 p-2 text-white/60 transition hover:text-white"
      >
        <X size={22} />
      </button>

      <div
        className="relative max-h-full w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* The video element only exists here, so a 65 MB clip downloads
            when someone asks to watch it and not one moment earlier. */}
        {isVideo(item) ? (
          <video
            key={item.src}
            src={item.src}
            poster={item.poster}
            controls
            autoPlay
            playsInline
            className="max-h-[80vh] w-full rounded-sm bg-black"
          />
        ) : item.youtube ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-sm">
            <iframe
              src={`${item.youtube}?autoplay=1`}
              title={item.place}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        ) : (
          <img
            src={item.src}
            alt={item.place}
            className="mx-auto max-h-[80vh] w-auto rounded-sm"
          />
        )}

        <div className="mt-4 flex items-baseline justify-between gap-6">
          <div>
            <p className="font-serif text-2xl italic text-white">{item.place}</p>
            {item.note && (
              <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/50">
                {item.note}
              </p>
            )}
          </div>
          <p className="flex-shrink-0 text-[11px] uppercase tracking-[0.18em] text-white/40 tabular-nums">
            {index + 1} / {items.length}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Quotes ───────────────────────────────────────────────────────────── */

/*
  Type scale is a function of length: a short line earns the full display
  size, a long one steps down so it stays readable at speed. Without this
  every quote gets the same treatment and the longest one wins by default,
  which is the opposite of what you want.
*/
const quoteScale = (text) => {
  if (text.length < 80) return "text-2xl md:text-4xl";
  if (text.length < 130) return "text-xl md:text-3xl";
  return "text-lg md:text-2xl";
};

function Quote({ quote, i }) {
  const alignRight = i % 2 === 1;

  return (
    <motion.figure
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`relative py-8 md:py-10 ${alignRight ? "md:ml-auto md:text-right" : ""} max-w-2xl`}
    >
      {/*
        An oversized quotation mark as watermark, bled off the edge and set
        low enough in opacity to read as texture rather than as punctuation.
      */}
      <span
        aria-hidden
        className={`pointer-events-none absolute -top-2 select-none font-serif text-[6rem] leading-none text-white/[0.06] md:text-[9rem] ${alignRight ? "-right-3 md:-right-8" : "-left-3 md:-left-8"
          }`}
      >
        &ldquo;
      </span>

      <blockquote
        className={`relative font-light leading-snug tracking-tight text-white ${quoteScale(
          quote.text,
        )}`}
      >
        {quote.text}
      </blockquote>

      {quote.attribution && (
        <figcaption
          className={`mt-4 flex items-center gap-3 ${alignRight ? "md:justify-end" : ""}`}
        >
          {!alignRight && <span className="h-px w-7 bg-accent/60" />}
          <span className="text-[11px] uppercase tracking-[0.25em] text-white/55">
            {quote.attribution}
            {quote.source && (
              <span className="text-white/30"> · {quote.source}</span>
            )}
          </span>
          {alignRight && (
            <span className="hidden h-px w-7 bg-accent/60 md:block" />
          )}
        </figcaption>
      )}
    </motion.figure>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function LifePage() {
  const [open, setOpen] = useState(null);

  const films = exchange.films;

  const step = useCallback(
    (d) =>
      setOpen((i) => (i === null ? i : (i + d + films.length) % films.length)),
    [films.length],
  );

  return (
    <div className="min-h-screen bg-[#0a0908] text-white">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[5] opacity-[0.16] mix-blend-screen"
        style={{ backgroundImage: GRAIN }}
      />

      {/* Hero — type only. The photographs start below the fold, so the first
          thing felt is the drop in temperature. */}
      <section className="relative flex min-h-[88vh] flex-col justify-between px-6 pb-10 pt-8 md:px-10 md:pb-14">
        <div className="flex items-center justify-between">
          <a
            href="/"
            className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/45 transition hover:text-white"
          >
            <ArrowLeft
              size={13}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            Kevin He
          </a>
          <span className="text-[11px] uppercase tracking-[0.2em] text-white/35">
            {intro.kicker}
          </span>
        </div>

        <div>
          <h1 className="font-serif text-[16vw] leading-[0.82] tracking-[-0.03em] text-white md:text-[11vw]">
            {/* One word per line, each arriving a beat after the last. */}
            {intro.title.split(" ").map((word, i, words) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="block"
              >
                {word}
                {i === words.length - 1 && (
                  <span className="text-accent">.</span>
                )}
              </motion.span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-12 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-white/35"
          >
            <span className="h-px w-10 bg-white/25" />
            Scroll
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <SectionTitle text={exchange.title} />

        <div className="mx-auto mb-10 mt-8 max-w-3xl px-6 md:mb-14 md:px-10">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent">
              {exchange.dates}
            </p>
            <p className="max-w-md text-sm leading-relaxed text-white/50">
              {exchange.blurb}
            </p>
          </div>
        </div>

        {/*
          Fixed grid height on desktop so all six land inside one viewport;
          on mobile it falls back to 16:9 tiles.
        */}
        <div className="grid grid-cols-1 gap-2 px-6 sm:grid-cols-2 md:h-[72vh] md:grid-cols-3 md:grid-rows-2 md:px-10">
          {films.map((film, i) => (
            <FilmTile
              key={film.src ?? film.youtube}
              item={film}
              n={i + 1}
              total={films.length}
              onOpen={() => setOpen(i)}
            />
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 py-12 md:py-16">
        <SectionTitle text={quotes.title} />

        {/* Same header row as the films above, so the two sections rhyme. */}
        <div className="mx-auto mb-6 mt-8 max-w-3xl px-6 md:mb-10 md:px-10">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent">
            </p>
            <p className="max-w-md text-sm leading-relaxed text-white/50">
              {quotes.blurb}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <div className="divide-y divide-white/10">
            {quotes.items.map((quote, i) => (
              <Quote key={quote.text} quote={quote} i={i} />
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-20 text-center md:px-10 md:py-28">
        <a
          href="/"
          className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/45 transition hover:text-white"
        >
          <ArrowLeft
            size={13}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
          {intro.footer}
        </a>
      </footer>

      {open !== null && (
        <Lightbox
          items={films}
          index={open}
          onClose={() => setOpen(null)}
          onStep={step}
        />
      )}
    </div>
  );
}
