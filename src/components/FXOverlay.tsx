"use client";

import { useEffect, useState } from "react";

// Fixed, non-interactive overlay: animated film grain + CRT scanlines for a
// hacker/analog texture across the whole page. Disabled when the user prefers
// reduced motion.
export default function FXOverlay() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90]">
      <div className="absolute inset-0 fx-scanlines opacity-40" />
      {!reduced && (
        <div className="absolute inset-0 overflow-hidden fx-grain opacity-[0.05]" />
      )}
      {/* edge vignette */}
      <div className="absolute inset-0 [box-shadow:inset_0_0_180px_60px_rgba(0,0,0,0.9)]" />
    </div>
  );
}
