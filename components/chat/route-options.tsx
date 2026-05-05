'use client'

import { Clock, Navigation, Leaf, Zap, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

export interface RouteOption {
  id: string
  name: string
  description?: string | null
  distance?: string | null
  duration?: string | null
  highlights?: string[] | null
  tags?: Array<'scenic' | 'fast' | 'eco' | 'popular'> | null
}

export interface RouteOptionsProps {
  question?: string
  options: RouteOption[]
  state?: 'input-streaming' | 'input-available' | 'output-available'
  selectedId?: string | null
  onSelect?: (option: RouteOption) => void
}

const tagConfig = {
  scenic: { label: 'Scenic', icon: <Star className="h-3 w-3" />, className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  fast: { label: 'Fastest', icon: <Zap className="h-3 w-3" />, className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  eco: { label: 'Eco', icon: <Leaf className="h-3 w-3" />, className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
  popular: { label: 'Popular', icon: <Star className="h-3 w-3" />, className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
}

export function RouteOptions({
  question = 'Which route do you prefer?',
  options,
  state = 'input-available',
  selectedId,
  onSelect,
}: RouteOptionsProps) {
  const isSelectable = state === 'input-available'
  const selectedOption = options.find((o) => o.id === selectedId)

  if (state === 'input-streaming') {
    return (
      <div className="flex flex-col gap-3 max-w-sm w-full">
        <div className="h-4 w-48 bg-muted rounded animate-pulse" />
        {[1, 2].map((i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-4 animate-pulse">
            <div className="h-4 w-32 bg-muted rounded mb-2" />
            <div className="h-3 w-full bg-muted rounded mb-3" />
            <div className="flex gap-2">
              <div className="h-5 w-16 bg-muted rounded-full" />
              <div className="h-5 w-16 bg-muted rounded-full" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (state === 'output-available' && selectedOption) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-muted/50 text-sm max-w-md">
        <Check className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        <span className="text-muted-foreground">{question}</span>
        <span className="text-foreground font-medium">&mdash; {selectedOption.name}</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 max-w-sm w-full">
      <p className="text-sm font-medium text-foreground">{question}</p>
      <div className="flex flex-col gap-2">
        {options.map((option) => {
          const isSelected = option.id === selectedId

          return (
            <button
              key={option.id}
              onClick={() => isSelectable && onSelect?.(option)}
              disabled={!isSelectable}
              className={cn(
                'flex flex-col gap-2 p-4 rounded-xl border text-left transition-all w-full',
                isSelected
                  ? 'border-foreground bg-foreground/5'
                  : 'border-border bg-card hover:border-foreground/30 hover:bg-muted/30',
                !isSelectable && 'opacity-50 cursor-default',
                isSelectable && 'cursor-pointer'
              )}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">{option.name}</p>
                {isSelected && (
                  <div className="h-5 w-5 rounded-full bg-foreground flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 text-background" />
                  </div>
                )}
              </div>

              {option.description && (
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {option.description}
                </p>
              )}

              <div className="flex items-center gap-3">
                {option.distance && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Navigation className="h-3 w-3" />
                    {option.distance}
                  </span>
                )}
                {option.duration && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {option.duration}
                  </span>
                )}
              </div>

              {option.highlights && option.highlights.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  Highlights: {option.highlights.join(' · ')}
                </p>
              )}

              {option.tags && option.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {option.tags.map((tag) => {
                    const config = tagConfig[tag]
                    if (!config) return null
                    return (
                      <span
                        key={tag}
                        className={cn(
                          'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold',
                          config.className
                        )}
                      >
                        {config.icon}
                        {config.label}
                      </span>
                    )
                  })}
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
