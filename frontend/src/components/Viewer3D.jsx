import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";

const FashionModelScene = lazy(() => import("./FashionModelScene.jsx"));

export default function Viewer3D({ designOptions }) {
  return (
    <div className="viewer-page flex h-[calc(100vh-65px)] w-full flex-col">
      <div className="viewer-controls flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[var(--color-pink)]">
            3D Preview
          </span>
          <span className="rounded-full bg-[rgba(141,92,255,0.12)] px-3 py-1 text-xs font-bold text-[var(--color-purple)]">
            Interactive
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/studio/patterns"
            className="rounded-full border border-[rgba(32,26,31,0.12)] bg-[rgba(255,247,240,0.6)] px-4 py-2 text-xs font-black text-[var(--color-ink)] backdrop-blur-xl transition hover:bg-[rgba(255,79,163,0.1)]"
          >
            Generate Patterns →
          </Link>
        </div>
      </div>
      <div className="viewer-canvas-container relative flex-1">
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center bg-[#070609]">
              <div className="text-center">
                <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-pink)] border-t-transparent" />
                <p className="text-sm font-bold text-[rgba(255,247,240,0.6)]">Loading 3D model...</p>
              </div>
            </div>
          }
        >
          <FashionModelScene
            mode="inspection"
            cameraMood="orbit"
            clothingType={designOptions?.clothingType || "Dress"}
            designOptions={designOptions}
            interactive={true}
            showFbxModel={true}
          />
        </Suspense>
      </div>
    </div>
  );
}
