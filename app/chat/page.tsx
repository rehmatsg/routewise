'use client'

import { Suspense, useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { useChat } from '@ai-sdk/react'
import {
  DefaultChatTransport,
  UIMessage,
  lastAssistantMessageIsCompleteWithToolCalls,
} from 'ai'
import { ArrowUp, RotateCcw, Pencil, Check, X, Square } from 'lucide-react'
import { MultipleChoice } from '@/components/chat/multiple-choice'
import { Button } from '@/components/ui/button'
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputActions,
  PromptInputAction,
} from '@/components/prompt-kit/prompt-input'
import {
  ChatContainerRoot,
  ChatContainerContent,
  ChatContainerScrollAnchor,
} from '@/components/prompt-kit/chat-container'

function getMessageText(message: UIMessage): string {
  return (
    message.parts
      ?.filter((p): p is { type: 'text'; text: string } => p.type === 'text')
      .map((p) => p.text)
      .join('') || ''
  )
}

function ChatPageInner() {
  const searchParams = useSearchParams()
  const [input, setInput] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')
  const didSendStarterRef = useRef(false)

  const { messages, sendMessage, status, setMessages, stop, addToolOutput } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
    onError: (err) => console.error('[v0] useChat error', err),
  })

  useEffect(() => {
    if (didSendStarterRef.current) return
    const message = searchParams.get('message')
    if (message) {
      didSendStarterRef.current = true
      sendMessage({ text: decodeURIComponent(message) })
    }
  }, [searchParams, sendMessage])

  const isLoading = status === 'streaming' || status === 'submitted'
  const isEmpty = messages.length === 0

  const handleSubmit = () => {
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput('')
  }

  const handleEdit = (message: UIMessage) => {
    setEditingId(message.id)
    setEditText(getMessageText(message))
  }

  const submitEdit = () => {
    if (!editingId || !editText.trim()) return
    const messageIndex = messages.findIndex((m) => m.id === editingId)
    if (messageIndex === -1) return
    setMessages(messages.slice(0, messageIndex))
    setEditingId(null)
    sendMessage({ text: editText })
    setEditText('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText('')
  }

  const regenerate = (messageIndex: number) => {
    const userMessage = messages
      .slice(0, messageIndex)
      .reverse()
      .find((m) => m.role === 'user')
    if (!userMessage) return
    const userText = getMessageText(userMessage)
    const userIndex = messages.findIndex((m) => m.id === userMessage.id)
    setMessages(messages.slice(0, userIndex))
    sendMessage({ text: userText })
  }

  return (
    <div className="flex flex-col h-screen bg-background font-sans">
      <ChatContainerRoot className="flex-1 min-h-0">
        <ChatContainerContent className="max-w-3xl mx-auto w-full px-4 py-6 space-y-6">
          {isEmpty && (
            <div className="flex items-center justify-center min-h-[60vh]">
              <p className="text-2xl font-semibold text-foreground tracking-tight">
                Where to?
              </p>
            </div>
          )}

          {messages.map((message, index) => {
            const isUser = message.role === 'user'
            const isLastMessage = index === messages.length - 1
            const isStreaming = isLoading && isLastMessage && !isUser

            return (
              <div
                key={message.id}
                className={`flex ${isUser ? 'justify-end' : 'justify-start'} group`}
              >
                {isUser ? (
                  <div className="max-w-[80%] flex flex-col items-end gap-1">
                    {editingId === message.id ? (
                      <div className="flex flex-col gap-2 w-full min-w-64">
                        <PromptInput
                          value={editText}
                          onValueChange={setEditText}
                          onSubmit={submitEdit}
                          className="bg-muted border-border"
                        >
                          <PromptInputTextarea placeholder="Edit message..." autoFocus />
                          <PromptInputActions className="justify-end pt-1">
                            <PromptInputAction tooltip="Cancel">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={cancelEdit}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </PromptInputAction>
                            <PromptInputAction tooltip="Send">
                              <Button
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={submitEdit}
                                disabled={!editText.trim()}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            </PromptInputAction>
                          </PromptInputActions>
                        </PromptInput>
                      </div>
                    ) : (
                      <>
                        <div className="bg-muted rounded-3xl px-4 py-3 text-sm leading-relaxed">
                          <p className="whitespace-pre-wrap">{getMessageText(message)}</p>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-full"
                            onClick={() => handleEdit(message)}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="max-w-[85%] flex flex-col gap-3">
                    {/* Render each part individually */}
                    {message.parts?.map((part, partIndex) => {
                      if (part.type === 'text') {
                        return (
                          <div
                            key={partIndex}
                            className="text-sm leading-relaxed text-foreground prose prose-sm max-w-none prose-p:my-1 prose-headings:mt-3 prose-headings:mb-1"
                          >
                            <span className="whitespace-pre-wrap">{part.text}</span>
                          </div>
                        )
                      }

                      if (part.type === 'tool-askMultipleChoice') {
                        const toolPart = part as {
                          type: 'tool-askMultipleChoice'
                          toolName: string
                          toolCallId: string
                          state: 'input-streaming' | 'input-available' | 'output-available' | 'output-error'
                          input?: { question: string; options: { id: string; label: string }[] }
                          output?: { selectedId: string; selectedLabel: string }
                        }
                        return (
                          <MultipleChoice
                            key={toolPart.toolCallId}
                            question={toolPart.input?.question ?? ''}
                            options={toolPart.input?.options ?? []}
                            state={toolPart.state}
                            selectedId={toolPart.output?.selectedId}
                            onSelect={(option) => {
                              addToolOutput({
                                tool: 'askMultipleChoice',
                                toolCallId: toolPart.toolCallId,
                                output: {
                                  selectedId: option.id,
                                  selectedLabel: option.label,
                                },
                              })
                            }}
                          />
                        )
                      }

                      return null
                    })}

                    {/* Streaming indicator */}
                    {isStreaming && (
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]" />
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]" />
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" />
                      </div>
                    )}

                    {!isLoading && (
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-full"
                          onClick={() => regenerate(index)}
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </ChatContainerContent>
        <ChatContainerScrollAnchor />
      </ChatContainerRoot>

      {/* Input area */}
      <div className="shrink-0 px-4 pb-6 pt-2 max-w-3xl mx-auto w-full">
        <PromptInput
          value={input}
          onValueChange={setInput}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          className="shadow-sm"
        >
          <PromptInputTextarea placeholder="Message..." />
          <PromptInputActions className="justify-end pt-1">
            {isLoading ? (
              <PromptInputAction tooltip="Stop">
                <Button
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => stop()}
                >
                  <Square className="h-3.5 w-3.5 fill-current" />
                </Button>
              </PromptInputAction>
            ) : (
              <PromptInputAction tooltip="Send" disabled={!input.trim()}>
                <Button
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={handleSubmit}
                  disabled={!input.trim()}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
              </PromptInputAction>
            )}
          </PromptInputActions>
        </PromptInput>
      </div>
    </div>
  )
}

export default function ChatPage() {
  return (
    <Suspense>
      <ChatPageInner />
    </Suspense>
  )
}
