'use client'

import { Clock, Navigation, MapPin, Flag, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { RouteStopCategory } from './route-stop'
import {
  Coffee,
  Utensils,
  Bed,
  ShoppingBag,
  Star,
  TreePine,
  Music,
} from 'lucide-react'

export interface RouteSummaryStop {
  name: string
  location: string
  category?: RouteStopCategory
  durationFromPrev?: string | null
}

export interface RouteSummaryProps {
  origin: string
  destination: string
  stops?: RouteSummaryStop[]
  totalDistance?: string | null
  totalDuration?: string | null
  approximateEta?: string | null
  state?: 'input-streaming' | 'input-available' | 'output-available'
}

const stopCategoryConfig: Partial<
  Record<RouteStopCategory, { icon: React.ReactNode; label: string }>
> = {
  food: { icon: <Utensils className="h-3.5 w-3.5" />, label: 'Food' },
  coffee: { icon: <Coffee className="h-3.5 w-3.5" />, label: 'Coffee' },
  fuel: { icon: <Zap className="h-3.5 w-3.5" />, label: 'Charging' },
  attraction: { icon: <Star className="h-3.5 w-3.5" />, label: 'Attraction' },
  lodging: { icon: <Bed className="h-3.5 w-3.5" />, label: 'Lodging' },
  shopping: { icon: <ShoppingBag className="h-3.5 w-3.5" />, label: 'Shopping' },
  scenic: { icon: <TreePine className="h-3.5 w-3.5" />, label: 'Scenic' },
  entertainment: { icon: <Music className="h-3.5 w-3.5" />, label: 'Entertainment' },
  default: { icon: <MapPin className="h-3.5 w-3.5" />, label: 'Stop' },
}

export function RouteSummary({
  origin,
  destination,
  stops = [],
  totalDistance,
  totalDuration,
  approximateEta,
  state = 'input-available',
}: RouteSummaryProps) {
  if (state === 'input-streaming') {
    return (
      <div className="rounded-2xl border border-border bg-card overflow-hidden max-w-md w-full animate-pulse">
        <div className="h-20 bg-muted" />
        <div className="p-5 flex flex-col gap-3">
          <div className="h-3 w-24 bg-muted rounded" />
          <div className="h-3 w-32 bg-muted rounded" />
          <div className="h-3 w-28 bg-muted rounded" />
          <div className="h-3 w-20 bg-muted rounded" />
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden max-w-md w-full shadow-sm">
      {/* Hero header */}
      <div className="bg-foreground text-background px-5 py-4">
        <p className="text-[10px] uppercase tracking-widest text-background/60 font-semibold mb-2">
          Your EV Trip
        </p>
        <div className="flex items-center gap-2.5">
          <div className="flex flex-col items-center pt-1">
            <div className="h-2 w-2 rounded-full bg-background ring-2 ring-background/30" />
            <div className="w-px flex-1 bg-background/30 my-1 min-h-[14px]" />
            <Flag className="h-3 w-3 text-background fill-background" />
          </div>
          <div className="flex flex-col gap-1.5 min-w-0 flex-1">
            <p className="text-base font-semibold leading-tight truncate">{origin}</p>
            <p className="text-base font-semibold leading-tight truncate text-background/90">
              {destination}
            </p>
          </div>
        </div>
      </div>

      {/* Stat strip */}
      {(totalDistance || totalDuration || approximateEta) && (
        <div className="grid grid-cols-3 divide-x divide-border border-b border-border bg-muted/30">
          {totalDistance && (
            <div className="flex flex-col items-center justify-center px-3 py-3 gap-0.5">
              <Navigation className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-sm font-semibold text-foreground leading-tight">
                {totalDistance}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Distance
              </span>
            </div>
          )}
          {totalDuration && (
            <div className="flex flex-col items-center justify-center px-3 py-3 gap-0.5">
              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-sm font-semibold text-foreground leading-tight">
                {totalDuration}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Drive Time
              </span>
            </div>
          )}
          {approximateEta && (
            <div className="flex flex-col items-center justify-center px-3 py-3 gap-0.5">
              <Flag className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-sm font-semibold text-foreground leading-tight">
                {approximateEta}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                ETA
              </span>
            </div>
          )}
        </div>
      )}

      {/* Timeline */}
      <div className="p-5">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-4">
          Itinerary
        </p>
        <div className="flex flex-col">
          {/* Origin */}
          <TimelineRow
            kind="origin"
            label={origin}
            sublabel="Start"
            isLast={false}
          />

          {/* Stops */}
          {stops.map((stop, index) => {
            const config =
              stopCategoryConfig[stop.category ?? 'default'] ??
              stopCategoryConfig.default!
            return (
              <TimelineRow
                key={index}
                kind="stop"
                label={stop.name}
                sublabel={stop.location}
                durationFromPrev={stop.durationFromPrev}
                icon={config.icon}
                categoryLabel={config.label}
                isLast={false}
              />
            )
          })}

          {/* Destination */}
          <TimelineRow
            kind="destination"
            label={destination}
            sublabel="Arrive"
            isLast
          />
        </div>
      </div>
    </div>
  )
}

interface TimelineRowProps {
  kind: 'origin' | 'stop' | 'destination'
  label: string
  sublabel?: string
  durationFromPrev?: string | null
  icon?: React.ReactNode
  categoryLabel?: string
  isLast: boolean
}

function TimelineRow({
  kind,
  label,
  sublabel,
  durationFromPrev,
  icon,
  categoryLabel,
  isLast,
}: TimelineRowProps) {
  const isEndpoint = kind === 'origin' || kind === 'destination'

  return (
    <div className="flex gap-3 group">
      {/* Timeline column */}
      <div className="flex flex-col items-center w-7 shrink-0">
        {/* Marker */}
        {isEndpoint ? (
          <div className="h-7 w-7 rounded-full bg-foreground flex items-center justify-center shrink-0">
            {kind === 'origin' ? (
              <div className="h-2 w-2 rounded-full bg-background" />
            ) : (
              <Flag className="h-3 w-3 text-background fill-background" />
            )}
          </div>
        ) : (
          <div className="h-7 w-7 rounded-full bg-background border-2 border-border flex items-center justify-center shrink-0 text-muted-foreground">
            {icon}
          </div>
        )}

        {/* Connector */}
        {!isLast && (
          <div className="w-px flex-1 bg-border mt-1 mb-1 min-h-[24px]" />
        )}
      </div>

      {/* Content */}
      <div className={cn('flex flex-col min-w-0 flex-1', isLast ? 'pb-0' : 'pb-5')}>
        {durationFromPrev && (
          <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground mb-1">
            <Clock className="h-2.5 w-2.5" />
            {durationFromPrev}
          </span>
        )}
        <div className="flex items-baseline gap-2 flex-wrap">
          <p
            className={cn(
              'text-sm leading-tight truncate',
              isEndpoint ? 'font-semibold text-foreground' : 'font-medium text-foreground'
            )}
          >
            {label}
          </p>
          {categoryLabel && !isEndpoint && (
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {categoryLabel}
            </span>
          )}
        </div>
        {sublabel && (
          <p className="text-xs text-muted-foreground mt-0.5 truncate">{sublabel}</p>
        )}
      </div>
    </div>
  )
}
