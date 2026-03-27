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
  const hasSelected = state === 'output-available' && selectedId

  return (
    <div className="flex flex-col gap-3 max-w-md">
      <p className="text-sm font-medium text-foreground">{question}</p>
      <div className="flex flex-col gap-2">
        {options.map((option) => {
          const isSelected = selectedId === option.id

          return (
            <button
              key={option.id}
              onClick={() => isSelectable && onSelect(option)}
              disabled={!isSelectable}
              className={cn(
                'flex items-center justify-between px-4 py-3 rounded-xl border text-sm text-left transition-all',
                isSelectable && 'hover:bg-muted hover:border-foreground/20 cursor-pointer',
                !isSelectable && !isSelected && 'opacity-50 cursor-default',
                isSelected
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-background border-border text-foreground'
              )}
            >
              <span>{option.label}</span>
              {isSelected && <Check className="h-4 w-4 shrink-0 ml-2" />}
            </button>
          )
        })}
      </div>
      {state === 'input-streaming' && (
        <p className="text-xs text-muted-foreground">Loading options...</p>
      )}
    </div>
  )
}
