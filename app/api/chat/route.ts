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

export const maxDuration = 60

// ─── Tool Definitions ────────────────────────────────────────────────────────

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

const showRouteStopsTool = tool({
  description:
    'Display a list of specific stops along the route as visual cards. Use this to suggest individual places like restaurants, coffee shops, gas stations, scenic viewpoints, attractions, or any specific place of interest along the route. Each stop shows an icon, name, location, and optional description.',
  inputSchema: z.object({
    stops: z.array(
      z.object({
        name: z.string().describe('Name of the stop (e.g. "Blue Bottle Coffee", "In-N-Out Burger")'),
        location: z.string().describe('City or address of the stop (e.g. "Santa Barbara, CA")'),
        category: z
          .enum(['food', 'coffee', 'fuel', 'attraction', 'lodging', 'shopping', 'scenic', 'entertainment', 'default'])
          .describe('Category for the stop icon'),
        description: z.string().nullable().describe('Optional short description of why this stop is recommended'),
      })
    ).min(1).max(8),
  }),
})

const showRouteSummaryTool = tool({
  description:
    'Display a full route summary as a visual timeline. Use this when the user has finalized or is close to finalizing their trip plan, or whenever you have enough info to show the full journey. Shows origin, destination, intermediate stops, total distance, duration, and ETA.',
  inputSchema: z.object({
    origin: z.string().describe('Starting location (e.g. "San Francisco, CA")'),
    destination: z.string().describe('End destination (e.g. "Los Angeles, CA")'),
    stops: z.array(
      z.object({
        name: z.string().describe('Name of the stop'),
        location: z.string().describe('City or address'),
        category: z
          .enum(['food', 'coffee', 'fuel', 'attraction', 'lodging', 'shopping', 'scenic', 'entertainment', 'default'])
          .nullable(),
        durationFromPrev: z.string().nullable().describe('Drive time from the previous stop (e.g. "1h 20min")'),
      })
    ).describe('Intermediate stops in order'),
    totalDistance: z.string().nullable().describe('Total distance (e.g. "381 miles")'),
    totalDuration: z.string().nullable().describe('Total drive time (e.g. "5h 45min")'),
    approximateEta: z.string().nullable().describe('Estimated arrival time (e.g. "3:30 PM")'),
  }),
})

const showSuggestedStopsTool = tool({
  description:
    'Show selectable chip suggestions for types of stops or specific places. Use this early in the conversation to let users quickly pick what kinds of stops they want (e.g. coffee shops, viewpoints, local diners) or suggest a curated set of specific stops for them to choose from. Supports multi-select.',
  inputSchema: z.object({
    title: z.string().describe('Label above the chips (e.g. "What kind of stops do you want?")'),
    chips: z.array(
      z.object({
        id: z.string().describe('Unique identifier'),
        label: z.string().describe('Chip display text'),
        sublabel: z.string().nullable().describe('Optional extra info shown on the chip'),
        category: z
          .enum(['food', 'coffee', 'fuel', 'attraction', 'lodging', 'shopping', 'scenic', 'entertainment', 'default'])
          .nullable(),
      })
    ).min(2).max(10),
    multiSelect: z.boolean().describe('Whether the user can select multiple chips'),
  }),
  outputSchema: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
    })
  ).describe('The chips selected by the user'),
})

const showChargingStationsTool = tool({
  description:
    'Display EV charging stations along the route. Use this when the user mentions they are driving an electric vehicle, asks about charging, or when planning a long-distance EV trip.',
  inputSchema: z.object({
    title: z.string().nullable().describe('Optional section title'),
    stations: z.array(
      z.object({
        name: z.string().describe('Station name (e.g. "Tesla Supercharger - Santa Barbara")'),
        location: z.string().describe('Address or city'),
        network: z.string().nullable().describe('Charging network (e.g. "Tesla", "Electrify America", "ChargePoint")'),
        ports: z.number().int().nullable().describe('Number of charging ports'),
        maxKw: z.number().nullable().describe('Maximum charging speed in kW'),
        distanceFromRoute: z.string().nullable().describe('How far off the main route (e.g. "0.3 mi off route")'),
        estimatedChargingTime: z.string().nullable().describe('Estimated time to charge (e.g. "20-30 min")'),
        amenitiesNearby: z.array(z.string()).nullable().describe('Nearby amenities (e.g. ["Starbucks", "Whole Foods"])'),
      })
    ).min(1).max(6),
  }),
})

