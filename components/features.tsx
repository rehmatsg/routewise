import Image from "next/image";
import { Route, Zap, Utensils, Brain } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Itineraries",
    description:
      "One prompt. Full trip. Our AI generates an executable road trip plan tailored to your preferences, from scenic detours to hidden-gem restaurants.",
    image: "/images/ai-planning.jpg",
    imageAlt: "Tablet showing a travel route planning app interface on a cafe table",
  },
  {
    icon: Zap,
    title: "Smart EV Charging",
    description:
      "Turn charging time into experience time. Routewise maps chargers near scenic overlooks, great food, and walkable towns so you never waste a stop.",
    image: "/images/ev-charging.jpg",
    imageAlt: "Electric vehicle at a charging station with scenic mountain backdrop",
  },
  {
    icon: Route,
    title: "Scenic Route Priority",
    description:
      "Forget fastest - take the most beautiful. We surface coastal highways, mountain passes, and countryside backroads that make the journey the destination.",
    image: "/images/scenic-route.jpg",
    imageAlt: "Winding coastal highway with turquoise ocean and green cliffs",
  },
];

const extras = [
  {
    icon: Utensils,
    title: "Curated Dining",
    description:
      "Skip the noise of review sites. We surface top-rated local spots that match your taste and timing.",
  },
  {
    icon: Route,
    title: "Dynamic Re-routing",
    description:
      "Closed road? Full charger? Routewise adapts your itinerary in real-time so your plan never collapses.",
  },
  {
    icon: Zap,
    title: "Range-Aware Planning",
    description:
      "Battery pre-conditioning, accurate range estimation, and charger availability - all baked into your route.",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-background py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            What we are building
          </p>
          <h2 className="font-display mt-3 text-balance text-3xl font-bold text-foreground md:text-5xl">
            Road trips, reimagined
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            Routewise replaces hours of manual planning with a single
            intelligent conversation. Here is how.
          </p>
        </div>

        <div className="mt-20 flex flex-col gap-20">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`flex flex-col items-center gap-10 lg:flex-row ${
                index % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
              <div className="relative flex-1 overflow-hidden rounded-2xl">
                <Image
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.imageAlt}
                  width={600}
                  height={400}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 grid gap-8 md:grid-cols-3">
          {extras.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-card p-8"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold text-card-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
