"use client";

import { useEffect, useState, type ReactNode } from "react";
import { TerminalLoader } from "@/components/ui/terminal-loader";
import { GlassFilter } from "@/components/ui/liquid-glass-button";
import Nav from "./Nav";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";
import FXOverlay from "./FXOverlay";

export default function SiteShell({ children }: { children: ReactNode }) {
  // `null` until we've checked sessionStorage, to avoid a flash of the loader.
  const [showLoader, setShowLoader] = useState<boolean | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("vinet:visited");
    /* eslint-disable react-hooks/set-state-in-effect */
    if (seen) {
      setShowLoader(false);
      setLoaded(true);
    } else {
      setShowLoader(true);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem("vinet:visited", "1");
    setShowLoader(false);
    setLoaded(true);
  };

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
