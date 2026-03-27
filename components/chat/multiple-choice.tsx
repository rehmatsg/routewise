'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Option {
  id: string
  label: string
}

interface MultipleChoiceProps {
  question: string
  options: Option[]
  state: 'input-streaming' | 'input-available' | 'output-available' | 'output-error'
  selectedId?: string
  onSelect: (option: Option) => void
}

export function MultipleChoice({
  question,
  options,
  state,
  selectedId,
  onSelect,
}: MultipleChoiceProps) {
  const isSelectable = state === 'input-available'
  const selectedOption = options.find((o) => o.id === selectedId)

  // Once answered, show compact summary
  if (state === 'output-available' && selectedOption) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-muted/50 text-sm max-w-md">
        <Check className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        <span className="text-muted-foreground">{question}</span>
        <span className="text-foreground font-medium">&mdash; {selectedOption.label}</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 max-w-md">
      <p className="text-sm font-medium text-foreground">{question}</p>
      {state === 'input-streaming' ? (
        <p className="text-xs text-muted-foreground">Loading options...</p>
      ) : (
        <div className="flex flex-col gap-2">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => isSelectable && onSelect(option)}
              disabled={!isSelectable}
              className={cn(
                'flex items-center justify-between px-4 py-3 rounded-xl border text-sm text-left transition-all',
                isSelectable && 'hover:bg-muted hover:border-foreground/20 cursor-pointer',
                !isSelectable && 'opacity-50 cursor-default',
                'bg-background border-border text-foreground'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
