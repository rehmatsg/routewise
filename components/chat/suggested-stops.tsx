'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { RouteStopCategory } from './route-stop'
import {
  Coffee,
  Utensils,
  Fuel,
  Bed,
  ShoppingBag,
  MapPin,
  Star,
  TreePine,
  Music,
} from 'lucide-react'

export interface SuggestedStopChip {
  id: string
  label: string
  sublabel?: string | null
  category?: RouteStopCategory
}

export interface SuggestedStopsProps {
  title?: string
  chips: SuggestedStopChip[]
  multiSelect?: boolean
  state?: 'input-streaming' | 'input-available' | 'output-available'
  selectedIds?: string[]
  onSelect?: (selected: SuggestedStopChip[]) => void
}

const categoryIcons: Partial<Record<RouteStopCategory, React.ReactNode>> = {
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

export function SuggestedStops({
  title = 'Suggested stops',
  chips,
  multiSelect = true,
  state = 'input-available',
  selectedIds: controlledSelectedIds,
  onSelect,
}: SuggestedStopsProps) {
  const [internalSelected, setInternalSelected] = useState<string[]>([])

  // When committed (output-available), use controlled ids exclusively.
  // Otherwise, prefer internal state so multi-select can stage selections
  // before the user confirms.
  const isCommitted = state === 'output-available'
  const selectedIds = isCommitted
    ? controlledSelectedIds ?? []
    : internalSelected
  const isSelectable = state === 'input-available'

  const toggle = (chip: SuggestedStopChip) => {
    if (!isSelectable) return

    if (multiSelect) {
      // Stage selections, do not commit yet
      setInternalSelected((prev) =>
        prev.includes(chip.id) ? prev.filter((id) => id !== chip.id) : [...prev, chip.id]
      )
    } else {
      // Single-select: commit immediately
      setInternalSelected([chip.id])
      if (onSelect) {
        onSelect([chip])
      }
    }
  }

  const confirm = () => {
    if (!isSelectable || internalSelected.length === 0) return
    if (onSelect) {
      onSelect(chips.filter((c) => internalSelected.includes(c.id)))
    }
  }

  if (state === 'input-streaming') {
    return (
      <div className="flex flex-col gap-2 max-w-lg">
        <div className="h-3 w-28 bg-muted rounded animate-pulse" />
        <div className="flex flex-wrap gap-2">
          {[80, 100, 70, 90, 60].map((w, i) => (
            <div
              key={i}
              className="h-8 rounded-full bg-muted animate-pulse"
              style={{ width: w }}
            />
          ))}
        </div>
      </div>
    )
  }

  if (isCommitted && selectedIds.length > 0) {
    const selected = chips.filter((c) => selectedIds.includes(c.id))
    return (
      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-medium text-muted-foreground">{title}</p>
        <div className="flex flex-wrap gap-1.5">
          {selected.map((chip) => (
            <span
              key={chip.id}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-foreground text-background"
            >
              <Check className="h-3 w-3" />
              {chip.label}
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 max-w-lg">
      {title && (
        <p className="text-sm font-medium text-foreground text-balance">{title}</p>
      )}
      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => {
          const isSelected = selectedIds.includes(chip.id)
          const icon = chip.category ? categoryIcons[chip.category] : null

          return (
            <button
              key={chip.id}
              onClick={() => toggle(chip)}
              disabled={!isSelectable}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
                isSelected
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-background text-foreground border-border hover:border-foreground/30 hover:bg-muted/50',
                !isSelectable && 'opacity-50 cursor-default',
                isSelectable && 'cursor-pointer active:scale-[0.97]'
              )}
            >
              {icon && (
                <span className={cn(isSelected ? 'text-background' : 'text-muted-foreground')}>
                  {icon}
                </span>
              )}
              {chip.label}
              {chip.sublabel && (
                <span className={cn('opacity-60', isSelected ? 'text-background' : 'text-muted-foreground')}>
                  {chip.sublabel}
                </span>
              )}
            </button>
          )
        })}
      </div>
      {multiSelect && isSelectable && (
        <div className="flex items-center gap-2">
          <button
            onClick={confirm}
            disabled={internalSelected.length === 0}
            className={cn(
              'inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all',
              internalSelected.length > 0
                ? 'bg-foreground text-background hover:bg-foreground/90 cursor-pointer'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            )}
          >
            <Check className="h-3 w-3" />
            Confirm
            {internalSelected.length > 0 && (
              <span className="opacity-70">({internalSelected.length})</span>
            )}
          </button>
          <p className="text-xs text-muted-foreground">Pick as many as you like</p>
        </div>
      )}
    </div>
  )
}
