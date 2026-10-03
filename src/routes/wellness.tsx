import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Leaf, Sun } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ContactCta,
  PageBand,
  PageHero,
  SectionIntro,
  SiteFooter,
  routeHead,
} from "@/components/site";
import { photos, wellnessOfferings } from "@/lib/resort-content";

export const Route = createFileRoute("/wellness")({
  head: () =>
    routeHead(
      "Wellness & recreation",
      "Massage, sauna, steam, jacuzzi, pool, and recreation options at Getva Hotel.",
    ),
  component: Wellness,
});

function Wellness() {
  const [active, setActive] = useState(0);
  return (
    <>
      <PageHero
        eyebrow="WELLNESS & RECREATION"
        title={
          <>
            Make space to <em>reset.</em>
          </>
        }
        description="From massage and heat facilities to pool time, billiards, and family recreation, Getva gives every guest a way to slow down."
        image={photos.spa}
      />
      <PageBand>
        <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <SectionIntro
            eyebrow="ROOM TO RESET"
            title="Choose your pace."
            text="The supplied hotel brief lists massage, sauna, steam, jacuzzi, swimming, billiards, a gaming house, and a children’s playground. Confirm current hours and availability before visiting."
          />
          <div className="relative">
            <img
              src={photos.spa}
              alt="Illustrative wellness room"
              width={1200}
              height={900}
              className="aspect-[4/3] w-full object-cover"
            />
            <span className="absolute -bottom-5 -left-5 flex size-24 items-center justify-center rounded-full bg-warm text-warm-foreground">
              <Leaf size={28} strokeWidth={1.2} />
            </span>
          </div>
        </div>
      </PageBand>
      <PageBand muted>
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              WAYS TO UNWIND
            </p>
            <h2 className="font-display text-[52px] leading-none sm:text-[70px]">
              Take your <em>time.</em>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-8 text-muted-foreground">
              Build a day around how you want to feel. Select an option to see what the hotel brief
              says is available, then confirm the details with the team.
            </p>
            <div className="mt-8 flex gap-3 text-accent">
              <Sun size={22} strokeWidth={1.2} />
              <span className="text-xs font-semibold uppercase tracking-[0.16em]">
                Confirm current operating hours with the hotel
              </span>
            </div>
          </div>
          <div>
            {wellnessOfferings.map((offering, index) => (
              <button
                key={offering.name}
                type="button"
                onClick={() => setActive(index)}
                className={`flex w-full items-start gap-5 border-t border-border py-6 text-left transition-colors ${active === index ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                <span className="font-display text-3xl text-accent">0{index + 1}</span>
                <span>
                  <span className="block font-display text-3xl">{offering.name}</span>
                  <span className="mt-2 block max-w-md text-sm leading-7">{offering.detail}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </PageBand>
      <ContactCta
        title="Make a little space."
        text="Ask the Getva team to shape a restorative day around your stay."
      />
      <SiteFooter />
    </>
  );
}
