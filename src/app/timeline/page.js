"use client";

import * as motion from "motion/react-client";
import { ArrowUpRight } from "lucide-react";
import ThemeToggle from "../components/themeToggle";
import { timeline } from "@/data/timeline";

const shortDate = (date) => date.replace(/,?\s*\d{4}$/, "").trim();

const resolveLink = (entry) => {
  if (entry.video || entry.youtube || (entry.images && entry.images.length))
    return { href: `/timeline/${entry.slug}`, external: false };
  if (entry.link) return { href: entry.link, external: true };
  return null;
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, delay },
});

const intro = "Everything I've done, in order.";

function groupByYear(entries) {
  const sorted = [...entries].sort((a, b) => b.dateISO.localeCompare(a.dateISO));
  const groups = [];
  for (const entry of sorted) {
    const year = entry.dateISO.slice(0, 4);
    const last = groups[groups.length - 1];
    if (last && last.year === year) last.items.push(entry);
    else groups.push({ year, items: [entry] });
  }
  return groups;
}

export default function TimelinePage() {
  const groups = groupByYear(timeline);

  return (
    <div className="min-h-screen bg-warm-50">
      <div className="w-full border-b border-warm-200">
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <a
            href="/"
            className="text-sm text-warm-400 hover:text-warm-700 transition-colors duration-300"
          >
            &larr; back
          </a>
          <ThemeToggle />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-8 h-px bg-accent mb-4" />
          <h1 className="text-4xl md:text-5xl font-serif italic text-warm-900 tracking-tight mb-6">
            Timeline.
          </h1>
          <p className="text-lg text-warm-600 leading-relaxed">{intro}</p>
        </motion.div>

        <div className="mt-14 space-y-12">
          {groups.map((group, gi) => (
            <motion.div key={group.year} {...fadeUp(gi * 0.05)}>
              <div className="flex items-baseline gap-4 mb-3">
                <h2 className="text-xl font-serif text-warm-900 tabular-nums">
                  {group.year}
                </h2>
                <div className="flex-1 h-px bg-warm-200/70" />
              </div>

              <div className="divide-y divide-warm-200/60">
                {group.items.map((entry, i) => {
                  const target = resolveLink(entry);
                  const dateEl = (
                    <span className="w-24 flex-shrink-0 text-sm text-warm-400 tabular-nums">
                      {shortDate(entry.date)}
                    </span>
                  );
                  const tagEl = entry.tag && (
                    <span className="flex-shrink-0 text-[10px] uppercase tracking-widest text-warm-400">
                      {entry.tag}
                    </span>
                  );

                  if (!target) {
                    return (
                      <div
                        key={`${entry.slug}-${i}`}
                        className="flex items-baseline gap-4 py-3"
                      >
                        {dateEl}
                        <span className="flex-1 text-warm-700 leading-snug">
                          {entry.event}
                        </span>
                        {tagEl}
                      </div>
                    );
                  }

                  return (
                    <a
                      key={`${entry.slug}-${i}`}
                      href={target.href}
                      target={target.external ? "_blank" : undefined}
                      rel={target.external ? "noopener noreferrer" : undefined}
                      className="group flex items-baseline gap-4 py-3 cursor-pointer"
                    >
                      {dateEl}
                      <span className="flex flex-1 items-baseline gap-1.5 text-warm-700 leading-snug transition-colors duration-300 group-hover:text-accent">
                        {entry.event}
                        <ArrowUpRight
                          size={14}
                          className="flex-shrink-0 -translate-x-1 self-center text-warm-300 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100"
                        />
                      </span>
                      {tagEl}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
