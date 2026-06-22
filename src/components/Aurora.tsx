// A calm, GPU-cheap aurora: a few large blurred color blobs drifting slowly over
// near-black, with a faint grid. Replaces the noisy WebGL shader behind the
// project cards so the glassmorphism reads cleanly on top.
export default function Aurora({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none overflow-hidden bg-[#050505] ${className}`}
    >
      <div className="absolute -left-[10%] top-[5%] h-[55vh] w-[55vh] rounded-full bg-emerald-500/20 blur-[120px] aurora-a" />
      <div className="absolute right-[5%] top-[20%] h-[50vh] w-[50vh] rounded-full bg-teal-500/15 blur-[130px] aurora-b" />
      <div className="absolute bottom-[5%] left-[30%] h-[45vh] w-[45vh] rounded-full bg-sky-500/12 blur-[120px] aurora-c" />

      {/* faint grid for structure */}
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:56px_56px]" />

      {/* darken so cards pop */}
      <div className="absolute inset-0 bg-black/55" />
    </div>
  );
}
