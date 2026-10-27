"use client";

import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useSyncExternalStore, ViewTransition } from "react";
import { MOBILE_BELOW, type Memory, memories, pickPeek, portal, RETURN_KEY } from "@/lib/memories";

// The photos peeking out, picked at random on the client. Kept outside React so the
// header, which stays mounted across pages, keeps the same ones on the way back from
// the scene and they have somewhere to land
let peek: Memory[] | null = null;
const listeners = new Set<() => void>();
const NONE: Memory[] = [];
const choose = () => {
  const ids = pickPeek();
  peek = memories.filter((m) => ids.includes(m.id));
};
const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
const getPeek = () => {
  if (!peek) choose();
  return peek!;
};
const repick = () => {
  choose();
  listeners.forEach((fn) => fn());
};
let visitedHome = false;

// Fetches the scene's photos at the size it asks for, so the first visit opens on
// pictures instead of blank frames
let warmed = false;
const warmScene = () => {
  if (warmed) return;
  warmed = true;
  const phone = window.innerWidth < MOBILE_BELOW;
  for (const m of memories) {
    if (phone && !m.phone) continue;
    const { srcSet, sizes } = getImageProps({ src: m.photo, alt: "", fill: true, sizes: "360px" }).props;
    const img = new window.Image();
    if (sizes) img.sizes = sizes;
    if (srcSet) img.srcset = srcSet;
    img.decode().catch(() => {});
  }
};

// The photos stay hidden at first, then peek out once to say they're there
const ARM_AFTER_MS = 5000;
const TEASE_FOR_MS = 4000;
// How close the cursor has to come to the avatar or name to bring them out
const NEAR_PX = 100;

/** On the home page the avatar opens the memories scene, with a few photos peeking out */
export function AvatarLink({ children }: { children: React.ReactNode }) {
  const home = usePathname() === "/";
  const linkRef = useRef<HTMLAnchorElement>(null);
  const cards = useSyncExternalStore(subscribe, getPeek, () => NONE);

  // Layout effect: when coming back from the memories scene the photos have to be
  // in place before the first paint, so the ones gliding home have somewhere to land
  useLayoutEffect(() => {
    const link = linkRef.current;
    if (!home || !link) return;

    // Without a cursor there's nothing to bring them back, so on touch they stay out
    const touch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    let armed = false;
    let teasing = false;
    let returning = false;
    let near = false;
    let focused = false;
    let raf = 0;
    let px = 0;
    let py = 0;
    const timers: number[] = [];

    const update = () => {
      const show = armed && (touch || teasing || returning || near || focused);
      if (show) link.dataset.show = "";
      else delete link.dataset.show;
      if (teasing) link.dataset.tease = "";
      else delete link.dataset.tease;
    };

    let cameBack = false;
    try {
      cameBack = sessionStorage.getItem(RETURN_KEY) === "1";
      sessionStorage.removeItem(RETURN_KEY);
    } catch {}

    // A fresh set each time the visitor lands here, except when the old ones are flying home
    if (!cameBack && visitedHome) repick();
    visitedHome = true;
    const idle = window.requestIdleCallback?.(warmScene, { timeout: 3000 }) ?? window.setTimeout(warmScene, 1500);

    if (cameBack) {
      // Already out, with no rise, then tucked away once the visitor has seen them land
      armed = true;
      returning = true;
      link.dataset.instant = "";
      update();
      requestAnimationFrame(() => requestAnimationFrame(() => delete link.dataset.instant));
      timers.push(
        window.setTimeout(() => {
          returning = false;
          update();
          // Once they've tucked away out of sight, deal a fresh set for next time
          timers.push(
            window.setTimeout(() => {
              if (!near && !focused) repick();
            }, 900),
          );
        }, TEASE_FOR_MS),
      );
    } else {
      timers.push(
        window.setTimeout(() => {
          armed = true;
          teasing = true;
          update();
          timers.push(
            window.setTimeout(() => {
              teasing = false;
              update();
            }, TEASE_FOR_MS),
          );
        }, ARM_AFTER_MS),
      );
    }

    const measure = () => {
      raf = 0;
      const r = link.getBoundingClientRect();
      const dx = Math.max(r.left - px, 0, px - r.right);
      const dy = Math.max(r.top - py, 0, py - r.bottom);
      const next = Math.hypot(dx, dy) < NEAR_PX;
      if (next !== near) {
        near = next;
        update();
      }
    };
    // Checked at most once a frame, and only reads layout
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      px = e.clientX;
      py = e.clientY;
      if (!raf) raf = requestAnimationFrame(measure);
    };
    const onLeaveWindow = () => {
      near = false;
      update();
    };
    const onFocus = () => {
      focused = link.matches(":focus-visible");
      update();
    };
    const onBlur = () => {
      focused = false;
      update();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);
    link.addEventListener("focus", onFocus);
    link.addEventListener("blur", onBlur);

    return () => {
      timers.forEach(clearTimeout);
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else clearTimeout(idle);
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
      link.removeEventListener("focus", onFocus);
      link.removeEventListener("blur", onBlur);
      delete link.dataset.show;
      delete link.dataset.tease;
      delete link.dataset.instant;
    };
  }, [home]);

  return (
    <Link
      ref={linkRef}
      href={home ? "/memories" : "/"}
      aria-label={home ? "See the personal side: memories" : "Home"}
      onClick={(e) => {
        if (!home || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        // The scene opens out of the avatar, a 40px circle at the link's left edge
        const r = e.currentTarget.getBoundingClientRect();
        portal("open", r.left + 20, r.top + r.height / 2);
      }}
      className="avatar-peek group relative flex items-center gap-3"
    >
      {home && (
        <span aria-hidden className="avatar-peek-cards">
          {/* Each card becomes the same photo in the scene, so it glides across */}
          {cards.map((m) => (
            <ViewTransition key={m.id} name={`memory-${m.id}`} share="morph" default="none">
              <span className="avatar-peek-card">
                <Image src={m.photo} alt="" fill loading="eager" sizes="88px" className="object-cover" />
              </span>
            </ViewTransition>
          ))}
        </span>
      )}
      {home ? (
        // The scene puts its own name in this exact spot, so it holds still across the switch
        <ViewTransition name="memories-identity" share="identity-lock" default="none">
          <span className="relative z-10 flex items-center gap-3">{children}</span>
        </ViewTransition>
      ) : (
        children
      )}
    </Link>
  );
}
