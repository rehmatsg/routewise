'use client'

import { useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, UIMessage } from 'ai'
import { ArrowUp, RotateCcw, Pencil, Check, X, Square } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputActions,
  PromptInputAction,
} from '@/components/prompt-kit/prompt-input'
import { PromptSuggestion } from '@/components/prompt-kit/prompt-suggestion'
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

const SUGGESTIONS = [
  'Plan a road trip from NYC to LA',
  'Best scenic routes in the Pacific Northwest',
  'EV-friendly road trip tips',
  'Hidden gems along Route 66',
]

function getMessageText(message: UIMessage): string {
  return (
    message.parts
      ?.filter((p): p is { type: 'text'; text: string } => p.type === 'text')
      .map((p) => p.text)
      .join('') || ''
  )
}

export default function ChatPage() {
  const [input, setInput] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')

  const { messages, sendMessage, status, setMessages, stop } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })

  const isLoading = status === 'streaming' || status === 'submitted'
  const isEmpty = messages.length === 0

  const handleSubmit = () => {
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput('')
  }

  const handleSuggestion = (text: string) => {
    sendMessage({ text })
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
      {/* Header */}
      <div className="flex items-center justify-center h-14 border-b border-border shrink-0">
        <span className="text-sm font-medium text-foreground">GPT-5.4</span>
      </div>

      {/* Messages */}
      <ChatContainerRoot className="flex-1 min-h-0">
        <ChatContainerContent className="max-w-3xl mx-auto w-full px-4 py-6 space-y-6">
          {isEmpty && (
            <div className="flex items-center justify-center min-h-[40vh]">
              <p className="text-2xl font-semibold text-foreground tracking-tight">
                What can I help with?
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
                  <div className="max-w-[80%] flex flex-col gap-1">
                    <Message>
                      <MessageContent className="bg-transparent p-0 text-sm leading-relaxed">
                        <p className="whitespace-pre-wrap">
                          {text}
                          {isStreaming && (
                            <span className="inline-block w-0.5 h-4 bg-foreground ml-0.5 animate-pulse align-text-bottom" />
                          )}
                        </p>
                      </MessageContent>
                    </Message>
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
        {/* Suggestions shown only when chat is empty */}
        {isEmpty && (
          <div className="flex flex-wrap gap-2 mb-3 justify-center">
            {SUGGESTIONS.map((s) => (
              <PromptSuggestion
                key={s}
                onClick={() => handleSuggestion(s)}
                className="text-xs h-8 px-3 rounded-full border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                {s}
              </PromptSuggestion>
            ))}
          </div>
        )}

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
        <p className="text-center text-xs text-muted-foreground mt-2">
          GPT-5.4 can make mistakes. Check important info.
        </p>
      </div>
    </div>
  )
}
