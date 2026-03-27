"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { ArrowRight, Sparkles } from "lucide-react";

function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    let globe: ReturnType<typeof createGlobe> | null = null;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const size = canvas.offsetWidth;

    globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: size * 2,
      height: size * 2,
      phi: 0,
      theta: 0.2,
      dark: 0,
      diffuse: 1.1,
      mapSamples: 16000,
      mapBrightness: 4,
      mapBaseBrightness: 0.05,
      baseColor: [0.96, 0.96, 0.96],
      markerColor: [0.15, 0.15, 0.15],
      glowColor: [0.9, 0.9, 0.9],
      markers: [
        { location: [37.78, -122.44], size: 0.04 },
        { location: [40.71, -74.01], size: 0.04 },
        { location: [51.51, -0.13], size: 0.04 },
        { location: [35.68, 139.65], size: 0.04 },
        { location: [48.86, 2.35], size: 0.04 },
        { location: [-33.87, 151.21], size: 0.04 },
      ],
      opacity: 0.95,
    });

    function animate() {
      phi += 0.003;
      globe?.update({ phi });
      requestAnimationFrame(animate);
    }
    animate();

    return () => {
      globe?.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="aspect-square w-full"
      style={{ contain: "layout paint size" }}
    />
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-background pt-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-2">
        {/* Text */}
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-foreground" />
            <span className="text-sm font-medium text-foreground">
              Coming Soon
            </span>
          </div>

          <h1 className="font-sans text-balance text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
            Road trips, planned by AI
          </h1>

          <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
            Scenic routes, EV charging, curated dining, and overnight stays —
            one intelligent itinerary, zero spreadsheets.
          </p>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
            <a
              href="#waitlist"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Get Early Access
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/proposal"
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-card px-6 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Read the Proposal
            </a>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 border-t border-border pt-8">
            <div>
              <p className="font-sans text-2xl font-bold text-foreground">
                $214B
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Driving vacation market
              </p>
            </div>
            <div>
              <p className="font-sans text-2xl font-bold text-foreground">
                11.8%
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                US EV market share 2026
              </p>
            </div>
            <div>
              <p className="font-sans text-2xl font-bold text-foreground">0</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Apps that do it all
              </p>
            </div>
          </div>
        </div>

        {/* Globe */}
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-md">
            <Globe />
          </div>
        </div>
      </div>
    </section>
  );
}
