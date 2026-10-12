"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ className = "", showLabel = false }) {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch (e) {}
    setDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={`flex items-center gap-2 text-warm-700 transition-colors hover:text-warm-900 cursor-pointer ${className}`}
    >

      <span className="inline-flex h-5 w-5 items-center justify-center">
        {mounted && (dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />)}
      </span>
      {showLabel && <span>{dark ? "Light" : "Dark"}</span>}
    </button>
  );
}
