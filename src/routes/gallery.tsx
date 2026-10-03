import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ContactCta, PageBand, PageHero, SiteFooter, routeHead } from "@/components/site";
import { galleryItems, photos } from "@/lib/resort-content";

export const Route = createFileRoute("/gallery")({
  head: () =>
    routeHead(
      "Gallery",
      "A glimpse of Getva Hotel, its city setting, and the experiences guests can ask about.",
    ),
  component: Gallery,
});

function Gallery() {
  const [filter, setFilter] = useState("ALL");
  const filters = ["ALL", "THE STAY", "THE WATER", "WELLNESS", "ROOMS"];
  const visible =
    filter === "ALL" ? galleryItems : galleryItems.filter((item) => item.label === filter);
  return (
    <>
      <PageHero
        eyebrow="A GLIMPSE OF GETVA"
        title={
          <>
            Leave room for <em>wonder.</em>
          </>
        }
        description="The spaces, gatherings, and highland-city moments you’ll want to remember."
        image={photos.pool}
      />
      <PageBand>
        <div className="flex flex-col justify-between gap-6 border-b border-border pb-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              THE GETVA JOURNAL
            </p>
            <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">In good light.</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`px-3 py-2 text-[10px] font-semibold tracking-[0.15em] ${filter === item ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, index) => (
            <figure
              key={`${item.title}-${index}`}
              className={`group relative overflow-hidden ${index % 5 === 0 ? "sm:row-span-2" : ""}`}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                width={1200}
                height={900}
                className={`h-full min-h-[270px] w-full object-cover transition-transform duration-700 group-hover:scale-105 ${index % 5 === 0 ? "sm:min-h-[560px]" : ""}`}
              />
              <div className="image-shade absolute inset-0" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground">
                <p className="text-[10px] font-semibold tracking-[0.18em]">{item.label}</p>
                <h3 className="mt-2 font-display text-3xl">{item.title}</h3>
              </figcaption>
            </figure>
          ))}
        </div>
      </PageBand>
      <ContactCta title="Come see it for yourself." />
      <SiteFooter />
    </>
  );
}
