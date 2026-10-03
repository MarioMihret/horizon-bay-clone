import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Heart, Sparkles, Waves } from "lucide-react";
import {
  ContactCta,
  PageBand,
  PageHero,
  SectionIntro,
  SiteFooter,
  routeHead,
} from "@/components/site";
import { photos } from "@/lib/resort-content";

export const Route = createFileRoute("/about")({
  head: () =>
    routeHead(
      "Our story",
      "Learn about Getva Hotel, a city hotel in Debre Birhan built around graceful Ethiopian hospitality.",
    ),
  component: About,
});

const values = [
  {
    icon: Waves,
    name: "Know the place",
    text: "Stay close to Debre Birhan’s highland setting and use the hotel as a base for the city and nearby explorations.",
  },
  {
    icon: Heart,
    name: "Make it personal",
    text: "The best hospitality feels intuitive: considered, warm, and shaped around the reason you are here.",
  },
  {
    icon: Sparkles,
    name: "Gather well",
    text: "From family time to weddings and meetings, good spaces help people connect without unnecessary friction.",
  },
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="THE GETVA HOTEL STORY"
        title={
          <>
            Graceful hospitality at the <em>heart of the city.</em>
          </>
        }
        description="Getva Hotel is a welcoming base for stays, dining, recreation, and celebrations in Debre Birhan, Ethiopia."
        image={photos.lobby}
      />
      <PageBand>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <div>
            <SectionIntro
              eyebrow="A CITY HOTEL WITH A STORY"
              title="Made for real moments."
              text="The supplied hotel brief describes Getva as a long-running Debre Birhan hotel with rooms, restaurants, bars, wellness, recreation, and event facilities. We are keeping the story grounded in what has been provided while current details are confirmed."
            />
            <a href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold">
              Plan your stay <ArrowUpRight size={16} />
            </a>
          </div>
          <img
            src={photos.suite}
            alt="Illustrative hotel suite"
            width={1200}
            height={900}
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
      </PageBand>
      <PageBand muted>
        <SectionIntro
          eyebrow="THE GETVA EXPERIENCE"
          title="Warm, useful, and personal."
          align="center"
          text="A comfortable city stay should make the important parts easy: a good room, a welcoming meal, and a team that listens."
        />
        <div className="grid gap-10 md:grid-cols-3">
          {values.map(({ icon: Icon, name, text }) => (
            <article key={name} className="border-t border-border pt-6">
              <Icon size={25} strokeWidth={1.2} className="text-accent" />
              <h3 className="mt-7 font-display text-3xl">{name}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </PageBand>
      <PageBand>
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              A NOTE FROM GETVA
            </p>
            <blockquote className="font-display text-[48px] leading-[0.95] sm:text-[68px]">
              “Graceful hospitality starts with making people feel expected.”
            </blockquote>
          </div>
          <div className="self-end text-sm leading-8 text-muted-foreground">
            <p>
              The hotel’s published story is associated with Ethiopian athlete Gete Wami and the
              Gete Wami & Family business. Exact biography and ownership wording should be approved
              before publication.
            </p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
              — The Getva Hotel team
            </p>
          </div>
        </div>
      </PageBand>
      <ContactCta title="Find your place in Debre Birhan." />
      <SiteFooter />
    </>
  );
}
