type Props = {
  index: string;
  title: string;
  subtitle?: string;
};

export default function SectionHeading({ index, title, subtitle }: Props) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm text-emerald-400">{index}</span>
        <span className="h-px w-8 bg-zinc-700" />
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-zinc-400">{subtitle}</p>
      )}
    </div>
  );
}
