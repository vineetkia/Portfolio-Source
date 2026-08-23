// A hairline rule between sections: a thin gradient that fades out at both
// ends so it reads as a soft boundary rather than a hard border, with a small
// emerald node at the centre to tie it to the rest of the accent system.
export default function SectionRule() {
  return (
    <div aria-hidden className="mx-auto max-w-5xl px-6">
      <div className="relative flex items-center">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/12 to-transparent" />
        <span className="mx-3 h-1 w-1 rotate-45 bg-emerald-400/50" />
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      </div>
    </div>
  );
}
