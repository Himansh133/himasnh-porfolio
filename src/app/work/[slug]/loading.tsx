export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center animate-pulse">
      <div className="mx-auto h-4 w-32 rounded-full bg-neutral-200 dark:bg-neutral-800" />
      <div className="mx-auto mt-6 h-12 w-64 rounded-2xl bg-neutral-100 dark:bg-neutral-800/60" />
      <div className="mx-auto mt-8 h-48 w-full max-w-2xl rounded-3xl bg-neutral-100 dark:bg-neutral-800/40" />
    </div>
  );
}
