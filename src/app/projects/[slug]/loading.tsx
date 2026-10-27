export default function Loading() {
  return (
    <div className="container-narrow animate-pulse pt-12">
      <div className="h-3 w-16 rounded bg-[var(--tag-bg)]" />
      <div className="mt-8 h-5 w-56 rounded bg-[var(--tag-bg)]" />
      <div className="mt-3 h-3 w-32 rounded bg-[var(--tag-bg)]" />
      <div className="mt-6 h-16 w-full rounded bg-[var(--tag-bg)]" />
    </div>
  );
}
