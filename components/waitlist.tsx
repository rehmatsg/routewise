"use client";

import React from "react"

import { useState } from "react";
import { Send, Check } from "lucide-react";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section id="waitlist" className="bg-secondary/50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Be first in line
          </p>
          <h2 className="font-display mt-3 text-balance text-3xl font-bold text-foreground md:text-5xl">
            Get early access
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Join the waitlist and be the first to experience AI-powered road
            trip planning. We will notify you when Routewise launches.
          </p>

          {submitted ? (
            <div className="mt-10 inline-flex items-center gap-3 rounded-2xl border border-primary/30 bg-primary/10 px-8 py-5">
              <Check className="h-6 w-6 text-primary" />
              <span className="text-lg font-medium text-foreground">
                {"You're on the list! We'll be in touch."}
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="waitlist-email" className="sr-only">
                Email address
              </label>
              <input
                id="waitlist-email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 flex-1 rounded-lg border border-border bg-card px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="submit"
                className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-6 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Send className="h-4 w-4" />
                Notify Me
              </button>
            </form>
          )}

          <p className="mt-4 text-xs text-muted-foreground">
            No spam, ever. We respect your inbox.
          </p>
        </div>
      </div>
    </section>
  );
}
