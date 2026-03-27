import {
  consumeStream,
  convertToModelMessages,
  streamText,
  tool,
  UIMessage,
} from 'ai'
import { z } from 'zod'

export const maxDuration = 30

// Tool definitions - note: no execute function means client-side execution
const tools = {
  askMultipleChoice: tool({
    description:
      'Ask the user a multiple choice question. Use this when you need the user to select from a set of options (e.g., trip preferences, route choices, accommodation type). The user will see clickable options and their selection will be returned.',
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
  }),
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: 'openai/gpt-5.4',
    system: `You are a helpful road trip planning assistant for Routewise. Be concise and clear in your responses.

When planning trips, use the askMultipleChoice tool to gather user preferences such as:
- Trip pace (relaxed vs packed itinerary)
- Accommodation preferences (hotels, camping, Airbnb)
- Dining preferences (fine dining, local spots, fast food)
- Activity interests (nature, cities, landmarks)
- Route preference (scenic vs fastest)

Always use the tool when you need the user to make a choice between options.`,
    messages: await convertToModelMessages(messages),
    tools,
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    consumeSseStream: consumeStream,
  })
}
