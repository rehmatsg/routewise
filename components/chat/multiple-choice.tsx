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

  // Once answered, show a clean recap card
  if (state === 'output-available' && selectedOption) {
    return (
      <div className="flex flex-col gap-1.5 max-w-md">
        <p className="text-xs font-medium text-muted-foreground">{question}</p>
        <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-foreground text-background text-xs font-medium">
          <Check className="h-3 w-3" />
          {selectedOption.label}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 max-w-lg w-full">
      <p className="text-sm font-medium text-foreground text-balance">{question}</p>
      {state === 'input-streaming' ? (
        <div className="grid grid-cols-2 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-12 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => isSelectable && onSelect(option)}
              disabled={!isSelectable}
              className={cn(
                'flex items-center justify-center px-4 py-3 rounded-xl border text-sm font-medium text-center transition-all',
                isSelectable && 'hover:bg-muted hover:border-foreground/30 cursor-pointer active:scale-[0.98]',
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
