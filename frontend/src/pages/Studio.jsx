import { useState } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import Catalog from "../components/Catalog";
import DesignStudio from "../components/DesignStudio";
import Viewer3D from "../components/Viewer3D";
import Patterns from "../components/Patterns";

const tabs = [
  { path: "/studio", label: "Catalog", end: true },
  { path: "/studio/design", label: "Design Studio" },
  { path: "/studio/viewer", label: "3D Viewer" },
  { path: "/studio/patterns", label: "Patterns" },
];

export default function Studio() {
  const location = useLocation();
  const [designOptions, setDesignOptions] = useState({
    color: "#e84c7c",
    fabric: "Cotton",
    sleeves: "Short sleeve",
    neck: "Round",
    pattern: "Plain",
    clothingType: "Dress",
  });

  return (
    <div className="studio-shell min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-ink)]">
      <header className="studio-header flex items-center justify-between border-b border-[rgba(32,26,31,0.1)] bg-[rgba(255,247,240,0.82)] px-6 py-4 backdrop-blur-2xl">
        <Link
          to="/"
          className="font-display text-xl font-black tracking-tight text-[var(--color-ink)] transition hover:text-[var(--color-pink)]"
        >
          ← Maison Neural
        </Link>
        <nav className="flex items-center gap-1">
          {tabs.map((tab) => {
            const isActive = tab.end
              ? location.pathname === tab.path
              : location.pathname.startsWith(tab.path);
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                  isActive
                    ? "bg-[var(--color-ink)] text-[var(--color-bg)] shadow-[0_8px_24px_rgba(255,79,163,0.2)]"
                    : "text-[rgba(32,26,31,0.58)] hover:bg-[rgba(255,79,163,0.1)] hover:text-[var(--color-ink)]"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <div className="studio-content flex-1">
        <Routes>
          <Route index element={<Catalog />} />
          <Route
            path="design"
            element={
              <DesignStudio options={designOptions} setOptions={setDesignOptions} />
            }
          />
          <Route
            path="viewer"
            element={<Viewer3D designOptions={designOptions} />}
          />
          <Route path="patterns" element={<Patterns />} />
        </Routes>
      </div>
    </div>
  );
}
