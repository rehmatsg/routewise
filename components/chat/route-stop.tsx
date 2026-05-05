'use client'

import { cn } from '@/lib/utils'
import {
  Coffee,
  Utensils,
  Fuel,
  Camera,
  Bed,
  ShoppingBag,
  MapPin,
  Star,
  TreePine,
  Music,
} from 'lucide-react'

export type RouteStopCategory =
  | 'food'
  | 'coffee'
  | 'fuel'
  | 'attraction'
  | 'lodging'
  | 'shopping'
  | 'scenic'
  | 'entertainment'
  | 'default'

const categoryConfig: Record<
  RouteStopCategory,
  { icon: React.ReactNode; label: string; className: string }
> = {
  food: {
    icon: <Utensils className="h-3.5 w-3.5" />,
    label: 'Food',
    className: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  },
  coffee: {
    icon: <Coffee className="h-3.5 w-3.5" />,
    label: 'Coffee',
    className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  },
  fuel: {
    icon: <Fuel className="h-3.5 w-3.5" />,
    label: 'Fuel',
    className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  },
  attraction: {
    icon: <Star className="h-3.5 w-3.5" />,
    label: 'Attraction',
    className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  },
  lodging: {
    icon: <Bed className="h-3.5 w-3.5" />,
    label: 'Lodging',
    className: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  },
  shopping: {
    icon: <ShoppingBag className="h-3.5 w-3.5" />,
    label: 'Shopping',
    className: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  },
  scenic: {
    icon: <TreePine className="h-3.5 w-3.5" />,
    label: 'Scenic',
    className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  },
  entertainment: {
    icon: <Music className="h-3.5 w-3.5" />,
    label: 'Entertainment',
    className: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
  },
  default: {
    icon: <MapPin className="h-3.5 w-3.5" />,
    label: 'Stop',
    className: 'bg-muted text-muted-foreground',
  },
}

export interface RouteStopProps {
  name: string
  location: string
  category?: RouteStopCategory
  description?: string | null
  state?: 'input-streaming' | 'input-available' | 'output-available'
}

export function RouteStop({
  name,
  location,
  category = 'default',
  description,
  state = 'input-available',
}: RouteStopProps) {
  const config = categoryConfig[category] ?? categoryConfig.default

  if (state === 'input-streaming') {
    return (
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-card animate-pulse min-w-56">
        <div className="h-8 w-8 rounded-full bg-muted shrink-0" />
        <div className="flex flex-col gap-1.5 flex-1">
          <div className="h-3 w-24 bg-muted rounded" />
          <div className="h-2.5 w-16 bg-muted rounded" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-3 px-4 py-3 rounded-xl border border-border bg-card hover:bg-muted/30 transition-colors min-w-56 max-w-xs">
      <div
        className={cn(
          'flex items-center justify-center h-8 w-8 rounded-full shrink-0 mt-0.5',
          config.className
        )}
      >
        {config.icon}
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{name}</p>
        <p className="text-xs text-muted-foreground truncate">{location}</p>
        {description && (
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

export interface RouteStopListProps {
  stops: Array<{
    name: string
    location: string
    category?: RouteStopCategory
    description?: string | null
  }>
  state?: 'input-streaming' | 'input-available' | 'output-available'
}

export function RouteStopList({ stops, state = 'input-available' }: RouteStopListProps) {
  return (
    <div className="flex flex-col gap-2">
      {stops.map((stop, i) => (
        <RouteStop key={i} {...stop} state={state} />
      ))}
    </div>
  )
}
