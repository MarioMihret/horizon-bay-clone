import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
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
import { photos, roomCatalog } from "@/lib/resort-content";

export const Route = createFileRoute("/rooms")({
  head: () =>
    routeHead(
      "Rooms",
      "Explore single, king, and family room options at Getva Hotel in Debre Birhan.",
    ),
  component: Rooms,
});

function Rooms() {
  const [filter, setFilter] = useState<"All" | "Rooms" | "Family">("All");
  const visibleRooms =
    filter === "All" ? roomCatalog : roomCatalog.filter((room) => room.category === filter);

  return (
    <>
      <PageHero
        eyebrow="ROOMS"
        title={
          <>
            Settle in, <em>your way.</em>
          </>
        }
        description="Choose from single, king, and family room options, with current availability and rates confirmed directly by Getva."
        image={photos.suite}
      />
      <PageBand>
        <SectionIntro
          eyebrow="YOUR PLACE IN DEBRE BIRHAN"
          title="Come as you are."
          text="Getva’s published room categories include single, king, and family options. Exact room features, bed configurations, occupancy, and rates should be confirmed with reservations."
        />
        <div className="mb-10 flex flex-wrap gap-2 border-b border-border pb-4">
          {(["All", "Rooms", "Family"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors ${filter === item ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="space-y-16">
          {visibleRooms.map((room, index) => (
            <article
              key={room.name}
              className="grid items-center gap-8 border-b border-border pb-16 last:border-0 md:grid-cols-2 md:gap-16"
            >
              <div className={index % 2 ? "md:order-2" : ""}>
                <img
                  src={room.image}
                  alt={room.name}
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-accent">
                  0{index + 1} / {room.label}
                </p>
                <h2 className="mt-4 font-display text-[52px] leading-none sm:text-[66px]">
                  {room.name}
                </h2>
                <p className="mt-5 max-w-md text-sm leading-8 text-muted-foreground">
                  {room.description}
                </p>
                <ul className="mt-7 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
                  {room.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-2">
                      <Check size={15} className="text-accent" />
                      {detail}
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-8">
                  <a href="/contact">
                    Ask about this room <ArrowUpRight />
                  </a>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </PageBand>
      <ContactCta
        title="Your room is waiting."
        text="Share your dates and we’ll help you confirm the right room, availability, and current rate."
      />
      <SiteFooter />
    </>
  );
}
