"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { VariantProps } from "class-variance-authority"

export type PromptSuggestionProps = {
  children: React.ReactNode
  variant?: VariantProps<typeof buttonVariants>["variant"]
  size?: VariantProps<typeof buttonVariants>["size"]
  className?: string
  highlight?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

function PromptSuggestion({
  children,
  variant,
  size,
  className,
  highlight,
  ...props
}: PromptSuggestionProps) {
  const isHighlightMode = highlight !== undefined && highlight.trim() !== ""
  const content = typeof children === "string" ? children : ""

  if (!isHighlightMode) {
    return (
      <Button
        variant={variant ?? "outline"}
        size={size ?? "lg"}
        className={cn("rounded-full text-sm", className)}
        {...props}
      >
        {children}
      </Button>
    )
  }

  if (!content) {
    return (
      <Button
        variant={variant ?? "ghost"}
        size={size ?? "sm"}
        className={cn("h-auto justify-start p-0 text-sm", className)}
        {...props}
      >
        {children}
      </Button>
    )
  }

  const trimmedHighlight = highlight.trim()
  const contentLower = content.toLowerCase()
  const highlightLower = trimmedHighlight.toLowerCase()
  const shouldHighlight = contentLower.includes(highlightLower)

  return (
    <Button
      variant={variant ?? "ghost"}
      size={size ?? "sm"}
      className={cn("h-auto justify-start p-0 text-sm", className)}
      {...props}
    >
      {shouldHighlight ? (
        (() => {
          const index = contentLower.indexOf(highlightLower)
          if (index === -1)
            return (
              <span className="text-muted-foreground">{content}</span>
            )

          const actualHighlightedText = content.substring(
            index,
            index + highlightLower.length
          )
          const before = content.substring(0, index)
          const after = content.substring(index + actualHighlightedText.length)

          return (
            <>
              {before && (
                <span className="text-muted-foreground">{before}</span>
              )}
              <span className="text-foreground">{actualHighlightedText}</span>
              {after && (
                <span className="text-muted-foreground">{after}</span>
              )}
            </>
          )
        })()
      ) : (
        <span className="text-muted-foreground">{content}</span>
      )}
    </Button>
  )
}

export { PromptSuggestion }
