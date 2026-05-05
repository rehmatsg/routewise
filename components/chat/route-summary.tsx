'use client'

import { Clock, Navigation, MapPin, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { RouteStopCategory } from './route-stop'
import {
  Coffee,
  Utensils,
  Fuel,
  Camera,
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

const stopCategoryIcons: Record<RouteStopCategory, React.ReactNode> = {
  food: <Utensils className="h-3 w-3" />,
  coffee: <Coffee className="h-3 w-3" />,
  fuel: <Fuel className="h-3 w-3" />,
  attraction: <Star className="h-3 w-3" />,
  lodging: <Bed className="h-3 w-3" />,
  shopping: <ShoppingBag className="h-3 w-3" />,
  scenic: <TreePine className="h-3 w-3" />,
  entertainment: <Music className="h-3 w-3" />,
  default: <MapPin className="h-3 w-3" />,
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
      <div className="rounded-xl border border-border bg-card p-4 max-w-sm w-full animate-pulse">
        <div className="h-4 w-32 bg-muted rounded mb-4" />
        <div className="flex flex-col gap-3">
          <div className="h-3 w-24 bg-muted rounded" />
          <div className="h-3 w-20 bg-muted rounded" />
          <div className="h-3 w-28 bg-muted rounded" />
        </div>
      </div>
    )
  }

  const timelineItems = [
    { label: origin, isEndpoint: true, isOrigin: true, durationFromPrev: null },
    ...stops.map((s) => ({ label: s.name, isEndpoint: false, isOrigin: false, category: s.category, durationFromPrev: s.durationFromPrev ?? null })),
    { label: destination, isEndpoint: true, isOrigin: false, durationFromPrev: null },
  ]

  return (
    <div className="rounded-xl border border-border bg-card p-4 max-w-sm w-full">
      {/* Header stats */}
      <div className="flex items-center gap-4 mb-4 pb-3 border-b border-border">
        {totalDistance && (
          <div className="flex items-center gap-1.5">
            <Navigation className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-foreground">{totalDistance}</span>
          </div>
        )}
        {totalDuration && (
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-foreground">{totalDuration}</span>
          </div>
        )}
        {approximateEta && (
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground">ETA</span>
            <span className="text-xs font-medium text-foreground">{approximateEta}</span>
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="flex flex-col">
        {timelineItems.map((item, index) => {
          const isLast = index === timelineItems.length - 1
          const category = ('category' in item ? item.category : undefined) as RouteStopCategory | undefined

          return (
            <div key={index} className="flex gap-3">
              {/* Timeline column */}
              <div className="flex flex-col items-center w-5 shrink-0">
                {/* Dot */}
                <div
                  className={cn(
                    'rounded-full shrink-0 z-10',
                    item.isEndpoint
                      ? 'h-4 w-4 bg-foreground border-2 border-background ring-2 ring-foreground mt-0.5'
                      : 'h-3 w-3 bg-muted-foreground/40 border border-border mt-1'
                  )}
                />
                {/* Connector line */}
                {!isLast && (
                  <div className="w-px flex-1 bg-border mt-1 mb-1 min-h-[20px]" />
                )}
              </div>

              {/* Content */}
              <div className={cn('flex flex-col pb-3 min-w-0 flex-1', isLast && 'pb-0')}>
                <div className="flex items-center gap-1.5">
                  {category && stopCategoryIcons[category] && (
                    <span className="text-muted-foreground">
                      {stopCategoryIcons[category]}
                    </span>
                  )}
                  <span
                    className={cn(
                      'text-sm truncate',
                      item.isEndpoint
                        ? 'font-semibold text-foreground'
                        : 'text-muted-foreground'
                    )}
                  >
                    {item.label}
                  </span>
                </div>
                {item.durationFromPrev && (
                  <span className="text-xs text-muted-foreground mt-0.5">
                    {item.durationFromPrev} from previous stop
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
