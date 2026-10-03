import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, MapPin, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const navigation = [
  { label: "Home", to: "/" },
  { label: "Rooms", to: "/rooms" },
  { label: "Dining", to: "/dining" },
  { label: "Wellness", to: "/wellness" },
  { label: "Events", to: "/events" },
  { label: "About", to: "/about" },
  { label: "Gallery", to: "/gallery" },
  { label: "Explore", to: "/explore" },
  { label: "Contact", to: "/contact" },
] as const;

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return <header className={`${overlay ? "absolute left-0 right-0 top-0 z-30 text-primary-foreground" : "relative z-30 bg-primary text-primary-foreground"}`}>
    <div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
      <Link to="/" aria-label="Getva Hotel home" className="flex shrink-0 items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-full border border-primary-foreground/70 font-display text-[25px] italic">G</span>
        <span className="font-display text-[27px] leading-[0.76] font-semibold">Getva<span className="mt-2 block font-sans text-[9px] font-semibold uppercase tracking-[0.24em]">Hotel · Debre Birhan</span></span>
      </Link>
      <nav aria-label="Main navigation" className="hidden items-center gap-5 xl:flex">{navigation.map((item) => <Link key={item.to} to={item.to} className={`text-[11px] font-medium transition-opacity hover:opacity-65 ${pathname === item.to ? "border-b border-primary-foreground pb-1" : ""}`}>{item.label}</Link>)}</nav>
      <div className="flex items-center gap-2"><Button asChild variant="hero" size="sm" className="hidden sm:inline-flex"><Link to="/contact">Plan your stay <ArrowUpRight /></Link></Button><Button variant="heroGhost" size="icon" className="xl:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button></div>
    </div>
    {open && <nav aria-label="Mobile navigation" className="nav-mobile absolute left-0 right-0 top-[78px] grid max-h-[calc(100vh-78px)] grid-cols-2 gap-1 overflow-y-auto border-t border-primary-foreground/20 p-5 shadow-lg sm:px-8 xl:hidden">{navigation.map((item) => <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className={`px-3 py-3 text-sm ${pathname === item.to ? "bg-primary-foreground/15" : "hover:bg-primary-foreground/10"}`}>{item.label}</Link>)}</nav>}
  </header>;
}

export function SiteFooter() {
  return <footer className="bg-primary text-primary-foreground"><div className="mx-auto grid max-w-[1300px] gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.2fr_1fr] lg:px-14"><div><span className="font-display text-5xl">Getva Hotel</span><p className="mt-4 max-w-sm text-sm leading-7 text-primary-foreground/75">Graceful hospitality at the heart of Debre Birhan. A place to stay, gather, and discover the highlands.</p><div className="mt-6 flex items-center gap-2 text-xs text-primary-foreground/75"><MapPin size={15} /> Zerayakob Street, Debre Birhan, Ethiopia</div></div><div className="grid grid-cols-2 gap-x-6 gap-y-3 self-start">{navigation.map((item) => <Link to={item.to} key={item.to} className="text-sm text-primary-foreground/80 hover:text-primary-foreground">{item.label}</Link>)}</div></div><div className="border-t border-primary-foreground/20 px-5 py-5 text-center text-xs text-primary-foreground/60">© {new Date().getFullYear()} Getva Hotel · Debre Birhan, Ethiopia. Concept imagery is illustrative.</div></footer>;
}

export function PageHero({ eyebrow, title, description, image, imageAlt }: { eyebrow: string; title: string; description: string; image: string; imageAlt: string }) {
  return <section className="relative flex min-h-[390px] items-end overflow-hidden bg-foreground text-primary-foreground sm:min-h-[455px]"><img src={image} alt={imageAlt} width={1200} height={900} className="absolute inset-0 h-full w-full object-cover" /><div className="hero-shade absolute inset-0" /><div className="relative mx-auto w-full max-w-[1300px] px-5 pb-16 pt-28 sm:px-8 lg:px-14"><p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-foreground/90">{eyebrow}</p><h1 className="max-w-[800px] font-display text-[62px] leading-[0.9] sm:text-[86px]">{title}</h1><p className="mt-5 max-w-[560px] text-sm leading-7 text-primary-foreground/85">{description}</p></div></section>;
}

export function SectionIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return <div className="mb-10"><p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p><h2 className="font-display text-[52px] leading-[0.95] sm:text-[70px]">{title}</h2>{text && <p className="mt-5 max-w-[620px] text-sm leading-8 text-muted-foreground">{text}</p>}</div>;
}

export function ContentBand({ children, muted = false }: { children: ReactNode; muted?: boolean }) {
  return <section className={`${muted ? "bg-cream" : "bg-background"} py-20 lg:py-28`}><div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-14">{children}</div></section>;
}

export function PhotoCard({ image, alt, eyebrow, title, text, to, cta = "Explore" }: { image: string; alt: string; eyebrow?: string; title: string; text: string; to?: "/rooms" | "/dining" | "/wellness" | "/events" | "/about" | "/gallery" | "/explore" | "/contact"; cta?: string }) {
  return <article className="bg-card"><div className="photo-zoom h-[270px] overflow-hidden sm:h-[300px]"><img src={image} alt={alt} loading="lazy" width={1200} height={900} className="h-full w-full object-cover" /></div><div className="p-6"><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">{eyebrow}</p><h3 className="mt-3 font-display text-[34px] leading-none">{title}</h3><p className="mt-4 min-h-[75px] text-sm leading-7 text-muted-foreground">{text}</p>{to && <Button asChild variant="text" className="mt-4"><Link to={to}>{cta} <ArrowRight /></Link></Button>}</div></article>;
}

export function ContactCta({ title = "Let’s make room for your next visit.", text = "Tell us what you have in mind and we’ll help you take the next step." }: { title?: string; text?: string }) {
  return <section className="bg-warm py-14 text-warm-foreground"><div className="mx-auto flex max-w-[1300px] flex-col items-start justify-between gap-6 px-5 sm:px-8 lg:flex-row lg:items-center lg:px-14"><div><h2 className="font-display text-5xl leading-none sm:text-6xl">{title}</h2><p className="mt-4 text-sm">{text}</p></div><Button asChild variant="hero"><Link to="/contact">Contact Getva <ArrowUpRight /></Link></Button></div></section>;
}

export function routeHead(title: string, description: string) {
  return { meta: [{ title: `${title} | Getva Hotel, Debre Birhan` }, { name: "description", content: description }, { property: "og:title", content: `${title} | Getva Hotel` }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] };
}
