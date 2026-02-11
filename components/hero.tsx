import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-road.jpg"
          alt="Scenic highway winding through mountains at sunset"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/70 to-background" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            Coming Soon
          </span>
        </div>

        <h1 className="font-display max-w-4xl text-balance text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl">
          The road trip you{" "}
          <span className="text-primary">actually want</span>, planned by AI
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          Stop spreadsheet-planning your adventures. Routewise combines scenic
          routes, EV charging, curated dining, and overnight stays into one
          intelligent itinerary.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#waitlist"
            className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-6 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Get Early Access
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="/proposal"
            className="inline-flex h-12 items-center gap-2 rounded-lg border border-border bg-card px-6 text-base font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            Read the Proposal
          </a>
        </div>

        <div className="mt-16 grid max-w-lg grid-cols-3 gap-8 text-center">
          <div>
            <p className="font-display text-3xl font-bold text-foreground">
              $214B
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Driving vacation market
            </p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold text-foreground">
              11.8%
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              US EV market share 2026
            </p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold text-foreground">
              0
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Apps that do it all
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
