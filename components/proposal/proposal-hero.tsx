import { FileText, Users } from "lucide-react";

const teamMembers = [
  "Kirill Pavlov",
  "Simon Shu",
  "Jared Fong",
  "Pavnoor Singh Grewal",
  "Rehmat Gill",
];

export function ProposalHero() {
  return (
    <section className="border-b border-border bg-secondary/30 pt-28 pb-16">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
          <FileText className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            HCI Project Proposal
          </span>
        </div>

        <h1 className="font-display text-balance text-4xl font-bold text-foreground md:text-6xl">
          Routewise
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          AI-Powered Road Trip Planning for EV Drivers and Scenic Explorers
        </p>

        <div className="mt-8 flex items-start gap-3">
          <Users className="mt-0.5 h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-semibold text-foreground">Team Members</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {teamMembers.join(" / ")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
