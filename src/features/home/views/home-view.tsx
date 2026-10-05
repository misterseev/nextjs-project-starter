import type { CSSProperties } from "react";

import Image from "next/image";

import { HomeMotion } from "./home-motion";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h16m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

const foundations = [
  {
    number: "01",
    title: "Thoughtfully structured.",
    description:
      "A clear home for every feature. Less friction today, more room to grow tomorrow.",
    iconClasses: [
      "size-6 top-[3px] left-1.5 [transform:rotate(-30deg)_skewX(25deg)_scaleY(0.7)]",
      "size-6 top-2.5 left-1.5 [transform:rotate(-30deg)_skewX(25deg)_scaleY(0.7)]",
      "size-6 top-[17px] left-1.5 [transform:rotate(-30deg)_skewX(25deg)_scaleY(0.7)]",
    ],
  },
  {
    number: "02",
    title: "Made to be discovered.",
    description:
      "Server-rendered content, considered metadata, and accessibility from the start.",
    iconClasses: [
      "size-6 top-[7px] left-1 rounded-full",
      "size-6 top-[7px] left-[13px] rounded-full",
      "size-1 top-[17px] left-[18px] rounded-full bg-[#333]",
    ],
  },
  {
    number: "03",
    title: "Ready for your ideas.",
    description:
      "TypeScript, reusable components, and a modern stack. The essentials, already in place.",
    iconClasses: [
      "size-6 top-2 left-2",
      "size-6 top-2 left-2 rotate-30",
      "size-6 top-2 left-2 rotate-60",
    ],
  },
];

