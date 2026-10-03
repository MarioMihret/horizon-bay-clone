import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Check, Users } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  ContactCta,
  PageBand,
  PageHero,
  SectionIntro,
  SiteFooter,
  routeHead,
} from "@/components/site";
import { eventTypes, photos } from "@/lib/resort-content";

export const Route = createFileRoute("/events")({
  head: () =>
    routeHead(
      "Events",
      "Weddings, banquets, meetings, and private celebrations at Getva Hotel in Debre Birhan.",
    ),
  component: Events,
});

function Events() {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }
  return (
    <>
      <PageHero
        eyebrow="GATHER WELL"
        title={
          <>
            Make a moment of <em>it.</em>
          </>
        }
        description="From weddings and banquets to meetings, cocktail events, and private gatherings, find a welcoming place to bring people together."
        image={photos.lobby}
      />
      <PageBand>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <div>
            <SectionIntro
              eyebrow="MEETINGS & CELEBRATIONS"
              title="Bring people together."
              text="Getva’s published information describes flexible spaces and customized packages for social and corporate events. Ask about the current rooms, menus, and capacity."
            />
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Users size={19} className="text-accent" /> Flexible spaces for celebrations and
              corporate gatherings
            </div>
          </div>
          <img
            src={photos.lobby}
            alt="Illustrative hotel gathering space"
            width={1200}
            height={900}
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
      </PageBand>
      <PageBand muted>
        <SectionIntro eyebrow="WHAT BRINGS YOU HERE?" title="Every gathering has a story." />
        <div className="grid gap-4 md:grid-cols-3">
          {eventTypes.map((item, index) => (
            <article key={item.name} className="border-t border-border py-7">
              <span className="text-xs text-accent">0{index + 1}</span>
              <h3 className="mt-4 font-display text-3xl">{item.name}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.detail}</p>
            </article>
          ))}
        </div>
      </PageBand>
      <PageBand>
        <div className="mx-auto max-w-3xl border border-border bg-card p-6 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            START A CONVERSATION
          </p>
          <h2 className="mt-4 font-display text-5xl leading-none">Tell us what you’re planning.</h2>
          <form onSubmit={submit} className="mt-8 grid gap-5 sm:grid-cols-2">
            <label className="text-xs font-semibold uppercase tracking-[0.12em]">
              Your name
              <input
                required
                name="name"
                className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm font-normal normal-case outline-none focus:border-accent"
                placeholder="Full name"
              />
            </label>
            <label className="text-xs font-semibold uppercase tracking-[0.12em]">
              Email
              <input
                required
                type="email"
                name="email"
                className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm font-normal normal-case outline-none focus:border-accent"
                placeholder="you@example.com"
              />
            </label>
            <label className="text-xs font-semibold uppercase tracking-[0.12em]">
              Type of gathering
              <select
                name="type"
                className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm font-normal normal-case outline-none focus:border-accent"
              >
                <option>Celebration</option>
                <option>Private dinner</option>
                <option>Team gathering</option>
                <option>Wedding</option>
              </select>
            </label>
            <label className="text-xs font-semibold uppercase tracking-[0.12em]">
              Preferred date
              <input
                type="date"
                name="date"
                className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm font-normal normal-case outline-none focus:border-accent"
              />
            </label>
            <label className="text-xs font-semibold uppercase tracking-[0.12em] sm:col-span-2">
              A few details
              <textarea
                name="message"
                rows={4}
                className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm font-normal normal-case outline-none focus:border-accent"
                placeholder="Tell us a little about the moment"
              />
            </label>
            <Button type="submit" className="h-12 sm:col-span-2">
              Send an enquiry <ArrowUpRight />
            </Button>
          </form>
          {sent && (
            <p role="status" className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <Check size={16} className="text-accent" /> Thanks — your note is ready for the Getva
              events team.
            </p>
          )}
        </div>
      </PageBand>
      <ContactCta
        title="Let’s make room for it."
        text="We’ll help you ask about the right setting, package, and current availability."
      />
      <SiteFooter />
    </>
  );
}
