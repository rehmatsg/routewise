import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  ClipboardList,
  Users,
  MessageCircle,
  FileBarChart,
  Mic2,
  Quote,
} from "lucide-react";

export const metadata: Metadata = {
  title: "User Research & Analysis - Routewise",
  description:
    "User research report: goals, methods, interview plan, survey design, and interview transcript with Arric (Tesla Model 3 owner).",
};

const teamMembers = [
  "Kirill Pavlov",
  "Simon Shu",
  "Jared Fong",
  "Pavnoor Singh Grewal",
  "Rehmat Gill",
];

export default function UserResearchPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="border-b border-border bg-secondary/30 pt-28 pb-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
            <ClipboardList className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              User Research & Analysis Report
            </span>
          </div>

          <h1 className="font-display text-balance text-4xl font-bold text-foreground md:text-6xl">
            Routewise
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            Research goals, methods, and findings from interviews and surveys
          </p>

          <div className="mt-8 flex items-start gap-3">
            <Users className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                Team Members
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {teamMembers.join(", ")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Part 1: Conducting User Research (Data Collection)
        </p>

        {/* User Research Goals */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-primary" />
            User Research Goals
          </h2>
          <div className="mt-4 rounded-xl border border-border bg-card p-6">
            <p className="text-pretty leading-relaxed text-muted-foreground">
              Our primary goal is to understand the specific user needs,
              emotions, and pain points associated with planning and executing
              road trips. Specifically, we want to investigate the real-world
              impact of &ldquo;logistics fatigue&rdquo; and how users manage the
              high cognitive load of coordinating multiple apps.
            </p>
          </div>
        </section>

        {/* Target Users */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            Target Users & Key Insights Sought
          </h2>
          <ul className="mt-4 space-y-3">
            <li className="flex gap-3 rounded-xl border border-border bg-card p-4">
              <span className="font-semibold text-foreground shrink-0">
                Tech-Savvy Travelers:
              </span>
              <span className="text-muted-foreground">
                We want to understand how they currently navigate the
                &ldquo;information overload&rdquo; of review sites to find
                curated, high-quality experiences over generic tourist traps.
              </span>
            </li>
            <li className="flex gap-3 rounded-xl border border-border bg-card p-4">
              <span className="font-semibold text-foreground shrink-0">
                EV Road Trippers:
              </span>
              <span className="text-muted-foreground">
                We want to learn how these users manage &ldquo;range
                anxiety&rdquo; and balance the technical necessity of charging
                infrastructure with the desire for scenic routes and good
                dining.
              </span>
            </li>
          </ul>
        </section>

        {/* Interview Plan */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-primary" />
            Interview Plan
          </h2>
          <div className="mt-4 space-y-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-display font-semibold text-foreground">
                WHO
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                We selected a diverse pool of participants to capture unique
                insights. Our extreme user is Arric, a Tesla Model 3 owner who
                frequently takes long road trips. He represents an extreme case
                because his travel routing is entirely dictated by the rigid
                constraint of EV charging infrastructure, which severely
                amplifies planning friction. We have limited the inclusion of
                close family or friends and included no more than one SFSU
                student.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-display font-semibold text-foreground">
                WHERE
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Interviews were conducted in-person to observe natural
                behaviors, such as how users currently interact with their
                phones and mapping apps to plan routes.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-display font-semibold text-foreground">
                WHEN
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Interviews were scheduled in advance, allowing for 40–60 minute
                blocks to respect participants&apos; time.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-display font-semibold text-foreground">
                SCRIPT
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                We utilized a semi-structured script focusing on emotions and
                pain points, relying heavily on &ldquo;why&rdquo; questions to
                dive deeper into user motivations (example — &ldquo;Why do you
                prefer this route over the fastest one?&rdquo;).
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-display font-semibold text-foreground">
                APPARATUS
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                We had a designated note-taker present.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-display font-semibold text-foreground">
                ETHICS & BIASES
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Participants were informed about how their data would be used
                and signed a consent form before the interview began. We
                consciously avoided leading questions to prevent bias and
                ensured two team members were present for each session (one
                leading, one observing/taking notes).
              </p>
            </div>
          </div>
        </section>

        {/* Survey Plan */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <FileBarChart className="h-6 w-6 text-primary" />
            Survey Plan
          </h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground">
              <strong className="text-foreground">Purpose:</strong> To gather
              quantitative data that validates the qualitative experiences and
              pain points shared during our interviews.
            </p>
            <p className="text-muted-foreground">
              <strong className="text-foreground">Design & Introduction:</strong>{" "}
              The survey includes a brief introduction explaining its purpose
              (understanding road trip planning habits) and guarantees anonymity
              for how the data will be used.
            </p>
            <p className="text-muted-foreground">
              <strong className="text-foreground">Question Types:</strong> We
              used a mix of question formats:
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
              <li>
                <strong className="text-foreground">Likert Scale:</strong> &ldquo;On
                a scale of 1–5, how stressful is it to coordinate EV charging
                with meal breaks?&rdquo;
              </li>
              <li>
                <strong className="text-foreground">Multiple Choice:</strong>{" "}
                &ldquo;Which tools do you currently use? (Google Maps, Yelp,
                Spreadsheets, etc.)&rdquo;
              </li>
              <li>
                <strong className="text-foreground">Open-Ended:</strong> &ldquo;Describe
                your biggest frustration when a planned route goes wrong.&rdquo;
              </li>
            </ul>
            <p className="text-muted-foreground">
              <strong className="text-foreground">Implementation:</strong>{" "}
              Distributed via Google Forms to aim for a minimum of 10 responses.
            </p>
          </div>
        </section>

        {/* Conducting Interviews and Surveys */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <Mic2 className="h-6 w-6 text-primary" />
            Conducting Interviews and Surveys
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-display font-semibold text-foreground">
                Interviews
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                We conducted a minimum of 3 in-depth interviews, lasting
                between 40–60 minutes each, with signed consent forms
                collected prior to starting.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-display font-semibold text-foreground">
                Surveys
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                We successfully gathered over 10 anonymous responses via our
                Google Form distribution.
              </p>
            </div>
          </div>
        </section>

        {/* Research Data: Interview Transcript */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <Quote className="h-6 w-6 text-primary" />
            Research Data: Interview Transcript Excerpt
          </h2>
          <div className="mt-4 rounded-xl border border-border bg-secondary/40 p-5 md:p-6">
            <p className="text-sm text-muted-foreground mb-6">
              <strong className="text-foreground">Interviewees:</strong> Pavnoor
              Singh Grewal & Rehmat Gill &nbsp;|&nbsp;{" "}
              <strong className="text-foreground">Participant:</strong> Arric
              (Tesla Model 3 Owner — Extreme User) &nbsp;|&nbsp;{" "}
              <strong className="text-foreground">Duration:</strong> 45 minutes
            </p>

            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                  Pavnoor
                </p>
                <p className="text-foreground">
                  Hey Arric, thanks for taking the time to chat with Rehmat and
                  me today. Since you own a Tesla Model 3 and take it on long
                  drives, you are the exact type of user we are trying to learn
                  from for our project. To start off, how do you currently go
                  about planning a long road trip?
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                  Arric
                </p>
                <p className="text-foreground">
                  Honestly, it&apos;s a bit of a headache. Planning a road trip
                  currently requires hours of tedious manual research to line up
                  variables like scenic routes, EV charging, and good dining and
                  overnight stays. I usually have to juggle five or more apps
                  just to figure it out. I&apos;ll use Google Maps to get a sense
                  of the route, the Tesla app or PlugShare to find the chargers,
                  and then I have to cross-reference with Yelp or Google to see
                  if there is actually anything good to eat near the charger.
                  Then I merge everything into a spreadsheet.
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                  Rehmat
                </p>
                <p className="text-foreground">
                  That sounds like a lot of work. How does that process make you
                  feel before the trip even begins?
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                  Arric
                </p>
                <p className="text-foreground">
                  It&apos;s exhausting. Syncing charging stops with meal breaks
                  and scenic windows creates spreadsheet fatigue before the trip
                  even starts. It honestly turns vacation planning into a
                  stressful management task.
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                  Pavnoor
                </p>
                <p className="text-foreground">
                  We&apos;ve been calling that &ldquo;logistics fatigue.&rdquo;
                  Can you tell us about a time when all that manual planning
                  didn&apos;t go according to plan on the road?
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                  Arric
                </p>
                <p className="text-foreground">
                  Yeah, definitely. On a trip last summer, I had my whole route
                  planned out. But when I pulled up, the charging station was
                  completely full. If a charging station is full or a road is
                  closed, manual plans collapse. I had to scramble on my phone
                  while sitting in the parking lot to find another charger
                  within my remaining battery range. You end up having to rely on
                  trial-and-error during the drive, which is incredibly
                  stressful.
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                  Rehmat
                </p>
                <p className="text-foreground">
                  When you are driving, do you usually prefer taking the fastest
                  route, or do you prefer taking scenic detours?
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                  Arric
                </p>
                <p className="text-foreground">
                  I&apos;d love to take the scenic routes, like coastal highways
                  or mountain passes, where the journey is the destination. But
                  the problem is that the Tesla Trip Planner is highly
                  utilitarian and prioritizes the fastest route over scenic
                  value. It also completely fails to curate high-quality dining
                  or points of interest. Because of range anxiety, I usually
                  just surrender and take the boring highway route because I
                  know the chargers are there.
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                  Pavnoor
                </p>
                <p className="text-foreground">
                  What if an AI could plan the trip for you based on a single
                  prompt? What features would be absolute dealbreakers for you?
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                  Arric
                </p>
                <p className="text-foreground">
                  If I could just type in where I want to go and what kind of
                  vibe I want, that would be amazing. I would need one
                  intelligent platform that combines scenic route planning, EV
                  charging integration, and curated dining all in one place. The
                  biggest thing for me would be mapping chargers near scenic
                  overlooks or walkable towns so I never waste a stop sitting in
                  a random parking lot.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Affinity Diagram & Themes - wider layout for larger images */}
      <div className="mx-auto max-w-6xl px-6 pb-16">
        <section className="pt-4">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Affinity Diagram & Themes
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Findings from our research, grouped into themes.
          </p>
          <div className="mt-6 flex flex-col gap-10">
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <img
                src="/images/EmpathyMap/Affinity1.png"
                alt="Affinity diagram - research findings"
                className="w-full object-contain"
              />
              <p className="p-3 text-center text-sm font-medium text-muted-foreground border-t border-border">
                Affinity Diagram
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <img
                src="/images/EmpathyMap/Themes.png"
                alt="Themes from user research"
                className="w-full object-contain"
              />
              <p className="p-3 text-center text-sm font-medium text-muted-foreground border-t border-border">
                Themes
              </p>
            </div>
          </div>
        </section>

        {/* Empathy & Experience Map */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Empathy & Experience Map
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Visualizing user emotions and the road trip planning experience.
          </p>
          <div className="mt-6 flex flex-col gap-10">
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <img
                src="/images/EmpathyMap/EmpathyMap.png"
                alt="Empathy map - user perspective"
                className="w-full object-contain"
              />
              <p className="p-3 text-center text-sm font-medium text-muted-foreground border-t border-border">
                Empathy Map
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <img
                src="/images/EmpathyMap/ExperienceMap.png"
                alt="Experience map - journey and touchpoints"
                className="w-full object-contain"
              />
              <p className="p-3 text-center text-sm font-medium text-muted-foreground border-t border-border">
                Experience Map
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