export function HomeView({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <HomeMotion className="mx-auto max-w-[1800px] px-[clamp(24px,5.5vw,88px)] font-display">
      <header className="flex min-h-[100px] items-center justify-between gap-6 border-b border-border max-[700px]:min-h-20 max-[700px]:gap-3">
        <a
          href="#overview"
          className="flex items-center gap-3 text-[15px] font-semibold tracking-[-0.5px] max-[700px]:gap-[9px] max-[700px]:text-[12px]"
          aria-label={`${name} home`}
        >
          <Image
            width={32}
            height={32}
            src="/aif-logo.png"
            alt=""
            className="size-8 shrink-0 object-contain"
          />
          <span>{name}</span>
        </a>
        <nav
          className="flex items-center gap-[42px] text-[13px] max-[700px]:text-[11px]"
          aria-label="Main navigation"
        >
          <a
            className="py-3.5 text-[#606060] hover:text-[#111] max-[700px]:hidden"
            href="#foundation"
          >
            The foundation
          </a>
          <a
            className="flex items-center gap-[26px] border-b border-foreground py-[11px] [&_svg]:transition-transform [&_svg]:duration-200 hover:[&_svg]:translate-x-[3px] hover:[&_svg]:-translate-y-0.5 max-[700px]:gap-2.5 max-[700px]:[&_svg]:w-4"
            href="#start"
          >
            Let’s build <Arrow diagonal />
          </a>
        </nav>
      </header>
      <main id="main-content" tabIndex={-1}>
        <section
          className="relative grid grid-cols-[1.15fr_1fr] pt-[62px] min-[1500px]:pt-[75px] max-[1050px]:gap-4 max-[700px]:grid-cols-1 max-[700px]:gap-0 max-[700px]:pt-[42px]"
          id="overview"
          aria-labelledby="hero-heading"
        >
          <div className="relative z-[1] pt-10 pb-[70px] min-[1500px]:pt-[65px] min-[1500px]:pb-[90px] max-[700px]:pt-0 max-[700px]:pb-[35px]">
            <p
              className="flex items-center gap-[9px] font-label font-normal leading-[1.7] tracking-[1.2px] text-[10px] max-[700px]:text-[8px] max-[700px]:tracking-[1px]"
              data-enter
            >
              <span className="mr-[3px] size-1.5 rounded-full bg-foreground shadow-[0_0_0_4px_#eee]" />{" "}
              A SMALL START. A BIG POSSIBILITY.
            </p>
            <h1
              id="hero-heading"
              className="mt-[29px] mb-[25px] text-[clamp(60px,6.6vw,106px)] leading-[1.02] font-medium tracking-[-0.075em] max-[1050px]:text-[clamp(55px,7vw,74px)] max-[700px]:mt-[26px] max-[700px]:text-[clamp(54px,11.7vw,80px)]"
            >
              <span className="-mb-2 block overflow-hidden pb-2 [&>span]:block [&>span]:origin-bottom-left">
                <span data-title>Good ideas.</span>
              </span>
              <span className="-mb-2 block overflow-hidden pb-2 [&>span]:block [&>span]:origin-bottom-left">
                <span data-title>
                  Great starts<span className="text-[#929292]">.</span>
                </span>
              </span>
            </h1>
            <p
              className="max-w-[365px] text-[16px] leading-[1.8] text-muted-foreground max-[700px]:max-w-[330px] max-[700px]:text-[14px]"
              data-enter
            >
              {description}
            </p>
            <div
              className="mt-[33px] flex flex-wrap items-center gap-[25px] max-[1050px]:gap-2.5 max-[700px]:mt-[25px] max-[700px]:gap-x-[18px]"
              data-enter
            >
              <a
                className="flex min-h-[52px] items-center justify-between gap-7 bg-primary px-5 py-[15px] text-[13px] text-primary-foreground transition-[background,transform] duration-[180ms] hover:-translate-y-[3px] hover:bg-[#333] max-[700px]:min-h-12 max-[700px]:gap-5 max-[700px]:px-4 max-[700px]:text-[12px]"
                href="#start"
              >
                Make it yours <Arrow diagonal />
              </a>
              <a
                className="flex items-center gap-2.5 py-3.5 text-[12px] [&_svg]:transition-transform [&_svg]:duration-200 hover:[&_svg]:translate-x-[3px] hover:[&_svg]:-translate-y-0.5 max-[700px]:gap-2 max-[700px]:text-[11px]"
                href="#foundation"
              >
                Explore the foundation <Arrow />
              </a>
            </div>
            <p
              className="mt-6 font-label font-normal leading-[1.7] text-[9px] tracking-[1.1px] text-neutral-500 max-[700px]:mt-[18px] max-[700px]:text-[8px]"
              data-enter
            >
              LESS SETUP. MORE CREATING.
            </p>
          </div>
          <div
            className="relative isolate min-h-[470px] min-w-0 overflow-hidden bg-[#f6f6f6] max-[1050px]:min-h-[420px] max-[700px]:min-h-[350px]"
            data-artwork
            aria-hidden="true"
          >
            <span className="absolute top-[22px] left-[23px] font-label font-normal leading-[1.7] tracking-[1.2px] text-[9px] text-[#666]">
              FORM / 001
            </span>
            <span className="absolute top-4 right-[23px] font-[monospace] text-[20px] font-light text-neutral-500">
              +
            </span>
            <div className="absolute top-[10%] left-[10%] aspect-square w-[79%] rounded-full border border-[#e2e2e2] before:absolute before:top-1/2 before:-left-[15%] before:h-px before:w-[130%] before:bg-[#e6e6e6] before:content-[''] after:absolute after:-top-[15%] after:left-1/2 after:h-[130%] after:w-px after:bg-[#e6e6e6] after:content-[''] max-[700px]:top-[30px] max-[700px]:left-[calc(50%-130px)] max-[700px]:w-[260px]" />
            <div className="absolute inset-0 z-[2] grid place-items-center pb-[30px] perspective-[1000px]">
              <div
                className="relative aspect-square w-[clamp(160px,18vw,290px)] transform-3d [transform:rotateX(57deg)_rotateZ(-34deg)] max-[700px]:w-[190px]"
                data-sculpture
              >
                {Array.from({ length: 15 }, (_, index) => (
                  <div
                    key={index}
                    className="absolute inset-0 rounded-[22%] border border-[#555] bg-[linear-gradient(135deg,#454545_0%,#181818_45%,#090909_100%)] shadow-[1px_2px_0_#050505,2px_3px_0_#050505,3px_4px_0_#050505] [transform:translateZ(calc((var(--layer)-7)*12px))_rotate(calc(var(--layer)*5deg))] last:bg-[linear-gradient(135deg,#707070,#272727_45%,#101010)] max-[700px]:[transform:translateZ(calc((var(--layer)-7)*9px))_rotate(calc(var(--layer)*5deg))]"
                    style={{ "--layer": index } as CSSProperties}
                  />
                ))}
              </div>
            </div>
            <div className="absolute bottom-[17%] left-[23%] h-[11%] w-[54%] rounded-full bg-black opacity-[0.18] blur-[25px]" />
            <span className="absolute bottom-[22px] left-[23px] font-label font-normal leading-[1.7] tracking-[1.2px] text-[8px] text-[#666]">
              BUILT IN LAYERS.
              <br />
              OPEN TO POSSIBILITIES.
            </span>
            <span className="absolute right-[23px] bottom-[22px] font-label font-normal leading-[1.7] tracking-[1.2px] text-[8px] text-[#666]">
              X 00 — Y 01
            </span>
          </div>
          <div
            className="col-span-full flex items-center justify-between gap-5 py-[31px] text-[11px] text-neutral-500 max-[700px]:py-6 max-[700px]:text-[9px]"
            data-enter
          >
            <span>A foundation, not a limitation.</span>
            <a
              className="font-label font-normal leading-[1.7] tracking-[1.2px] text-[9px] text-[#333] max-[700px]:text-[7px] max-[700px]:tracking-[0.6px]"
              href="#foundation"
            >
              SCROLL TO EXPLORE{" "}
              <span
                className="ml-[15px] text-[17px] max-[700px]:ml-1"
                aria-hidden="true"
              >
                ↓
              </span>
            </a>
          </div>
        </section>
        <section
          className="flex items-center justify-between gap-6 border-y border-border py-[30px] max-[1050px]:flex-wrap max-[1050px]:justify-center max-[1050px]:gap-x-[35px] max-[1050px]:gap-y-[22px] max-[700px]:gap-x-[27px] max-[700px]:gap-y-5 max-[700px]:py-[25px]"
          aria-label="Built with"
        >
          <p className="font-label font-normal leading-[1.7] tracking-[1.2px] text-[8px] text-neutral-500 max-[1050px]:basis-full max-[1050px]:text-center">
            GOOD COMPANY.
            <br className="max-[1050px]:hidden" />
            GREAT FOUNDATIONS.
          </p>
          <span className="flex items-center gap-2 text-[24px] font-semibold tracking-[-0.7px] whitespace-nowrap max-[700px]:text-[20px]">
            Next.js <span className="text-[17px] font-normal">↗</span>
          </span>
          <span className="flex items-center gap-2 text-[20px] font-semibold tracking-[-0.7px] whitespace-nowrap max-[1050px]:text-[17px] max-[700px]:text-[15px]">
            <span
              className="border-[1.5px] border-current px-[3px] pt-[3px] pb-px text-[12px] tracking-[-0.5px]"
              aria-hidden="true"
            >
              TS
            </span>{" "}
            TypeScript
          </span>
          <span className="flex items-center gap-2 text-[20px] font-semibold tracking-[-0.7px] whitespace-nowrap max-[1050px]:text-[17px] max-[700px]:text-[15px]">
            <span className="text-[36px] leading-none" aria-hidden="true">
              ≈
            </span>{" "}
            Tailwind CSS
          </span>
          <span className="flex items-center gap-2 text-[20px] font-extrabold tracking-[-0.7px] whitespace-nowrap italic max-[1050px]:text-[17px] max-[700px]:text-[15px]">
            GSAP <span aria-hidden="true">↗</span>
          </span>
        </section>
        <section
          className="pt-[94px] pb-[86px] max-[700px]:py-[58px]"
          id="foundation"
          aria-labelledby="foundation-heading"
        >
          <div
            className="grid grid-cols-[1fr_2fr] items-start gap-[25px] max-[700px]:grid-cols-1 max-[700px]:gap-[18px]"
            data-reveal
          >
            <p className="mt-[9px] flex items-center gap-[9px] font-label font-normal leading-[1.7] tracking-[1.2px] text-[10px] max-[700px]:text-[8px] max-[700px]:tracking-[1px]">
              01 / THE FOUNDATION
            </p>
            <h2
              id="foundation-heading"
              className="text-[clamp(30px,3vw,48px)] leading-[1.17] font-normal tracking-[-1.8px] max-[700px]:text-[33px] max-[700px]:tracking-[-1.5px]"
            >
              Everything you need.
              <br />
              <span className="text-[#777]">Space for what’s next.</span>
            </h2>
          </div>
          <div className="mt-[54px] grid grid-cols-3 max-[700px]:mt-9 max-[700px]:grid-cols-1 max-[700px]:gap-7">
            {foundations.map((feature) => (
              <article
                key={feature.number}
                className="border-l border-border px-[34px] first:border-l-0 first:pl-0 last:pr-0 max-[1050px]:px-[22px] max-[700px]:border-b max-[700px]:border-l-0 max-[700px]:px-0 max-[700px]:pb-[25px]"
                data-reveal
              >
                <div className="mb-7 flex items-center justify-between max-[700px]:mb-[15px]">
                  <div className="relative size-10" aria-hidden="true">
                    {feature.iconClasses.map((className) => (
                      <i
                        key={className}
                        className={`absolute border border-[#333] ${className}`}
                      />
                    ))}
                  </div>
                  <span className="font-label font-normal leading-[1.7] tracking-[1.2px] text-[10px] text-neutral-500">
                    {feature.number}
                  </span>
                </div>
                <h3 className="mb-3 text-[18px] font-medium tracking-[-0.5px]">
                  {feature.title}
                </h3>
                <p className="max-w-[295px] text-[13px] leading-[1.8] text-muted-foreground max-[700px]:max-w-full">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>
        <section
          className="relative isolate flex items-center justify-between gap-8 overflow-hidden bg-[#171717] px-14 py-[53px] text-white max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-[30px] max-[700px]:px-[27px] max-[700px]:py-[35px]"
          id="start"
          aria-labelledby="start-heading"
          data-reveal
        >
          <div>
            <p className="flex items-center gap-[9px] font-label font-normal leading-[1.7] tracking-[1.2px] text-[9px] text-[#b6b6b6] max-[700px]:tracking-[1px]">
              02 / YOUR NEXT CHAPTER
            </p>
            <h2
              id="start-heading"
              className="mt-[22px] mb-[18px] text-[clamp(34px,3.6vw,55px)] leading-[1.12] font-normal tracking-[-2px] max-[700px]:text-[35px] max-[700px]:tracking-[-1.5px]"
            >
              A blank canvas.
              <br />
              An unfair head start.
            </h2>
            <p className="text-[13px] leading-[1.6] text-[#b6b6b6]">
              The foundation is here. The next great idea is yours.
            </p>
          </div>
          <div className="relative z-[1] shrink-0">
            <a
              className="flex min-h-[52px] items-center justify-between gap-[58px] bg-white px-5 py-[15px] text-[13px] text-foreground transition-[background,transform] duration-[180ms] hover:bg-[#e4e4e4] [&_svg]:transition-transform [&_svg]:duration-200 hover:[&_svg]:translate-x-[3px] hover:[&_svg]:-translate-y-0.5"
              href="https://nextjs.org/docs/app/getting-started"
            >
              Start building <Arrow diagonal />
            </a>
            <span className="mt-3.5 block font-label font-normal leading-[1.7] tracking-[1.2px] text-center text-[8px] text-[#b6b6b6]">
              YOUR IDEA. YOUR DIRECTION.
            </span>
          </div>
          <span
            className="absolute -top-[60px] right-[12%] -z-[1] font-display text-[430px] leading-none text-[#222] max-[700px]:top-2.5 max-[700px]:-right-[120px]"
            aria-hidden="true"
          >
            ✳
          </span>
        </section>
      </main>
      <footer className="flex items-center justify-between gap-6 py-[35px] max-[700px]:py-7">
        <a
          href="#overview"
          className="text-[12px] font-semibold max-[700px]:text-[11px]"
        >
          {name}
          <span className="mt-[5px] block text-[10px] font-normal text-neutral-500">
            Made for what comes next.
          </span>
        </a>
        <span className="font-label font-normal leading-[1.7] tracking-[1.2px] text-[8px] text-neutral-500 max-[1050px]:hidden">
          A LITTLE STRUCTURE. ENDLESS POSSIBILITY.
        </span>
        <a
          href="#overview"
          className="flex items-center gap-5 text-[11px] [&_span]:text-[17px] [&_span]:transition-transform [&_span]:duration-200 hover:[&_span]:-translate-y-1 max-[700px]:gap-3 max-[700px]:text-[10px]"
        >
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </footer>
    </HomeMotion>
  );
}
