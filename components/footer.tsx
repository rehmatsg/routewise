import { MapPin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <MapPin className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold text-foreground">
            Routewise
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/proposal"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Proposal
          </Link>
          <a
            href="#features"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </a>
          <a
            href="#waitlist"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Waitlist
          </a>
        </div>
        <p className="text-xs text-muted-foreground">
          2026 Routewise. HCI Project.
        </p>
      </div>
    </footer>
  );
}