const showRouteOptionsTool = tool({
  description:
    'Present the user with selectable route alternatives to choose between. Use this when multiple viable route options exist (e.g. highway vs scenic road, I-5 vs US-101, PCH vs inland), and the user should pick one before you finalize the plan.',
  inputSchema: z.object({
    question: z.string().describe('The prompt asking the user to choose (e.g. "Which route would you prefer?")'),
    options: z.array(
      z.object({
        id: z.string().describe('Unique identifier for the route option'),
        name: z.string().describe('Route name (e.g. "Pacific Coast Highway", "I-5 Express")'),
        description: z.string().nullable().describe('Brief description of the route and what makes it unique'),
        distance: z.string().nullable().describe('Total distance (e.g. "420 miles")'),
        duration: z.string().nullable().describe('Estimated drive time (e.g. "7h 30min")'),
        highlights: z.array(z.string()).nullable().describe('Key highlights along the route'),
        tags: z.array(z.enum(['scenic', 'fast', 'eco', 'popular'])).nullable().describe('Tags that describe the route'),
      })
    ).min(2).max(4),
  }),
  outputSchema: z.object({
    selectedId: z.string(),
    selectedName: z.string(),
  }),
})

// ─────────────────────────────────────────────────────────────────────────────

const tools = {
  askMultipleChoice: askMultipleChoiceTool,
  showRouteStops: showRouteStopsTool,
  showRouteSummary: showRouteSummaryTool,
  showSuggestedStops: showSuggestedStopsTool,
  showChargingStations: showChargingStationsTool,
  showRouteOptions: showRouteOptionsTool,
} as const

export type ChatMessage = UIMessage<never, UIDataTypes, InferUITools<typeof tools>>

const SYSTEM_PROMPT = `You are Routewise, a friendly and knowledgeable AI road trip planning assistant. Help users plan amazing road trips with personalized stop suggestions, scenic routes, and practical tips.

## Conversation Approach
- Be conversational, warm, and enthusiastic about road trips.
- Ask clarifying questions one at a time — don't overwhelm the user.
- Once you have enough info (origin, destination, rough preferences), start planning and show visual components.
- Always confirm the plan before showing a full Route Summary.

## Tool Usage Guidelines

### askMultipleChoice
Use this to collect structured preferences: trip pace (relaxed/moderate/fast), accommodation type, dining style, activity interests, vehicle type. Limit to one question at a time.

### showSuggestedStops
Use early in the conversation to let users pick categories of stops they want (e.g. coffee, scenic overlooks, local diners, national parks). Also use to suggest a curated shortlist of specific places when you have a route in mind. Great as a quick-pick UI before diving deeper.

### showRouteOptions
Use when there are 2+ viable route alternatives for the trip (e.g. coastal vs. inland, PCH vs. I-5). Always offer route options before finalizing the plan so the user can choose. Include distance, time, highlights, and tags.

### showRouteStops
Use to display a curated list of specific recommended stops (restaurants, coffee shops, viewpoints, gas stations, etc.) once the route is established. Show 2–6 stops at a time. You can call this multiple times for different categories.

### showChargingStations
Use whenever the user mentions driving an EV, asks about charging, or when planning a long trip (>150 miles) and the user has indicated or might have an EV. Show 2–4 stations strategically placed along the route.

### showRouteSummary
Use to display the full trip plan with a timeline view (origin → stops → destination). Call this once you have: origin, destination, chosen route, and key stops confirmed. This is the "final plan" view. You can show an updated summary anytime the plan changes.

## General Tips
- Suggest EV charging stations proactively for long trips if the user has an EV.
- Always mention drive times between stops so the user can plan rest breaks.
- Be specific with stop recommendations — real place names and locations are better than generic suggestions.
- After showing route options or suggested stops, wait for user input before proceeding.
`

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return new Response('Bad Request', { status: 400 })
  }

  let messages: ChatMessage[]
  try {
    messages = await validateUIMessages<ChatMessage>({
      messages: (body as { messages: ChatMessage[] }).messages,
      tools,
    })
  } catch {
    return new Response('Bad Request', { status: 400 })
  }

  let modelMessages: Awaited<ReturnType<typeof convertToModelMessages>>
  try {
    modelMessages = await convertToModelMessages(messages)
  } catch {
    return new Response('Internal Server Error', { status: 500 })
  }

  try {
    const result = streamText({
      model: 'openai/gpt-5.4-mini',
      system: SYSTEM_PROMPT,
      messages: modelMessages,
      tools,
      stopWhen: stepCountIs(15),
      abortSignal: req.signal,
    })

    return result.toUIMessageStreamResponse()
  } catch {
    return new Response('Internal Server Error', { status: 500 })
  }
}
