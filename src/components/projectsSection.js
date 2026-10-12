"use client";

import { useState } from "react";
import * as motion from "motion/react-client";
import ListRow from "@/components/listRow";
import { categories, projects } from "@/data/projects";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, delay },
});

const rowLink = (project) =>
  project.links?.[0]?.href ?? `/projects/${project.slug}`;

export default function ProjectsSection() {
  const [active, setActive] = useState(categories[0].key);
  const shown = projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="py-10 px-4 scroll-mt-24">
      <div className="max-w-3xl mx-auto">
        <motion.div {...fadeUp()} className="mb-6">
          <div className="w-8 h-px bg-accent mb-4" />
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-3">
            <h2 className="text-2xl md:text-3xl font-serif text-warm-900">
              My Proudest Projects.
            </h2>
            <div
              role="tablist"
              aria-label="Project category"
              className="flex items-baseline gap-5"
            >
              {categories.map(({ key, label }) => {
                const selected = key === active;
                return (
                  <button
                    key={key}
                    role="tab"
                    type="button"
                    aria-selected={selected}
                    onClick={() => setActive(key)}
                    className={`relative pb-1 text-sm transition-colors duration-300 cursor-pointer ${
                      selected
                        ? "text-warm-900"
                        : "text-warm-400 hover:text-warm-600"
                    }`}
                  >
                    {label}
                    {selected && (
                      <motion.span
                        layoutId="project-tab-underline"
                        className="absolute inset-x-0 -bottom-px h-px bg-accent"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        <div className="divide-y divide-warm-200/70">
          {shown.map((project, i) => (
            <motion.div
              key={`${active}-${project.slug}`}
              {...fadeUp(i * 0.05)}
            >
              <ListRow
                compact
                logo={project.logo}
                title={project.title}
                dates={project.dates}
                link={rowLink(project)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
