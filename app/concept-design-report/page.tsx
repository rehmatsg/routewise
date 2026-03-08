import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  Lightbulb,
  Target,
  HelpCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Concept Design Report - Routewise",
  description:
    "Point of views, How Might We questions, and solutions from our concept design process for Routewise.",
};

export default function ConceptDesignReportPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="border-b border-border bg-secondary/30 pt-28 pb-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
            <Lightbulb className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Concept Design Report
            </span>
          </div>

          <h1 className="font-display text-balance text-4xl font-bold text-foreground md:text-6xl">
            Concept Design Report
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            POVs, How Might We questions, and solutions from our design process
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* POVs Section */}
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Point of Views (POVs)
        </p>

        {/* POV 1 */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            POV 1
          </h2>
          <div className="mt-4 space-y-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-pretty leading-relaxed text-foreground">
                We met Arric, a Tesla owner who frequently takes long road trips.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-pretty leading-relaxed text-foreground">
                We were surprised to notice how hard planning is.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-pretty leading-relaxed text-foreground">
                We wonder if this means he needs a way to feel confident and
                adaptable on his route without constantly managing fragmented
                backup plans.
              </p>
            </div>
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
              <p className="text-pretty leading-relaxed font-medium text-foreground">
                It would be game-changing to eliminate logistics fatigue.
              </p>
            </div>
            <div className="mt-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                HMW&apos;s
              </h3>
              <ul className="space-y-2">
                {[
                  "How might we reduce the cognitive load of juggling multiple apps when planning an EV road trip?",
                  "How might we help EV travelers feel confident that their charging plan won't collapse mid-trip?",
                  "How might we integrate charging stops, meals, and scenic breaks into one seamless planning experience?",
                  "How might we prevent \"spreadsheet fatigue\" before the trip even begins?",
                  "How might we help drivers quickly adapt when chargers are full or routes unexpectedly change?",
                  "How might we create a \"One-Tap Resilience\" feature that instantly recalculates the entire itinerary if a selected charger becomes unavailable?",
                  "How might we use predictive AI to suggest the \"Best Next Stop\" based on real-time vehicle telemetry and personal dining preferences before the battery reaches a critical level?",
                  "How might we automate the \"Sanity Check\" process by cross-referencing live charger uptime data with nearby restaurant hours and reviews?",
                  "How might we design a \"Glanceable Certainty\" interface that shows the entire day's energy and timing buffer in a single, simple visual?",
                  "How might we allow Arric to set \"Minimum Comfort Thresholds\" (e.g., never drop below 15% charge) that the AI silently enforces while he focuses on the drive?",
                ].map((hmw, i) => (
                  <li
                    key={i}
                    className="flex gap-3 rounded-lg border border-border bg-card/50 px-4 py-3 text-sm text-muted-foreground"
                  >
                    <span className="text-primary font-medium shrink-0">
                      {i + 1}.
                    </span>
                    {hmw}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* POV 2 */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            POV 2
          </h2>
          <div className="mt-4 space-y-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-pretty leading-relaxed text-foreground">
                We met an EV traveler who deeply values scenic routes.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-pretty leading-relaxed text-foreground">
                We were surprised to notice he surrenders to utilitarian
                highways because of range anxiety.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-pretty leading-relaxed text-foreground">
                We wonder if this means he feels forced to sacrifice the joy of
                the journey for charger certainty.
              </p>
            </div>
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
              <p className="text-pretty leading-relaxed font-medium text-foreground">
                It would be game-changing to make scenic routes feel as safe and
                reliable as major highways.
              </p>
            </div>
            <div className="mt-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                HMW&apos;s
              </h3>
              <ul className="space-y-2">
                {[
                  "How might we make scenic routes feel as safe and reliable as the fastest highway routes?",
                  "How might we reduce range anxiety so travelers don't feel forced to sacrifice experience for security?",
                  "How might we balance efficiency with enjoyment in EV route planning?",
                  "How might we empower EV drivers to confidently choose experiential routes over purely utilitarian ones?",
                  "How might we design route planning tools that prioritize both emotional value and technical constraints?",
                  "How might we provide a \"Visual Safety Score\" for scenic routes that combines real-time charger uptime with topographical battery drain data?",
                  "How might we implement a \"Scenic Return-to-Path\" guarantee that always maintains enough reserve power to reach a primary highway charger from any point on a detour?",
                  "How might we use AR-style dashboard overlays or voice cues to reassure the driver about their \"Projected Arrival Charge\" specifically during steep mountain climbs?",
                  "How might we reward travelers for choosing \"Low-Energy Scenic Routes\" (e.g., roads with optimal regenerative braking opportunities) to gamify efficient exploration?",
                  "How might we integrate \"Community Reliability Verifications\" so travelers can see recent, successful traverses of scenic routes by other drivers with the same vehicle model?",
                ].map((hmw, i) => (
                  <li
                    key={i}
                    className="flex gap-3 rounded-lg border border-border bg-card/50 px-4 py-3 text-sm text-muted-foreground"
                  >
                    <span className="text-primary font-medium shrink-0">
                      {i + 1}.
                    </span>
                    {hmw}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* POV 3 */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            POV 3
          </h2>
          <div className="mt-4 space-y-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-pretty leading-relaxed text-foreground">
                We met Ariana who is a tech-savvy traveler overwhelmed by
                trip-planning information overload.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-pretty leading-relaxed text-foreground">
                We were surprised to notice existing tools still lead to wasted
                charging stops in random parking lots.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-pretty leading-relaxed text-foreground">
                We wonder if this means they need intelligent curation that
                aligns route logistics with their desired travel &ldquo;vibe.&rdquo;
              </p>
            </div>
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
              <p className="text-pretty leading-relaxed font-medium text-foreground">
                It would be game-changing to generate an experience-aware route
                from a single prompt about their destination and vibe.
              </p>
            </div>
            <div className="mt-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                HMW&apos;s
              </h3>
              <ul className="space-y-2">
                {[
                  "How might we curate high-quality dining and points of interest near charging stops?",
                  "How might we reduce information overload while still offering personalized options?",
                  "How might we allow travelers to plan around a desired \"vibe\" rather than just a destination?",
                  "How might we ensure charging stops happen in meaningful, enjoyable locations instead of random parking lots?",
                  "How might we transform trip planning from a stressful management task into an inspiring experience?",
                  "How might we leverage vehicle telemetry data to proactively suggest scenic detours when battery levels allow for a high \"exploration margin\"?",
                  "How might we turn \"charging time\" into \"immersion time\" by surfacing local cultural or wellness activities that fit the specific 20–40 minute charging window?",
                  "How might we create a \"collaborative vibe\" interface that synchronizes the conflicting travel mindsets of a data-driven driver and a spontaneous passenger?",
                  "How might we use generative AI to distill \"information overload\" into a single, cohesive narrative that explains why a specific route matches the user's chosen vibe?",
                  "How might we implement \"dynamic resilience\" that automatically recalibrates both the logistics and the \"vibe\" if a primary charger goes offline or a road is closed?",
                ].map((hmw, i) => (
                  <li
                    key={i}
                    className="flex gap-3 rounded-lg border border-border bg-card/50 px-4 py-3 text-sm text-muted-foreground"
                  >
                    <span className="text-primary font-medium shrink-0">
                      {i + 1}.
                    </span>
                    {hmw}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* HMW Solutions */}
        <p className="mt-16 text-sm font-semibold uppercase tracking-wider text-primary">
          HMW Solutions
        </p>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-primary" />
            Selected HMWs & Solutions
          </h2>

          {/* HMW 1: Vibe */}
          <div className="mt-8 rounded-xl border border-border bg-card overflow-hidden">
            <div className="border-b border-border bg-secondary/30 px-5 py-4">
              <p className="font-display font-semibold text-foreground">
                HMW: How might we allow travelers to plan around a desired
                &ldquo;vibe&rdquo; rather than just a destination?
              </p>
            </div>
            <ul className="divide-y divide-border">
              {[
                "We could implement a \"Vibe-to-Route\" Slider that lets users prioritize \"Winding Mountain Passes\" versus \"Coastal Cruising,\" automatically adjusting the path based on topographical and scenic data rather than just the fastest ETA.",
                "We could create \"Cinematic Presets\" (e.g., Moody Pacific Northwest, Desert Solitaire, or Retro Americana) that filter dining and lodging recommendations to match a specific aesthetic.",
                "We could integrate an AI-powered \"Vibe Check\" for charging stops, prioritizing Superchargers located near local artisan coffee shops or nature trails instead of standard highway strip malls.",
                "We could develop a \"Scenic Resilience\" Buffer, where the AI calculates a 20% battery \"exploration margin,\" allowing the user to take spontaneous turnoffs without re-calculating his entire day.",
                "We could build a \"Hidden Gem\" Density Filter that allows travelers to choose how \"off the beaten path\" they want their stops to be, ranging from Tourist Classics to Local Secrets Only.",
                "We could create a \"Digital Co-Pilot\" Voice Mode that describes the history or geology of the passing landscape in a tone that matches the chosen trip vibe (e.g., a \"Chill Narrator\" for slow travel).",
                "We could allow for \"Activity-First\" Planning, where a user selects a vibe like \"High-Altitude Hiking\" and the app builds a loop that connects the best trails with reliable charging.",
                "We could offer \"Vibe-Matched\" Accommodation Sync, which prioritizes boutique Airstreams, cabins, or tech-forward hotels over standard roadside chains to maintain the trip's atmosphere.",
              ].map((solution, i) => (
                <li
                  key={i}
                  className="px-5 py-3 text-sm text-muted-foreground"
                >
                  {solution}
                </li>
              ))}
            </ul>
          </div>

          {/* HMW 2: Scenic routes safe */}
          <div className="mt-8 rounded-xl border border-border bg-card overflow-hidden">
            <div className="border-b border-border bg-secondary/30 px-5 py-4">
              <p className="font-display font-semibold text-foreground">
                HMW: How might we make scenic routes feel as safe and reliable as
                the fastest highway routes?
              </p>
            </div>
            <ul className="divide-y divide-border">
              {[
                "We could show a real-time safety score for each scenic route based on weather, road conditions, lighting, and accident history.",
                "We could highlight \"safe scenic routes\" that are pre-vetted for road quality, cell coverage, and emergency access.",
                "We could add live alerts for hazards like fog, sharp turns, wildlife crossings, closures, or poor visibility.",
                "We could let users choose a scenic route mode that prioritizes beauty without sacrificing safety thresholds.",
                "We could show clear route confidence indicators, like estimated delay, road reliability, and driver reviews.",
                "We could include community reports from recent drivers about safety, traffic, and road comfort.",
                "We could recommend scenic routes only during safer times of day, such as daylight or low-traffic periods.",
                "We could build in emergency support features, like nearby gas, rest stops, hospitals, and one-tap roadside help.",
                "We could offer \"guided scenic navigation\" with extra voice cues before curves, narrow roads, or complicated turns.",
                "We could reward users for taking trusted scenic routes by saving favorite routes and learning which ones feel safest.",
              ].map((solution, i) => (
                <li
                  key={i}
                  className="px-5 py-3 text-sm text-muted-foreground"
                >
                  {solution}
                </li>
              ))}
            </ul>
          </div>

          {/* HMW 3: Charging plan confidence */}
          <div className="mt-8 rounded-xl border border-border bg-card overflow-hidden">
            <div className="border-b border-border bg-secondary/30 px-5 py-4">
              <p className="font-display font-semibold text-foreground">
                HMW: How might we help EV travelers feel confident that their
                charging plan won&apos;t collapse mid-trip?
              </p>
            </div>
            <ul className="divide-y divide-border">
              {[
                "We could show a plan \"resilience score\" that rates how likely the trip is to succeed (based on backups, buffer, charger reliability).",
                "We could auto-build a backup charging route (Plan B + Plan C) and keep it one tap away.",
                "We could use live charger status (available/occupied/out-of-order) and auto-reroute the moment risk spikes.",
                "We could recommend a safety buffer policy (ex: arrive with 15–20% battery) and warn when the plan violates it.",
                "We could let users \"lock in\" key stops with reservations / virtual queueing where supported (or suggest stations that support it).",
                "We could provide arrival-time forecasts for each station (wait time + odds of getting a plug) so users feel less blindsided.",
                "We could simulate \"what if\" scenarios (wind/cold/traffic/charger outage) and show how the plan changes before they leave.",
                "We could add a panic button mode that instantly finds the safest reachable chargers and guides the driver step-by-step.",
                "We could give clear, calm alerts early (\"Your next stop is trending busy—switching to a safer station adds +6 min\").",
                "We could crowdsource real-time reliability notes (recent successful charges, broken plugs, payment issues) and surface them as a \"confidence badge\" for each station.",
              ].map((solution, i) => (
                <li
                  key={i}
                  className="px-5 py-3 text-sm text-muted-foreground"
                >
                  {solution}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Top 3 Solutions */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-primary" />
            Top 3 Solutions
          </h2>
          <ul className="mt-4 space-y-4">
            <li className="flex gap-4 rounded-xl border-2 border-primary/30 bg-primary/5 p-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                1
              </span>
              <p className="text-pretty font-medium text-foreground">
                We could add live alerts for hazards like fog, sharp turns,
                wildlife crossings, closures, or poor visibility.
              </p>
            </li>
            <li className="flex gap-4 rounded-xl border-2 border-primary/30 bg-primary/5 p-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                2
              </span>
              <p className="text-pretty font-medium text-foreground">
                We could provide arrival-time forecasts for each station (wait
                time + odds of getting a plug) so users feel less blindsided.
              </p>
            </li>
            <li className="flex gap-4 rounded-xl border-2 border-primary/30 bg-primary/5 p-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                3
              </span>
              <p className="text-pretty font-medium text-foreground">
                We could show a real-time safety score for each scenic route
                based on weather, road conditions, lighting, and accident
                history.
              </p>
            </li>
          </ul>
        </section>

        {/* AI Disclosure */}
        <section className="mt-16 rounded-xl border border-border bg-secondary/40 p-6">
          <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Disclosure
          </h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              For assistance, organization, and polishing of this document we
              used Gemini AI and a little bit of ChatGPT. We used generative AI
              to assist us in developing HMW&apos;s for the POV&apos;s we had.
              Because this was a brainstorming session and we wanted to move
              quick, generative AI helped us generate realistic and useful
              ideas.
            </p>
            <p>
              We generated HMW&apos;s and 10–15 possible solutions for three
              selected HMW&apos;s. We then reviewed, filtered, and refined those
              ideas ourselves based on feasibility, relevance to our POVs, and
              the goals of the project.
            </p>
            <p>
              Generative AI was used as a support tool to speed up brainstorming
              and expand the range of ideas we considered. Final decisions about
              which HMW&apos;s and solutions to keep were made by our team.
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
