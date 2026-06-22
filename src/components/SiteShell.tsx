"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { TerminalLoader } from "@/components/ui/terminal-loader";
import { GlassFilter } from "@/components/ui/liquid-glass-button";
import Nav from "./Nav";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";
import FXOverlay from "./FXOverlay";

// Module-scoped flag: survives any remount of SiteShell within the page's
// lifetime, so the intro loader can never replay mid-session even if React
// re-mounts the tree. sessionStorage additionally covers in-tab refreshes.
let loaderPlayed = false;

export default function SiteShell({ children }: { children: ReactNode }) {
  // `null` until we've decided, to avoid a flash of the loader.
  const [showLoader, setShowLoader] = useState<boolean | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let seen = loaderPlayed;
    try {
      seen = seen || sessionStorage.getItem("vinet:visited") === "1";
    } catch {
      // sessionStorage may be unavailable (privacy mode) — rely on the module flag.
    }
    /* eslint-disable react-hooks/set-state-in-effect */
    if (seen) {
      setShowLoader(false);
      setLoaded(true);
    } else {
      setShowLoader(true);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const handleComplete = useCallback(() => {
    loaderPlayed = true;
    try {
      sessionStorage.setItem("vinet:visited", "1");
    } catch {
      /* ignore */
    }
    setShowLoader(false);
    setLoaded(true);
  }, []);

  return (
    <>
      {showLoader && <TerminalLoader onComplete={handleComplete} />}
      <GlassFilter />
      <FXOverlay />
      <CustomCursor />
      <Nav visible={loaded} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
