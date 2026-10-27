import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="container-narrow flex items-center justify-between pt-10 sm:pt-14">
      <Link href="/" className="group flex items-center gap-3">
        <span className="relative block size-10 shrink-0 overflow-hidden rounded-full bg-[var(--tag-bg)]">
          <Image
            src="/himanshu.jpg"
            alt=""
            fill
            priority
            sizes="40px"
            className="object-cover object-[center_20%]"
          />
        </span>
        <span className="leading-tight">
          <span className="block text-[14px] font-medium text-[var(--foreground)]">
            {site.name}
          </span>
          <span className="block text-[var(--muted-light)]">Software Engineer</span>
        </span>
      </Link>
      <ThemeToggle />
    </header>
  );
}
