import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { useState } from "react";
import {
  ContactCta,
  ImageCard,
  PageBand,
  PageHero,
  SectionIntro,
  SiteFooter,
  routeHead,
} from "@/components/site";
import { photos } from "@/lib/resort-content";

export const Route = createFileRoute("/explore")({
  head: () =>
    routeHead(
      "Explore",
      "Explore Debre Birhan, the Amhara highlands, nearby historic places, and the landscapes beyond the city.",
    ),
  component: Explore,
});

const itineraries = [
  {
    day: "01",
    title: "Arrive gently",
    text: "Settle in, take a first look around the city, and let the highland evening be your only appointment.",
    steps: [
      "Check in and ask for local tips",
      "A slow walk through Debre Birhan",
      "Dinner back at the hotel",
    ],
  },
  {
    day: "02",
    title: "Find your rhythm",
    text: "Start with a relaxed breakfast, explore nearby highland places, and leave space for the unexpected.",
    steps: ["Sleep in or start early", "Explore the highlands", "A massage or pool break"],
  },
  {
    day: "03",
    title: "Take it with you",
    text: "One last breakfast, one last look around the city, and a promise to come back.",
    steps: ["Coffee before you leave", "A final hotel reset", "Take the highland road home"],
  },
];

function Explore() {
  const [active, setActive] = useState(0);
  const itinerary = itineraries[active];
  return (
    <>
      <PageHero
        eyebrow="EXPLORE DEBRE BIRHAN"
        title={
          <>
            Go where the highlands <em>take you.</em>
          </>
        }
        description="Use Getva as a base for Debre Birhan, the Amhara highlands, nearby historic places, and the landscapes beyond the city."
        image={photos.pool}
      />
      <PageBand>
        <SectionIntro
          eyebrow="A GENTLE ITINERARY"
          title="Three days, no rush."
          text="There’s no single right way to explore Debre Birhan. Use this as a starting point, then follow whatever catches your attention."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {itineraries.map((item, index) => (
            <button
              type="button"
              key={item.day}
              onClick={() => setActive(index)}
              className={`border-t p-6 text-left transition-colors ${active === index ? "border-accent bg-cream" : "border-border hover:bg-cream"}`}
            >
              <span className="font-display text-4xl text-accent">{item.day}</span>
              <h3 className="mt-6 font-display text-3xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.text}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em]">
                Open the day <ArrowRight size={15} />
              </span>
            </button>
          ))}
        </div>
        <div className="mt-10 grid items-center gap-10 bg-foreground p-7 text-primary-foreground sm:p-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              DAY {itinerary.day}
            </p>
            <h2 className="mt-4 font-display text-5xl">{itinerary.title}</h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-primary-foreground/70">
              {itinerary.text}
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-3">
            {itinerary.steps.map((step) => (
              <li
                key={step}
                className="border-t border-primary-foreground/25 pt-4 text-sm leading-6"
              >
                <span className="mb-3 block text-accent">→</span>
                {step}
              </li>
            ))}
          </ul>
        </div>
      </PageBand>
      <PageBand muted>
        <div className="grid gap-5 md:grid-cols-3">
          <ImageCard
            image={photos.pool}
            label="NEARBY"
            title="The highlands"
            text="Take in the open highland landscape and the cooler air around Debre Birhan."
          />
          <ImageCard
            image={photos.spa}
            label="AT GETVA"
            title="The slow hours"
            text="Stay close to the hotel’s dining, wellness, and recreation options between plans."
            to="/wellness"
          />
          <ImageCard
            image={photos.lobby}
            label="THE WAY THERE"
            title="A sense of place"
            text="Ask the Getva team for current local recommendations and travel details."
          />
        </div>
        <div className="mt-12 flex items-start gap-4 border-t border-border pt-7 text-sm text-muted-foreground">
          <MapPin className="shrink-0 text-accent" size={19} />
          <p>
            Debre Birhan is approximately 130 km from Addis Ababa according to the supplied brief.
            Ask Getva for current local recommendations and travel details.
          </p>
        </div>
      </PageBand>
      <ContactCta title="Leave a little room for the unknown." />
      <SiteFooter />
    </>
  );
}
