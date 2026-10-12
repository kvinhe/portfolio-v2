'use client';

import * as motion from 'motion/react-client';
import { useParams } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import ThemeToggle from '../../components/themeToggle';
import BuildReel from '@/components/buildReel';
import { categories, projects } from '@/data/projects';

const categoryLabel = (key) => categories.find((c) => c.key === key)?.label ?? key;

export default function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  return (
    <div className="min-h-screen bg-warm-50">
      <div className="w-full border-b border-warm-200">
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <a
            href="/#projects"
            className="text-sm text-warm-400 hover:text-warm-700 transition-colors duration-300"
          >
            &larr; projects
          </a>
          <ThemeToggle />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        {project ? (
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-8 h-px bg-accent mb-4" />
            <p className="text-sm text-warm-400 tracking-wide mb-2">
              {project.dates}
              {project.category && (
                <span className="text-warm-300"> · {categoryLabel(project.category)}</span>
              )}
            </p>
            <h1 className="text-3xl md:text-4xl font-serif text-warm-900 tracking-tight mb-6">
              {project.title}
            </h1>

            {project.blurb && (
              <p className="text-lg text-warm-600 leading-relaxed mb-8">{project.blurb}</p>
            )}

            {(project.video || project.youtube) && (
              <div className="mb-8">
                {project.video ? (
                  <div className="flex justify-center">
                    <video
                      src={project.video}
                      controls
                      playsInline
                      className="max-h-[75vh] w-auto rounded-2xl bg-warm-900 shadow-lg ring-1 ring-warm-200"
                    />
                  </div>
                ) : (
                  <div className="relative aspect-video overflow-hidden rounded-2xl shadow-lg ring-1 ring-warm-200">
                    <iframe
                      src={project.youtube}
                      title={project.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                )}
              </div>
            )}

            {project.images && project.images.length > 0 && (
              <div className={project.images.length > 1 ? 'mb-8 columns-2 gap-3' : 'mb-8'}>
                {project.images.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={project.title}
                    className="mb-3 w-full break-inside-avoid rounded-2xl ring-1 ring-warm-200"
                  />
                ))}
              </div>
            )}

            {project.bullets?.length > 0 && (
              <ul className="space-y-3">
                {project.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-2.5 text-warm-600 leading-relaxed">
                    <span className="select-none text-accent/60">—</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            {project.meta?.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-1.5">
                {project.meta.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-warm-200 bg-warm-100/60 px-2.5 py-1 text-xs text-warm-600"
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}

            {project.sections?.map(
              (section) =>
                section.clips?.length > 0 && <BuildReel key={section.title} {...section} />,
            )}

            {project.body && (
              <div className="mt-8 space-y-5">
                {project.body
                  .trim()
                  .split(/\n\n+/)
                  .map((paragraph, i) => (
                    <p key={i} className="text-warm-600 leading-relaxed whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
              </div>
            )}

            {project.links?.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-warm-200/70 pt-6">
                {project.links.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-warm-800 transition-colors duration-300 hover:text-accent cursor-pointer"
                  >
                    {label}
                    <ArrowUpRight
                      size={16}
                      className="text-warm-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </a>
                ))}
              </div>
            )}
          </motion.article>
        ) : (
          <div>
            <div className="w-8 h-px bg-accent mb-4" />
            <h1 className="text-3xl md:text-4xl font-serif text-warm-900 tracking-tight mb-6">
              Project not found.
            </h1>
            <a
              href="/#projects"
              className="group inline-flex items-center gap-1.5 text-warm-800 transition-colors duration-300 hover:text-accent cursor-pointer"
            >
              Back to the projects
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
