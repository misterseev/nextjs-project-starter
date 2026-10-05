"use client";

import type { ReactNode } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

export function HomeMotion({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    // Content stays visible without JavaScript and with reduced motion enabled.
    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from("[data-title]", {
            yPercent: 110,
            rotate: 3,
            duration: 1.1,
            stagger: 0.12,
          })
          .from(
            "[data-enter]",
            {
              y: 18,
              opacity: 0,
              duration: 0.75,
              stagger: 0.1,
              clearProps: "all",
            },
            0.25,
          )
          .from(
            "[data-artwork]",
            { scale: 0.9, opacity: 0, duration: 1.3, clearProps: "all" },
            0.15,
          );

        gsap.utils
          .toArray<HTMLElement>("[data-reveal]", root.current)
          .forEach((element) => {
            gsap.from(element, {
              y: 32,
              opacity: 0,
              duration: 0.85,
              ease: "power2.out",
              clearProps: "all",
              scrollTrigger: { trigger: element, start: "top 92%", once: true },
            });
          });
        gsap.to("[data-sculpture]", {
          rotationZ: 35,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-artwork]",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      },
      root,
    );

    media.add(
      "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)",
      () => {
        const artwork =
          root.current?.querySelector<HTMLElement>("[data-artwork]");
        const sculpture =
          root.current?.querySelector<HTMLElement>("[data-sculpture]");
        if (!artwork || !sculpture) return;
        const moveX = gsap.quickTo(sculpture, "x", {
          duration: 0.9,
          ease: "power3.out",
        });
        const moveY = gsap.quickTo(sculpture, "y", {
          duration: 0.9,
          ease: "power3.out",
        });
        const move = (event: PointerEvent) => {
          const bounds = artwork.getBoundingClientRect();
          moveX(((event.clientX - bounds.left) / bounds.width - 0.5) * 30);
          moveY(((event.clientY - bounds.top) / bounds.height - 0.5) * 30);
        };
        const reset = () => {
          moveX(0);
          moveY(0);
        };
        artwork.addEventListener("pointermove", move);
        artwork.addEventListener("pointerleave", reset);
        return () => {
          artwork.removeEventListener("pointermove", move);
          artwork.removeEventListener("pointerleave", reset);
        };
      },
      root,
    );
    return () => media.revert();
  }, []);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
