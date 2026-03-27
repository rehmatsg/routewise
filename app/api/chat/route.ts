import {
  convertToModelMessages,
  InferUITools,
  stepCountIs,
  streamText,
  tool,
  UIDataTypes,
  UIMessage,
  validateUIMessages,
} from 'ai'
import { z } from 'zod'

export const maxDuration = 30

const askMultipleChoiceTool = tool({
  description:
    'Ask the user a multiple choice question and wait for their selection. Use this when you need the user to pick from a set of options, for example trip pace, accommodation type, route preference, or activity interests.',
  inputSchema: z.object({
    question: z.string().describe('The question to ask the user'),
    options: z
      .array(
        z.object({
          id: z.string().describe('Unique identifier for the option'),
          label: z.string().describe('Display text for the option'),
        })
      )
      .min(2)
      .max(6)
      .describe('The options to present to the user (2-6 options)'),
  }),
  outputSchema: z.object({
    selectedId: z.string().describe('The id of the selected option'),
    selectedLabel: z.string().describe('The label of the selected option'),
  }),
})

const tools = {
  askMultipleChoice: askMultipleChoiceTool,
} as const

export type ChatMessage = UIMessage<never, UIDataTypes, InferUITools<typeof tools>>

export async function POST(req: Request) {
  console.log('[v0] /api/chat POST received')

  let body: unknown
  try {
    body = await req.json()
    console.log('[v0] request body parsed, message count:', (body as { messages?: unknown[] }).messages?.length)
  } catch (err) {
    console.error('[v0] failed to parse request body', err)
    return new Response('Bad Request', { status: 400 })
  }

  let messages: ChatMessage[]
  try {
    messages = await validateUIMessages<ChatMessage>({
      messages: (body as { messages: ChatMessage[] }).messages,
      tools,
    })
    console.log('[v0] messages validated, count:', messages.length)
  } catch (err) {
    console.error('[v0] validateUIMessages failed', err)
    return new Response('Bad Request', { status: 400 })
  }

  let modelMessages: Awaited<ReturnType<typeof convertToModelMessages>>
  try {
    modelMessages = await convertToModelMessages(messages)
    console.log('[v0] convertToModelMessages done, count:', modelMessages.length)
  } catch (err) {
    console.error('[v0] convertToModelMessages failed', err)
    return new Response('Internal Server Error', { status: 500 })
  }

  try {
    const result = streamText({
      model: 'openai/gpt-5.4',
      system: `You are a helpful road trip planning assistant for Routewise. Be concise and clear.

When you need the user to choose between options (pace, accommodation, dining, route type, activities), use the askMultipleChoice tool.`,
      messages: modelMessages,
      tools,
      stopWhen: stepCountIs(10),
      abortSignal: req.signal,
      onFinish: ({ usage, finishReason }) => {
        console.log('[v0] streamText finished, finishReason:', finishReason, 'usage:', usage)
      },
    })

    console.log('[v0] returning stream response')
    return result.toUIMessageStreamResponse()
  } catch (err) {
    console.error('[v0] streamText failed', err)
    return new Response('Internal Server Error', { status: 500 })
  }
}
