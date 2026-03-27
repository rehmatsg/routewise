"use client"

import { useEffect, useRef, useState } from "react"
import createGlobe from "cobe"
import { MapPin, Navigation, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let phi = 0
    let globe: ReturnType<typeof createGlobe> | null = null
    const canvas = canvasRef.current
    if (!canvas) return

    const size = canvas.offsetWidth

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
      opacity: 0.9,
    })

    function animate() {
      phi += 0.003
      globe?.update({ phi })
      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      globe?.destroy()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="aspect-square w-full"
      style={{ contain: "layout paint size" }}
    />
  )
}

type TripStartStateProps = {
  onSubmit: (from: string, to: string) => void
}

export function TripStartState({ onSubmit }: TripStartStateProps) {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")

  const canSubmit = from.trim() && to.trim()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    onSubmit(from.trim(), to.trim())
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && canSubmit) {
      e.preventDefault()
      onSubmit(from.trim(), to.trim())
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden">
      {/* Globe background — faded, large, centered */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <div className="w-[600px] max-w-[90vw] opacity-40">
          <Globe />
        </div>
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-4 w-full max-w-md">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Where are you headed?
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Enter your start and destination to plan your trip.
          </p>
        </div>

        {/* Grouped address inputs */}
        <form
          onSubmit={handleSubmit}
          className="w-full rounded-2xl border border-border bg-background shadow-sm overflow-hidden"
        >
          {/* Start At */}
          <div className="flex items-center gap-3 px-4 py-3.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted">
              <Navigation className="h-3.5 w-3.5 text-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <label
                htmlFor="trip-from"
                className="block text-[10px] font-medium uppercase tracking-widest text-muted-foreground mb-0.5"
              >
                Start At
              </label>
              <input
                id="trip-from"
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="New York, NY"
                autoComplete="off"
                className={cn(
                  "w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60",
                  "outline-none border-none focus:ring-0 leading-snug"
                )}
              />
            </div>
          </div>

          {/* Divider */}
          <div className="relative flex items-center">
            <div className="h-px flex-1 bg-border ml-14" />
          </div>

          {/* Destination */}
          <div className="flex items-center gap-3 px-4 py-3.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground">
              <MapPin className="h-3.5 w-3.5 text-background" />
            </div>
            <div className="flex-1 min-w-0">
              <label
                htmlFor="trip-to"
                className="block text-[10px] font-medium uppercase tracking-widest text-muted-foreground mb-0.5"
              >
                Destination
              </label>
              <input
                id="trip-to"
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Los Angeles, CA"
                autoComplete="off"
                className={cn(
                  "w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60",
                  "outline-none border-none focus:ring-0 leading-snug"
                )}
              />
            </div>
          </div>

          {/* Submit row */}
          <div className="border-t border-border px-4 py-3 flex justify-end">
            <Button
              type="submit"
              size="sm"
              disabled={!canSubmit}
              className="rounded-xl gap-1.5 text-xs h-8 px-4"
            >
              Plan Trip
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
