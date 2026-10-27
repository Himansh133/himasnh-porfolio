export function ExternalArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={`size-2.5 text-[#D21319] transition-transform group-hover:-translate-y-px group-hover:translate-x-px ${className}`}
    >
      <path
        d="M3.5 2.5h6v6M9.5 2.5l-7 7"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
