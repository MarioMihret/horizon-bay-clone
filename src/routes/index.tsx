import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, MapPin, Menu, Minus, Plus, Users, Waves, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import lobby from "@/assets/horizon-lobby.jpg";
import pool from "@/assets/horizon-pool.jpg";
import suite from "@/assets/horizon-suite.jpg";
import spa from "@/assets/horizon-spa.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Horizon Bay Resort | A place to feel at home by the sea" },
      { name: "description", content: "Discover a slower kind of luxury at Horizon Bay Resort. Explore ocean-view stays, thoughtful experiences, and days by the water." },
      { property: "og:title", content: "Horizon Bay Resort | A place to feel at home by the sea" },
      { property: "og:description", content: "Ocean-view stays, thoughtful experiences, and days by the water at Horizon Bay Resort." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const rooms = [
  { name: "Coastal King Room", type: "ROOM · 2 GUESTS", image: suite, description: "A quiet retreat with natural textures, a generous king bed, and a view that makes mornings linger." },
  { name: "Ocean View Suite", type: "SUITE · 2 GUESTS", image: pool, description: "More room to unwind, with an open living area and a private outlook across the bay." },
  { name: "Wellness Retreat", type: "SUITE · 2 GUESTS", image: spa, description: "A restorative stay made for slow days, soft light, and moments entirely your own." },
];

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [guests, setGuests] = useState(2);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<(typeof rooms)[number] | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [dateError, setDateError] = useState("");
  const [showStayNote, setShowStayNote] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  function exploreStays() {
    if (checkIn && checkOut && checkOut <= checkIn) {
      setDateError("Check-out must be after check-in.");
      return;
    }
    setDateError("");
    setShowStayNote(Boolean(checkIn && checkOut));
    document.getElementById("rooms")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main>
      <section id="home" className="relative min-h-[630px] overflow-visible bg-foreground text-primary-foreground lg:min-h-[735px]">
        <img src={lobby} alt="Sunlit lobby overlooking the coast at Horizon Bay Resort" className="absolute inset-0 h-full w-full object-cover object-center" width={1536} height={1024} />
        <div className="hero-shade absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-[1440px] px-5 pt-5 sm:px-8 lg:px-14 lg:pt-7">
          <header className="nav-glass flex h-[74px] items-center justify-between border border-primary-foreground/20 px-5 sm:px-7 lg:px-9">
            <a href="#home" className="flex shrink-0 items-center gap-2.5" aria-label="Horizon Bay Resort home">
              <span className="flex size-9 items-center justify-center rounded-full border border-primary-foreground/80"><Waves size={21} strokeWidth={1.4} /></span>
              <span className="font-display text-[25px] leading-none font-semibold tracking-normal">horizon<span className="block font-sans text-[8px] font-semibold uppercase tracking-[0.28em]">bay resort</span></span>
            </a>
            <nav aria-label="Main navigation" className="hidden items-center gap-7 xl:gap-10 lg:flex">
              <a className="text-xs font-medium transition-opacity hover:opacity-70" href="#home">Home</a>
              <a className="text-xs font-medium transition-opacity hover:opacity-70" href="#about">About</a>
              <a className="text-xs font-medium transition-opacity hover:opacity-70" href="#rooms">Rooms & Suites</a>
              <a className="text-xs font-medium transition-opacity hover:opacity-70" href="#experiences">Experiences</a>
              <a className="text-xs font-medium transition-opacity hover:opacity-70" href="#contact">Contact</a>
            </nav>
            <div className="flex items-center gap-3">
              <Button asChild variant="hero" size="sm" className="hidden sm:inline-flex"><a href="#booking">Book your stay <ArrowUpRight /></a></Button>
              <Button variant="heroGhost" size="icon" className="lg:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
            </div>
          </header>
          {menuOpen && <nav aria-label="Mobile navigation" className="nav-mobile absolute left-5 right-5 top-[98px] z-30 flex flex-col gap-1 border border-primary-foreground/20 p-4 sm:left-8 sm:right-8 lg:hidden">{[["Home", "#home"], ["About", "#about"], ["Rooms & Suites", "#rooms"], ["Experiences", "#experiences"], ["Contact", "#contact"], ["Book your stay", "#booking"]].map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="px-3 py-3 text-sm hover:bg-primary-foreground/10">{label}</a>)}</nav>}
          <div className="reveal-up mt-32 max-w-[650px] sm:mt-36 lg:mt-40">
            <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em]"><span className="h-px w-8 bg-primary-foreground" /> YOUR ESCAPE BEGINS HERE</p>
            <h1 className="font-display text-balance text-[69px] leading-[0.88] font-medium sm:text-[88px] lg:text-[108px]">Find your<br /><em className="font-normal">perfect stay.</em></h1>
            <p className="mt-7 max-w-[435px] text-sm leading-7 text-primary-foreground/85 sm:text-base">A world away from ordinary. Unwind, reconnect, and make every moment feel a little more yours.</p>
            <Button asChild variant="hero" className="mt-8"><a href="#booking">Explore your stay <ArrowUpRight /></a></Button>
          </div>
          <div className="mt-20 hidden items-end justify-between pb-14 text-xs sm:mt-24 sm:flex lg:mt-20">
            <a href="#about" className="flex items-center gap-3 uppercase tracking-[0.16em] transition-opacity hover:opacity-70">Scroll to discover <ArrowDown size={15} /></a>
            <span className="hidden items-center gap-2 sm:flex"><MapPin size={15} /> Somewhere between sea and serenity</span>
          </div>
        </div>
        <div id="booking" className="booking-shadow absolute bottom-0 left-1/2 z-20 w-[calc(100%-40px)] max-w-[1250px] -translate-x-1/2 translate-y-1/2 bg-card px-4 py-3 text-card-foreground sm:w-[calc(100%-64px)] lg:px-6">
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] lg:gap-0">
            <div className="flex min-h-[62px] items-center gap-3 border-border px-2 lg:border-r lg:px-5"><MapPin className="size-5 shrink-0 text-accent" strokeWidth={1.5} /><div className="min-w-0"><span className="block text-[10px] font-semibold uppercase tracking-[0.13em]">Destination</span><span className="mt-1 block truncate text-xs text-muted-foreground">Horizon Bay Resort</span></div></div>
            <label className="flex min-h-[62px] items-center gap-3 border-border px-2 lg:border-r lg:px-5"><CalendarDays className="size-5 shrink-0 text-accent" strokeWidth={1.5} /><span className="min-w-0 flex-1"><span className="block text-[10px] font-semibold uppercase tracking-[0.13em]">Check in</span><input aria-label="Check in" type="date" value={checkIn} min={today} onChange={(e) => { setCheckIn(e.target.value); setDateError(""); }} className="mt-1 block w-full bg-transparent text-xs text-muted-foreground outline-none" /></span></label>
            <label className="flex min-h-[62px] items-center gap-3 border-border px-2 lg:border-r lg:px-5"><CalendarDays className="size-5 shrink-0 text-accent" strokeWidth={1.5} /><span className="min-w-0 flex-1"><span className="block text-[10px] font-semibold uppercase tracking-[0.13em]">Check out</span><input aria-label="Check out" type="date" value={checkOut} min={checkIn || today} onChange={(e) => { setCheckOut(e.target.value); setDateError(""); }} className="mt-1 block w-full bg-transparent text-xs text-muted-foreground outline-none" /></span></label>
            <div className="flex min-h-[62px] items-center gap-3 px-2 lg:px-5"><Users className="size-5 shrink-0 text-accent" strokeWidth={1.5} /><div className="min-w-0 flex-1"><span className="block text-[10px] font-semibold uppercase tracking-[0.13em]">Guests</span><div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground"><Button variant="counter" size="tinyIcon" aria-label="Remove guest" onClick={() => setGuests(Math.max(1, guests - 1))}><Minus /></Button><span className="min-w-7 text-center">{guests}</span><Button variant="counter" size="tinyIcon" aria-label="Add guest" onClick={() => setGuests(Math.min(8, guests + 1))}><Plus /></Button></div></div></div>
            <Button variant="default" className="col-span-2 h-[62px] w-full lg:col-span-1 lg:w-[165px]" onClick={exploreStays}>Explore stays <ArrowUpRight /></Button>
          </div>
          {dateError && <p role="alert" className="px-2 pt-2 text-xs text-destructive">{dateError}</p>}
        </div>
      </section>

      <section id="about" className="mx-auto grid max-w-[1300px] gap-10 px-5 pb-24 pt-36 sm:px-8 sm:pt-44 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20 lg:px-14 lg:pb-32 lg:pt-44">
        <div><p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">WELCOME TO HORIZON BAY</p><h2 className="font-display text-[54px] leading-[0.95] sm:text-[70px]">The art of<br /><em>slowing down.</em></h2><p className="mt-8 max-w-[460px] text-sm leading-8 text-muted-foreground">At Horizon Bay, the best moments are the ones you never rush. From sun-drenched mornings to evenings by the water, this is your place to pause, breathe, and simply be.</p><Button asChild variant="text" className="mt-7"><a href="#experiences">Discover our world <ArrowUpRight /></a></Button></div>
        <div className="relative grid h-[380px] grid-cols-[1.35fr_0.7fr] gap-3 sm:h-[480px]"><img src={pool} alt="Infinity pool overlooking the bay" loading="lazy" width={1200} height={912} className="h-full w-full object-cover" /><img src={spa} alt="Relaxing spa room with an ocean view" loading="lazy" width={912} height={1200} className="h-[75%] w-full self-end object-cover" /><span className="absolute -bottom-5 left-[38%] flex size-24 flex-col items-center justify-center rounded-full bg-warm text-center text-[10px] font-semibold uppercase leading-4 tracking-[0.1em] text-warm-foreground sm:size-28"><Waves size={23} strokeWidth={1.3} className="mb-1" /> STAY A<br /> LITTLE LONGER</span></div>
      </section>

      <div className="bg-warm py-8 text-warm-foreground"><div className="mx-auto grid max-w-[1250px] grid-cols-2 items-center gap-6 px-5 text-center sm:grid-cols-4 sm:px-8"><span className="font-display text-2xl italic sm:text-3xl">Unwind</span><span className="font-display text-2xl italic sm:text-3xl">Reconnect</span><span className="font-display text-2xl italic sm:text-3xl">Explore</span><span className="font-display text-2xl italic sm:text-3xl">Belong</span></div></div>

      <section id="experiences" className="bg-foreground py-20 text-primary-foreground lg:py-28"><div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-14"><div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">MADE FOR THE MOMENT</p><h2 className="font-display text-[53px] leading-none sm:text-[70px]">A stay that <em>stays with you.</em></h2></div><p className="max-w-[330px] text-sm leading-7 text-primary-foreground/70">Find your own rhythm, whether that means doing everything or beautifully nothing at all.</p></div><div className="grid gap-4 md:grid-cols-3"><Experience image={pool} label="01 / THE WATER" title="Days by the bay" description="Follow the sunshine from poolside mornings to golden-hour views." /><Experience image={spa} label="02 / WELLNESS" title="Room to reset" description="Slow down with spaces designed to restore and renew." /><Experience image={suite} label="03 / THE STAY" title="Feel right at home" description="Thoughtful details make every return feel familiar." /></div></div></section>

      <section id="rooms" className="bg-cream py-20 text-cream-foreground lg:py-28"><div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-14"><div className="mb-10 text-center"><p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">ROOMS & SUITES</p><h2 className="font-display text-[58px] leading-none sm:text-[76px]">Stay a little <em>longer.</em></h2><p className="mx-auto mt-5 max-w-[540px] text-sm leading-7 text-muted-foreground">Spaces to settle into. Beautifully simple, quietly luxurious, and made for the way you want to feel.</p>{showStayNote && <p role="status" className="mt-4 text-xs font-medium text-primary">Exploring stays for {guests} {guests === 1 ? "guest" : "guests"}, {checkIn} to {checkOut}. Contact the resort to confirm availability.</p>}</div><div className="grid gap-5 md:grid-cols-3">{rooms.map((room) => <article key={room.name} className="group bg-card"><div className="photo-zoom h-[280px] overflow-hidden sm:h-[330px]"><img src={room.image} alt={room.name} loading="lazy" width={1200} height={900} className="h-full w-full object-cover" /></div><div className="p-6"><p className="text-[10px] font-semibold tracking-[0.18em] text-accent">{room.type}</p><h3 className="mt-3 font-display text-[32px] leading-none">{room.name}</h3><p className="mt-3 min-h-[72px] text-xs leading-6 text-muted-foreground">{room.description}</p><Button variant="text" onClick={() => setSelectedRoom(room)}>View this stay <ArrowUpRight /></Button></div></article>)}</div><p className="mt-8 text-center text-xs text-muted-foreground">Room details are illustrative. Availability and rates are confirmed directly by the resort.</p></div></section>

      <section className="relative min-h-[430px] overflow-hidden bg-foreground text-primary-foreground sm:min-h-[500px]"><img src={pool} alt="Sunset over the resort's infinity pool and coast" loading="lazy" width={1200} height={912} className="absolute inset-0 h-full w-full object-cover" /><div className="hero-shade absolute inset-0" /><div className="relative mx-auto flex min-h-[430px] max-w-[1300px] flex-col justify-center px-5 py-16 sm:min-h-[500px] sm:px-8 lg:px-14"><p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em]">YOUR NEXT CHAPTER AWAITS</p><h2 className="max-w-[560px] font-display text-[60px] leading-[0.95] sm:text-[82px]">There&apos;s more to life <em>by the sea.</em></h2><Button asChild variant="hero" className="mt-8 w-fit"><a href="#booking">Plan your stay <ArrowUpRight /></a></Button></div></section>

      <footer id="contact" className="bg-background pt-20"><div className="mx-auto grid max-w-[1300px] gap-14 px-5 pb-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-14"><div><p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">KEEP IN TOUCH</p><h2 className="max-w-[500px] font-display text-[53px] leading-[0.95] sm:text-[67px]">A little escape in <em>your inbox.</em></h2><p className="mt-5 max-w-[420px] text-sm leading-7 text-muted-foreground">A note from the coast, whenever you need a moment away.</p><form onSubmit={(e) => { e.preventDefault(); if (newsletterEmail.trim()) setNewsletterDone(true); }} className="mt-8 flex max-w-[430px] border-b border-foreground"><input aria-label="Email address" type="email" required placeholder="Your email address" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} className="min-w-0 flex-1 bg-transparent py-4 text-sm outline-none placeholder:text-muted-foreground" /><Button variant="text" type="submit" aria-label="Join newsletter"><ArrowRight /></Button></form>{newsletterDone && <p role="status" className="mt-3 text-xs text-muted-foreground">Thanks for your interest. Newsletter sign-up is not connected yet.</p>}</div><div className="grid grid-cols-2 gap-7 lg:justify-self-end lg:gap-20"><div><h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.15em]">Explore</h3><div className="flex flex-col gap-4 text-sm text-muted-foreground"><a href="#about" className="hover:text-foreground">Our story</a><a href="#rooms" className="hover:text-foreground">Rooms & suites</a><a href="#experiences" className="hover:text-foreground">Experiences</a><a href="#booking" className="hover:text-foreground">Plan a stay</a></div></div><div><h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.15em]">Horizon Bay</h3><p className="max-w-[180px] text-sm leading-7 text-muted-foreground">A place to slow down, settle in, and find your horizon.</p><a href="#home" className="mt-6 inline-flex items-center gap-2 text-sm">Back to top <ArrowUpRight size={16} /></a></div></div></div><div className="border-t border-border"><div className="mx-auto flex max-w-[1300px] flex-col items-center justify-between gap-4 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:px-8 lg:px-14"><span>© {new Date().getFullYear()} Horizon Bay Resort. Concept website.</span><span>Made for moments that matter.</span></div></div></footer>

      {selectedRoom && <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay p-4" role="presentation" onClick={() => setSelectedRoom(null)}><div role="dialog" aria-modal="true" aria-label={selectedRoom.name} className="relative max-h-[90vh] w-full max-w-[720px] overflow-y-auto bg-card text-card-foreground" onClick={(e) => e.stopPropagation()}><Button variant="hero" size="icon" className="absolute right-4 top-4 z-10" aria-label="Close room details" onClick={() => setSelectedRoom(null)}><X /></Button><img src={selectedRoom.image} alt={selectedRoom.name} width={1200} height={900} className="h-[270px] w-full object-cover sm:h-[350px]" /><div className="p-7 sm:p-10"><p className="text-[10px] font-semibold tracking-[0.18em] text-accent">{selectedRoom.type}</p><h2 className="mt-3 font-display text-5xl">{selectedRoom.name}</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">{selectedRoom.description}</p><p className="mt-5 text-xs text-muted-foreground">This is a design concept. Reservations and live availability are not available on this website.</p><Button variant="default" className="mt-7" onClick={() => { setSelectedRoom(null); document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" }); }}>Explore dates <ArrowUpRight /></Button></div></div></div>}
    </main>
  );
}

function Experience({ image, label, title, description }: { image: string; label: string; title: string; description: string }) {
  return <article className="photo-zoom relative h-[420px] overflow-hidden"><img src={image} alt={title} loading="lazy" width={1200} height={900} className="h-full w-full object-cover" /><div className="image-shade absolute inset-0" /><div className="absolute inset-x-0 bottom-0 p-7"><p className="text-[10px] font-semibold tracking-[0.18em]">{label}</p><h3 className="mt-2 font-display text-[39px] leading-none">{title}</h3><p className="mt-3 max-w-[300px] text-xs leading-6 text-primary-foreground/85">{description}</p></div></article>;
}
