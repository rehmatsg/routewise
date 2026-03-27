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
import { Streamdown } from 'streamdown'
import 'streamdown/styles.css'
import { Button } from '@/components/ui/button'
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputActions,
  PromptInputAction,
} from '@/components/prompt-kit/prompt-input'
import {
  Message,
  MessageContent,
  MessageActions,
  MessageAction,
} from '@/components/prompt-kit/message'
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
  })

  // Auto-send message from landing page query param
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
      {/* Messages */}
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
            const text = getMessageText(message)
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
                      <div className="flex flex-col gap-2 w-full">
                        <PromptInput
                          value={editText}
                          onValueChange={setEditText}
                          onSubmit={submitEdit}
                          className="bg-muted border-border"
                        >
                          <PromptInputTextarea
                            placeholder="Edit message..."
                            autoFocus
                          />
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
                        <Message>
                          <MessageContent className="bg-muted rounded-3xl px-4 py-3 text-sm leading-relaxed">
                            <p className="whitespace-pre-wrap">{text}</p>
                          </MessageContent>
                        </Message>
                        <MessageActions className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <MessageAction tooltip="Edit">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 rounded-full"
                              onClick={() => handleEdit(message)}
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                          </MessageAction>
                        </MessageActions>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="max-w-[80%] flex flex-col gap-3">
                    {/* Render text content */}
                    {text && (
                      <Message>
                        <MessageContent className="bg-transparent p-0 text-sm leading-relaxed prose prose-sm max-w-none prose-p:my-1 prose-headings:mt-3 prose-headings:mb-1">
                          <Streamdown
                            animated={{ animation: 'blurIn', duration: 200, easing: 'ease-out' }}
                            isAnimating={isStreaming}
                            caret={isStreaming ? 'block' : undefined}
                          >
                            {text}
                          </Streamdown>
                        </MessageContent>
                      </Message>
                    )}

                    {/* Render tool invocations */}
                    {message.parts
                      ?.filter((part): part is Extract<typeof part, { type: `tool-${string}` }> =>
                        part.type.startsWith('tool-')
                      )
                      .map((part) => {
                        if (part.toolName === 'askMultipleChoice') {
                          const toolPart = part as {
                            type: string
                            toolName: string
                            toolCallId: string
                            state: 'input-streaming' | 'input-available' | 'output-available' | 'output-error'
                            input?: { question: string; options: { id: string; label: string }[] }
                            output?: { selectedId: string; selectedLabel: string }
                          }
                          return (
                            <MultipleChoice
                              key={toolPart.toolCallId}
                              question={toolPart.input?.question || 'Loading...'}
                              options={toolPart.input?.options || []}
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

                    {!isLoading && (
                      <MessageActions className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MessageAction tooltip="Regenerate">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-full"
                            onClick={() => regenerate(index)}
                          >
                            <RotateCcw className="h-3.5 w-3.5" />
                          </Button>
                        </MessageAction>
                      </MessageActions>
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
