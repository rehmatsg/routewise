'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, UIMessage } from 'ai'
import { Send, RotateCcw, Pencil, Check, X } from 'lucide-react'

export default function ChatPage() {
  const [input, setInput] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })

  const isLoading = status === 'streaming' || status === 'submitted'

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput('')
  }

  const handleEdit = (message: UIMessage) => {
    const text = message.parts
      ?.filter((p): p is { type: 'text'; text: string } => p.type === 'text')
      .map((p) => p.text)
      .join('') || ''
    setEditingId(message.id)
    setEditText(text)
  }

  const submitEdit = () => {
    if (!editingId || !editText.trim()) return
    
    const messageIndex = messages.findIndex((m) => m.id === editingId)
    if (messageIndex === -1) return

    // Truncate history to before the edited message
    const truncatedMessages = messages.slice(0, messageIndex)
    setMessages(truncatedMessages)
    setEditingId(null)
    
    // Send the edited message
    sendMessage({ text: editText })
    setEditText('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText('')
  }

  const regenerate = (messageIndex: number) => {
    // Find the last user message before this assistant message
    const userMessage = messages
      .slice(0, messageIndex)
      .reverse()
      .find((m) => m.role === 'user')
    
    if (!userMessage) return

    const userText = userMessage.parts
      ?.filter((p): p is { type: 'text'; text: string } => p.type === 'text')
      .map((p) => p.text)
      .join('') || ''

    // Truncate to before the user message that triggered this response
    const userIndex = messages.findIndex((m) => m.id === userMessage.id)
    const truncatedMessages = messages.slice(0, userIndex)
    setMessages(truncatedMessages)
    
    // Re-send the user message
    sendMessage({ text: userText })
  }

  const getMessageText = (message: UIMessage): string => {
    return message.parts
      ?.filter((p): p is { type: 'text'; text: string } => p.type === 'text')
      .map((p) => p.text)
      .join('') || ''
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-8">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full min-h-[60vh]">
              <p className="text-muted-foreground text-lg">Start a conversation</p>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`mb-6 ${message.role === 'user' ? 'flex justify-end' : ''}`}
            >
              {message.role === 'user' ? (
                <div className="max-w-[85%]">
                  {editingId === message.id ? (
                    <div className="flex flex-col gap-2">
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full p-3 rounded-2xl border border-border bg-card text-foreground resize-none focus:outline-none focus:ring-1 focus:ring-foreground"
                        rows={3}
                        autoFocus
                      />
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={cancelEdit}
                          className="p-2 rounded-full hover:bg-muted transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <button
                          onClick={submitEdit}
                          className="p-2 rounded-full bg-foreground text-background hover:opacity-80 transition-opacity"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="group flex items-start gap-2">
                      <button
                        onClick={() => handleEdit(message)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-full hover:bg-muted transition-all mt-2"
                      >
                        <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                      </button>
                      <div className="bg-muted px-4 py-3 rounded-2xl">
                        <p className="text-foreground whitespace-pre-wrap">
                          {getMessageText(message)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="max-w-[85%] group">
                  <div className="bg-card border border-border px-4 py-3 rounded-2xl">
                    <p className="text-foreground whitespace-pre-wrap">
                      {getMessageText(message)}
                      {status === 'streaming' && index === messages.length - 1 && (
                        <span className="inline-block w-1.5 h-4 bg-foreground ml-0.5 animate-pulse" />
                      )}
                    </p>
                  </div>
                  {!isLoading && (
                    <button
                      onClick={() => regenerate(index)}
                      className="opacity-0 group-hover:opacity-100 mt-2 p-1.5 rounded-full hover:bg-muted transition-all flex items-center gap-1.5 text-xs text-muted-foreground"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Regenerate
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-border bg-background">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-end gap-3 bg-card border border-border rounded-2xl px-4 py-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
              placeholder="Message..."
              className="flex-1 bg-transparent resize-none focus:outline-none text-foreground placeholder:text-muted-foreground max-h-32"
              rows={1}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2 rounded-full bg-foreground text-background disabled:opacity-40 hover:opacity-80 transition-opacity"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
