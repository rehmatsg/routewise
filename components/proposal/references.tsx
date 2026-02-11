import { BookOpen } from "lucide-react";

const references = [
  {
    title: "2026 Travel Industry Outlook",
    authors: "Deloitte Insights (2026)",
    description:
      "Reports that Gen Z and Millennials now dominate travel demand and increasingly use Generative AI to move from inspiration to itinerary instantly.",
  },
  {
    title: "Driving Vacation Global Market Report",
    authors: "The Business Research Company (2026)",
    description:
      "Estimates the driving vacation market will reach $213.82 billion in 2026, driven specifically by the increasing adoption of electric vehicles and smart navigation platforms.",
  },
  {
    title: "EV Infrastructure Forecast",
    authors: "S&P Global Mobility (2025)",
    description:
      "Highlights that while charging networks are growing, the ratio of vehicles to chargers is tightening, making intelligent, predictive route planning essential for EV owners to avoid delays.",
  },
];

export function References() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="flex items-center gap-3">
          <BookOpen className="h-5 w-5 text-primary" />
          <h2 className="font-display text-2xl font-bold text-foreground">
            References
          </h2>
        </div>

        <div className="mt-8 flex flex-col gap-6">
          {references.map((ref, index) => (
            <div
              key={ref.title}
              className="flex gap-4 rounded-xl border border-border bg-card p-6"
            >
              <span className="font-display text-2xl font-bold text-border">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-display font-bold text-card-foreground">
                  {ref.title}
                </p>
                <p className="mt-1 text-sm font-medium text-primary">
                  {ref.authors}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {ref.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
