"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import createGlobe from "cobe";
import { ArrowRight, MapPin, Navigation, Sparkles } from "lucide-react";

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

function TripForm() {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const canSubmit = from.trim().length > 0 && to.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    const prompt = encodeURIComponent(`Help me plan a trip from ${from.trim()} to ${to.trim()}`);
    router.push(`/chat?message=${prompt}`);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-10 w-full max-w-md">
      <div className="flex flex-col rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        {/* Start At */}
        <div className="flex items-center gap-3 px-4 py-3.5">
          <Navigation className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Start at..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>

        {/* Divider */}
        <div className="mx-4 h-px bg-border" />

        {/* Destination */}
        <div className="flex items-center gap-3 px-4 py-3.5">
          <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Destination..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <button
            type="submit"
            disabled={!canSubmit}
            aria-label="Plan trip"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity hover:opacity-80 disabled:opacity-25 disabled:cursor-not-allowed"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </form>
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

          <TripForm />
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
