/* eslint-disable react-refresh/only-export-components */
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Menu, Waves, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

export const navigation = [
  { label: "Home", to: "/" },
  { label: "Rooms", to: "/rooms" },
  { label: "Dining", to: "/dining" },
  { label: "Wellness & Recreation", to: "/wellness" },
  { label: "Events", to: "/events" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
] as const;

export function SiteHeader({ light = false }: { light?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const tone = light ? "text-primary-foreground" : "text-foreground";

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 ${tone} ${scrolled ? "nav-scrolled" : light ? "nav-glass" : "border-b border-border bg-background/95 backdrop-blur-md"}`}
    >
      <div className="mx-auto flex h-[82px] max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-14">
        <Link to="/" aria-label="Getva Hotel home" className="flex shrink-0 items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-full border border-current">
            <Waves size={20} strokeWidth={1.4} />
          </span>
          <span className="flex items-baseline gap-2 font-display text-[25px] leading-none font-semibold">
            <span>getva</span>
            <span className="font-sans text-[8px] font-semibold uppercase tracking-[0.3em]">
              hotel
            </span>
          </span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:flex xl:gap-9">
          {navigation.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`text-xs font-medium transition-opacity hover:opacity-60 ${pathname === item.to ? "border-b border-current pb-1" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button
            asChild
            variant={light ? "hero" : "default"}
            size="sm"
            className="hidden sm:inline-flex"
          >
            <Link to="/booking">
              Check availability <ArrowUpRight />
            </Link>
          </Button>
          <Button
            variant={light ? "heroGhost" : "outline"}
            size="icon"
            className="lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {open && (
        <nav
          aria-label="Mobile navigation"
          className={`${light ? "nav-mobile" : "bg-card text-card-foreground"} absolute inset-x-5 top-[82px] grid grid-cols-2 gap-1 border border-border p-4 shadow-lg sm:inset-x-8 lg:hidden`}
        >
          {navigation.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={`px-3 py-3 text-sm ${pathname === item.to ? "bg-primary/10" : "hover:bg-primary/10"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="mx-auto grid max-w-[1300px] gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.2fr_1fr] lg:px-14">
        <div>
          <Link to="/" className="font-display text-5xl">
            getva hotel
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-7 text-primary-foreground/70">
            Graceful hospitality at the heart of the city.
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.16em] text-primary-foreground/60">
            Debre Birhan · Ethiopia
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 self-start sm:grid-cols-3">
          {navigation.map((item) => (
            <Link
              to={item.to}
              key={item.to}
              className="text-sm text-primary-foreground/75 transition-colors hover:text-primary-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-t border-primary-foreground/15 px-5 py-5 text-center text-xs text-primary-foreground/55">
        © {new Date().getFullYear()} Getva Hotel · Graceful hospitality at the heart of the city.
      </div>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
}) {
  return (
    <section className="relative flex min-h-[470px] items-end overflow-hidden bg-foreground text-primary-foreground sm:min-h-[560px]">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        width={1536}
        height={1024}
      />
      <div className="hero-shade absolute inset-0" />
      <SiteHeader light />
      <div className="relative mx-auto w-full max-w-[1300px] px-5 pb-16 pt-32 sm:px-8 lg:px-14 lg:pb-24">
        <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary-foreground/85">
          {eyebrow}
        </p>
        <h1 className="max-w-[780px] font-display text-[58px] leading-[0.96] sm:text-[88px]">
          {title}
        </h1>
        <p className="mt-6 max-w-[560px] text-base leading-7 text-primary-foreground/85 sm:leading-8">
          {description}
        </p>
      </div>
    </section>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  text,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} mb-10 max-w-[680px]`}>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      <h2 className="font-display text-[48px] leading-[0.98] sm:text-[68px]">{title}</h2>
      {text && <p className="mt-5 text-base leading-8 text-muted-foreground">{text}</p>}
    </div>
  );
}

export function PageBand({ children, muted = false }: { children: ReactNode; muted?: boolean }) {
  return (
    <section className={`${muted ? "bg-cream" : "bg-background"} py-20 lg:py-28`}>
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-14">{children}</div>
    </section>
  );
}

export function ContactCta({
  title = "Make room for your next chapter.",
  text = "Tell us what you have in mind and we’ll help you find your way here.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-warm py-14 text-warm-foreground">
      <div className="mx-auto flex max-w-[1300px] flex-col items-start justify-between gap-7 px-5 sm:px-8 lg:flex-row lg:items-center lg:px-14">
        <div>
          <h2 className="max-w-[680px] font-display text-5xl leading-none sm:text-6xl">{title}</h2>
          <p className="mt-4 text-sm">{text}</p>
        </div>
        <Button asChild variant="hero">
          <Link to="/contact">
            Start a conversation <ArrowUpRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}

export function ImageCard({
  image,
  label,
  title,
  text,
  alt,
  to = "/contact",
}: {
  image: string;
  label: string;
  title: string;
  text: string;
  alt?: string;
  to?: "/rooms" | "/dining" | "/wellness" | "/events" | "/gallery" | "/contact";
}) {
  return (
    <article className="group bg-card">
      <div className="photo-zoom h-[270px] overflow-hidden sm:h-[320px]">
        <img
          src={image}
          alt={alt ?? title}
          loading="lazy"
          width={1200}
          height={900}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">{label}</p>
        <h3 className="mt-3 font-display text-[34px] leading-none">{title}</h3>
        <p className="mt-4 min-h-[72px] text-sm leading-7 text-muted-foreground">{text}</p>
        <Link
          to={to}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold hover:text-accent"
        >
          Discover more <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}

export function routeHead(title: string, description: string) {
  return {
    meta: [
      { title: `${title} | Getva Hotel` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} | Getva Hotel` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
