"use client";

import * as motion from "motion/react-client";
import { useParams } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import ThemeToggle from "../../components/themeToggle";
import { timeline } from "@/data/timeline";

export default function TimelineEntryPage() {
  const { slug } = useParams();
  const entry = timeline.find(
    (e) =>
      e.slug === slug &&
      (e.video || e.youtube || (e.images && e.images.length)),
  );

  return (
    <div className="min-h-screen bg-warm-50">
      <div className="w-full border-b border-warm-200">
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <a
            href="/timeline"
            className="text-sm text-warm-400 hover:text-warm-700 transition-colors duration-300"
          >
            &larr; timeline
          </a>
          <ThemeToggle />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        {entry ? (
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-8 h-px bg-accent mb-4" />
            <p className="text-sm text-warm-400 tracking-wide mb-2">
              {entry.date}
              {entry.tag && (
                <span className="text-warm-300"> · {entry.tag}</span>
              )}
            </p>
            <h1 className="text-3xl md:text-4xl font-serif text-warm-900 tracking-tight mb-8">
              {entry.event}
            </h1>

            {(entry.video || entry.youtube) && (
              <div className="mb-8">
                {entry.video ? (
                  <div className="flex justify-center">
                    <video
                      src={entry.video}
                      controls
                      playsInline
                      className="max-h-[75vh] w-auto rounded-2xl bg-warm-900 shadow-lg ring-1 ring-warm-200"
                    />
                  </div>
                ) : (
                  <div className="relative aspect-video overflow-hidden rounded-2xl shadow-lg ring-1 ring-warm-200">
                    <iframe
                      src={entry.youtube}
                      title={entry.event}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                )}
              </div>
            )}

            {entry.images && entry.images.length > 0 && (
              <div
                className={
                  entry.images.length > 1 ? "mb-8 columns-2 gap-3" : "mb-8"
                }
              >
                {entry.images.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={entry.event}
                    className="mb-3 w-full break-inside-avoid rounded-2xl ring-1 ring-warm-200"
                  />
                ))}
              </div>
            )}

            {entry.body && (
              <div className="space-y-5">
                {entry.body
                  .trim()
                  .split(/\n\n+/)
                  .map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-warm-600 leading-relaxed whitespace-pre-line"
                    >
                      {paragraph}
                    </p>
                  ))}
              </div>
            )}
          </motion.article>
        ) : (
          <div>
            <div className="w-8 h-px bg-accent mb-4" />
            <h1 className="text-3xl md:text-4xl font-serif text-warm-900 tracking-tight mb-6">
              Entry not found.
            </h1>
            <a
              href="/timeline"
              className="group inline-flex items-center gap-1.5 text-warm-800 transition-colors duration-300 hover:text-accent cursor-pointer"
            >
              Back to the timeline
              <ArrowUpRight
                size={16}
                className="text-warm-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
