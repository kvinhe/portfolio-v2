import { ArrowUpRight } from "lucide-react";

function ListRow({
  dates,
  logo,
  title,
  subtitle,
  blurb,
  meta = [],
  details = [],
  link,
  compact = false,
}) {
  const isExternal = typeof link === "string" && link.startsWith("http");

  return (
    <a
      href={link}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`group block cursor-pointer ${compact ? "py-2.5" : "py-3"}`}
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="flex items-center gap-1.5 text-base md:text-lg font-medium tracking-tight text-warm-800 transition-colors duration-300 group-hover:text-accent">
          {logo && (
            <img
              src={logo}
              alt=""
              aria-hidden
              className="h-[1em] w-[1em] flex-shrink-0 rounded-[3px] object-contain"
            />
          )}
          {title}
          <ArrowUpRight
            size={16}
            className="text-warm-300 opacity-0 -translate-x-1 transition-all duration-300 group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100"
          />
        </h3>
        {dates && (
          <span className="flex-shrink-0 text-xs md:text-sm text-warm-400 tabular-nums">
            {dates}
          </span>
        )}
      </div>

      {subtitle && <p className="mt-1 text-sm text-warm-500">{subtitle}</p>}

      {blurb && (
        <p className="mt-1.5 text-sm leading-relaxed text-warm-500">{blurb}</p>
      )}

      {meta.length > 0 && (
        <p className="mt-2 text-xs tracking-wide text-warm-400">
          {meta.join(" · ")}
        </p>
      )}

      {details.length > 0 && (
        <div className="mt-3 max-h-96 overflow-hidden opacity-100 transition-all duration-500 ease-out md:mt-0 md:max-h-0 md:opacity-0 md:group-hover:mt-3 md:group-hover:max-h-96 md:group-hover:opacity-100">
          <ul className="space-y-1.5">
            {details.map((item, i) => (
              <li
                key={i}
                className="flex gap-2 text-sm leading-relaxed text-warm-500"
              >
                <span className="select-none text-warm-300">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </a>
  );
}

export default ListRow;
