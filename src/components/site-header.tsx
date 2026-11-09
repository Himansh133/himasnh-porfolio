import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { AvatarLink } from "./avatar-link";
import { ThemeToggle } from "./theme-toggle";

function Identity() {
  return (
    <>
      <span className="relative z-10 block size-10 shrink-0 overflow-hidden rounded-full bg-[var(--tag-bg)]">
        <Image
          src="/himanshu.jpg"
          alt=""
          fill
          priority
          sizes="40px"
          className="object-cover object-[center_20%]"
        />
      </span>
      <span className="relative z-10 leading-tight">
        <span className="block text-[14px] font-medium text-[var(--foreground)]">
          {site.name}
        </span>
        <span className="block text-[var(--muted-light)]">Software Engineer</span>
      </span>
    </>
  );
}

export function SiteHeader() {
  return (
    <header className="container-narrow flex items-center justify-between pt-20 sm:pt-32">
      {/* The pathname isn't known while prerendering dynamic routes; fall back to a plain home link */}
      <Suspense
        fallback={
          <Link href="/" className="group flex items-center gap-3">
            <Identity />
          </Link>
        }
      >
        <AvatarLink>
          <Identity />
        </AvatarLink>
      </Suspense>
      <ThemeToggle />
    </header>
  );
}
