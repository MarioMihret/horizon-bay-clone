import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Utensils } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ContactCta,
  ImageCard,
  PageBand,
  PageHero,
  SectionIntro,
  SiteFooter,
  routeHead,
} from "@/components/site";
import { diningExperiences, photos } from "@/lib/resort-content";

export const Route = createFileRoute("/dining")({
  head: () =>
    routeHead(
      "Dining",
      "Traditional and modern dining, coffee, and bar experiences at Getva Hotel in Debre Birhan.",
    ),
  component: Dining,
});

const menus = {
  Morning: "Ask about breakfast service, coffee, and the best way to start a day in Debre Birhan.",
  Daytime: "Traditional Ethiopian favourites and modern plates for an easy lunch or family meal.",
  Evening:
    "A relaxed table for dinner, celebrations, and the conversations that carry on after the meal.",
};

function Dining() {
  const [menu, setMenu] = useState<keyof typeof menus>("Morning");
  return (
    <>
      <PageHero
        eyebrow="AT THE TABLE"
        title={
          <>
            Local flavour. <em>Good company.</em>
          </>
        }
        description="Getva brings together everyday dining, traditional Ethiopian flavour, coffee, and welcoming places to gather in Debre Birhan."
        image={photos.lobby}
      />
      <PageBand>
        <SectionIntro
          eyebrow="GETVA DINING"
          title="Follow your appetite."
          text="The supplied hotel information lists two restaurants and two bars, with traditional and modern food experiences. Ask the team what is open and available during your visit."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {diningExperiences.map((experience) => (
            <ImageCard
              key={experience.name}
              image={experience.image}
              label={experience.label}
              title={experience.name}
              text={experience.text}
              to="/contact"
            />
          ))}
        </div>
      </PageBand>
      <PageBand muted>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              A TASTE OF THE DAY
            </p>
            <h2 className="font-display text-[54px] leading-[0.95] sm:text-[72px]">
              Choose your <em>moment.</em>
            </h2>
            <p className="mt-5 text-sm leading-8 text-muted-foreground">
              Menus, service hours, breakfast, and coffee ceremony availability should be confirmed
              directly with the hotel.
            </p>
          </div>
          <div>
            <div className="flex flex-wrap gap-2 border-b border-border pb-4">
              {(Object.keys(menus) as Array<keyof typeof menus>).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setMenu(item)}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${menu === item ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="py-10">
              <Utensils className="text-accent" size={28} strokeWidth={1.4} />
              <h3 className="mt-5 font-display text-4xl">{menu} at Getva</h3>
              <p className="mt-4 max-w-lg text-sm leading-8 text-muted-foreground">{menus[menu]}</p>
              <Button asChild variant="text" className="mt-6">
                <a href="/contact">
                  Ask about dining <ArrowUpRight />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </PageBand>
      <ContactCta
        title="Pull up a chair."
        text="Tell us what you’re celebrating, and we’ll help you ask about the right table, menu, and service."
      />
      <SiteFooter />
    </>
  );
}
