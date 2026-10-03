import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Menu,
  Minus,
  Plus,
  Users,
  Waves,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import lobby from "@/assets/horizon-lobby.jpg";
import pool from "@/assets/horizon-pool.jpg";
import suite from "@/assets/horizon-suite.jpg";
import spa from "@/assets/horizon-spa.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Getva Hotel | Debre Birhan" },
      {
        name: "description",
        content:
          "Discover graceful hospitality at Getva Hotel in Debre Birhan. Explore rooms, dining, wellness, recreation, and events in the heart of the city.",
      },
      { property: "og:title", content: "Getva Hotel | Debre Birhan" },
      {
        property: "og:description",
        content: "Rooms, dining, wellness, recreation, and events at Getva Hotel in Debre Birhan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const rooms = [
  {
    name: "Single Room",
    type: "ROOM · CONFIRM OCCUPANCY",
    image: suite,
    description: "A practical, comfortable base for a solo stay or work trip in Debre Birhan.",
  },
  {
    name: "King Room",
    type: "ROOM · CONFIRM OCCUPANCY",
    image: pool,
    description:
      "A little more space for an easy city stay. Ask reservations about current features and rates.",
  },
  {
    name: "Family Room",
    type: "FAMILY · CONFIRM OCCUPANCY",
    image: spa,
    description:
      "A flexible option for families or small groups. Bed configuration and availability are confirmed directly by the hotel.",
  },
];

function Home() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [guests, setGuests] = useState(2);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<(typeof rooms)[number] | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [dateError, setDateError] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!selectedRoom) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedRoom(null);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          "button, a, input, select, textarea, [tabindex]:not([tabindex='-1'])",
        ),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [selectedRoom]);

  function exploreStays() {
    if (!checkIn || !checkOut) {
      setDateError("Add both check-in and check-out dates to continue.");
      return;
    }
    if (checkOut <= checkIn) {
      setDateError("Check-out must be after check-in.");
      return;
    }
    setDateError("");
    sessionStorage.setItem("getva-booking", JSON.stringify({ checkIn, checkOut, guests }));
    navigate({ to: "/booking" });
  }

  return (
    <main>
      <section
        id="home"
        className="relative min-h-[630px] overflow-visible bg-foreground text-primary-foreground lg:min-h-[735px]"
      >
        <img
          src={lobby}
          alt="Illustrative hotel lobby"
          className="absolute inset-0 h-full w-full object-cover object-center"
          width={1536}
          height={1024}
        />
        <div className="hero-shade absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-[1440px] px-5 pt-5 sm:px-8 lg:px-14 lg:pt-7">
          <header
            className={`fixed left-5 right-5 top-5 z-50 mx-auto flex h-[68px] max-w-[1338px] items-center justify-between border px-5 transition-colors duration-200 sm:left-8 sm:right-8 sm:h-[74px] sm:px-7 lg:left-14 lg:right-14 lg:px-9 ${scrolled ? "nav-scrolled" : "nav-glass border-primary-foreground/20"}`}
          >
            <a
              href="#home"
              className="flex shrink-0 items-center gap-2.5"
              aria-label="Getva Hotel home"
            >
              <span className="flex size-9 items-center justify-center rounded-full border border-primary-foreground/80">
                <Waves size={21} strokeWidth={1.4} />
              </span>
              <span className="flex items-baseline gap-2 font-display text-[25px] leading-none font-semibold tracking-normal">
                <span>getva</span>
                <span className="font-sans text-[8px] font-semibold uppercase tracking-[0.3em]">
                  hotel
                </span>
              </span>
            </a>
            <nav
              aria-label="Main navigation"
              className="hidden items-center gap-7 xl:gap-10 lg:flex"
            >
              <a className="text-xs font-medium transition-opacity hover:opacity-70" href="#home">
                Home
              </a>
              <Link className="text-xs font-medium transition-opacity hover:opacity-70" to="/about">
                About
              </Link>
              <Link className="text-xs font-medium transition-opacity hover:opacity-70" to="/rooms">
                Rooms
              </Link>
              <Link
                className="text-xs font-medium transition-opacity hover:opacity-70"
                to="/explore"
              >
                Wellness & Recreation
              </Link>
              <Link
                className="text-xs font-medium transition-opacity hover:opacity-70"
                to="/contact"
              >
                Contact
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <Button asChild variant="hero" size="sm" className="hidden sm:inline-flex">
                <Link to="/booking">
                  Check availability <ArrowUpRight />
                </Link>
              </Button>
              <Button
                variant="heroGhost"
                size="icon"
                className="lg:hidden"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </header>
          {menuOpen && (
            <nav
              aria-label="Mobile navigation"
              className="nav-mobile fixed left-5 right-5 top-[93px] z-40 flex flex-col gap-1 border border-primary-foreground/20 p-4 sm:left-8 sm:right-8 lg:hidden"
            >
              {[
                ["Home", "#home"],
                ["About", "#about"],
                ["Rooms", "#rooms"],
                ["Wellness & Recreation", "#experiences"],
                ["Contact", "#contact"],
                ["Book your stay", "/booking"],
              ].map(([label, href]) =>
                label === "Book your stay" ? (
                  <Link
                    key={href}
                    to="/booking"
                    onClick={() => setMenuOpen(false)}
                    className="px-3 py-3 text-sm hover:bg-primary-foreground/10"
                  >
                    {label}
                  </Link>
                ) : (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="px-3 py-3 text-sm hover:bg-primary-foreground/10"
                  >
                    {label}
                  </a>
                ),
              )}
            </nav>
          )}
          <div className="mt-32 max-w-[650px] sm:mt-36 lg:mt-40">
            <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em]">
              <span className="h-px w-8 bg-primary-foreground" /> GRACEFUL HOSPITALITY IN DEBRE
              BIRHAN
            </p>
            <h1 className="font-display text-balance text-[58px] leading-[0.96] font-medium sm:text-[86px] lg:text-[104px]">
              Feel at home in the
              <br />
              <em className="font-normal">heart of the city.</em>
            </h1>
            <p className="mt-7 max-w-[435px] text-base leading-7 text-primary-foreground/90 sm:leading-8">
              Rooms, dining, wellness, recreation, and celebrations shaped around your time in the
              highlands.
            </p>
            <Button asChild variant="hero" className="mt-8">
              <Link to="/booking">
                Check availability <ArrowUpRight />
              </Link>
            </Button>
          </div>
          <div className="mt-20 hidden items-end justify-between pb-14 text-xs sm:mt-24 sm:flex lg:mt-20">
            <a
              href="#about"
              className="flex items-center gap-3 uppercase tracking-[0.16em] transition-opacity hover:opacity-70"
            >
              Scroll to discover <ArrowDown size={15} />
            </a>
            <span className="hidden items-center gap-2 sm:flex">
              <MapPin size={15} /> Zerayakob Street · Debre Birhan
            </span>
          </div>
        </div>
        <div
          id="booking"
          className="booking-shadow absolute bottom-0 left-1/2 z-20 w-[calc(100%-40px)] max-w-[1250px] -translate-x-1/2 translate-y-1/2 bg-card px-4 py-3 text-card-foreground sm:w-[calc(100%-64px)] lg:px-6"
        >
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] lg:gap-0">
            <div className="flex min-h-[62px] items-center gap-3 border-border px-2 lg:border-r lg:px-5">
              <MapPin className="size-5 shrink-0 text-accent" strokeWidth={1.5} />
              <div className="min-w-0">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.13em]">
                  Destination
                </span>
                <span className="mt-1 block truncate text-xs text-muted-foreground">
                  Getva Hotel
                </span>
              </div>
            </div>
            <label className="flex min-h-[62px] items-center gap-3 border-border px-2 lg:border-r lg:px-5">
              <CalendarDays className="size-5 shrink-0 text-accent" strokeWidth={1.5} />
              <span className="min-w-0 flex-1">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.13em]">
                  Check in
                </span>
                <input
                  aria-label="Check in"
                  type="date"
                  value={checkIn}
                  min={today}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                    setDateError("");
                  }}
                  className="mt-1 block w-full bg-transparent text-xs text-muted-foreground outline-none"
                />
              </span>
            </label>
            <label className="flex min-h-[62px] items-center gap-3 border-border px-2 lg:border-r lg:px-5">
              <CalendarDays className="size-5 shrink-0 text-accent" strokeWidth={1.5} />
              <span className="min-w-0 flex-1">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.13em]">
                  Check out
                </span>
                <input
                  aria-label="Check out"
                  type="date"
                  value={checkOut}
                  min={checkIn || today}
                  onChange={(e) => {
                    setCheckOut(e.target.value);
                    setDateError("");
                  }}
                  className="mt-1 block w-full bg-transparent text-xs text-muted-foreground outline-none"
                />
              </span>
            </label>
            <div className="flex min-h-[62px] items-center gap-3 px-2 lg:px-5">
              <Users className="size-5 shrink-0 text-accent" strokeWidth={1.5} />
              <div className="min-w-0 flex-1">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.13em]">
                  Guests
                </span>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <Button
                    variant="counter"
                    size="tinyIcon"
                    aria-label="Remove guest"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                  >
                    <Minus />
                  </Button>
                  <span className="min-w-7 text-center">{guests}</span>
                  <Button
                    variant="counter"
                    size="tinyIcon"
                    aria-label="Add guest"
                    onClick={() => setGuests(Math.min(8, guests + 1))}
                  >
                    <Plus />
                  </Button>
                </div>
              </div>
            </div>
            <Button
              variant="default"
              className="col-span-2 h-[62px] w-full lg:col-span-1 lg:w-[165px]"
              onClick={exploreStays}
            >
              See room options <ArrowUpRight />
            </Button>
          </div>
          {dateError && (
            <p role="alert" className="px-2 pt-2 text-xs text-destructive">
              {dateError}
            </p>
          )}
        </div>
      </section>

      <section
        id="about"
        className="mx-auto grid max-w-[1300px] gap-10 px-5 pb-24 pt-36 sm:px-8 sm:pt-44 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20 lg:px-14 lg:pb-32 lg:pt-44"
      >
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            WELCOME TO GETVA HOTEL
          </p>
          <h2 className="font-display text-[54px] leading-[0.95] sm:text-[70px]">
            The art of
            <br />
            <em>slowing down.</em>
          </h2>
          <p className="mt-8 max-w-[460px] text-sm leading-8 text-muted-foreground">
            Getva is a real city hotel for comfortable stays, local dining, wellness, recreation,
            and gatherings in Debre Birhan. Come for what brings you here, and let the team make it
            easier.
          </p>
          <Button asChild variant="text" className="mt-7">
            <a href="#experiences">
              Discover our world <ArrowUpRight />
            </a>
          </Button>
        </div>
        <div className="relative grid h-[380px] grid-cols-[1.35fr_0.7fr] gap-3 sm:h-[480px]">
          <img
            src={pool}
            alt="Illustrative hotel recreation area"
            loading="lazy"
            width={1200}
            height={912}
            className="h-full w-full object-cover"
          />
          <img
            src={spa}
            alt="Illustrative wellness room"
            loading="lazy"
            width={912}
            height={1200}
            className="h-[75%] w-full self-end object-cover"
          />
          <span className="absolute -bottom-5 left-[38%] flex size-24 flex-col items-center justify-center rounded-full bg-warm text-center text-[10px] font-semibold uppercase leading-4 tracking-[0.1em] text-warm-foreground sm:size-28">
            <Waves size={23} strokeWidth={1.3} className="mb-1" /> STAY A<br /> LITTLE LONGER
          </span>
        </div>
      </section>

      <div className="bg-warm py-8 text-warm-foreground">
        <div className="mx-auto grid max-w-[1250px] grid-cols-2 items-center gap-6 px-5 text-center sm:grid-cols-4 sm:px-8">
          <span className="font-display text-2xl italic sm:text-3xl">Unwind</span>
          <span className="font-display text-2xl italic sm:text-3xl">Reconnect</span>
          <span className="font-display text-2xl italic sm:text-3xl">Explore</span>
          <span className="font-display text-2xl italic sm:text-3xl">Belong</span>
        </div>
      </div>

      <section id="experiences" className="bg-foreground py-20 text-primary-foreground lg:py-28">
        <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-14">
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                MADE FOR YOUR MOMENT
              </p>
              <h2 className="font-display text-[53px] leading-none sm:text-[70px]">
                A stay that <em>fits your plans.</em>
              </h2>
            </div>
            <p className="max-w-[330px] text-sm leading-7 text-primary-foreground/70">
              Stay for a room, a meal, a celebration, or a little time to reset between plans.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Experience
              image={pool}
              label="01 / THE CITY"
              title="A base for Debre Birhan"
              description="Stay close to the city and use Getva as your starting point for the highlands."
            />
            <Experience
              image={spa}
              label="02 / WELLNESS & RECREATION"
              title="Time to reset"
              description="Ask about massage, heat facilities, pool time, billiards, and family recreation."
            />
            <Experience
              image={suite}
              label="03 / GATHERINGS"
              title="Bring people together"
              description="From weddings to meetings, ask about flexible spaces and current packages."
            />
          </div>
        </div>
      </section>

      <section id="rooms" className="bg-cream py-20 text-cream-foreground lg:py-28">
        <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-14">
          <div className="mb-10 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              ROOMS
            </p>
            <h2 className="font-display text-[58px] leading-none sm:text-[76px]">
              Settle in, <em>your way.</em>
            </h2>
            <p className="mx-auto mt-5 max-w-[540px] text-sm leading-7 text-muted-foreground">
              Explore single, king, and family room options. Availability, current amenities, and
              rates are confirmed directly by Getva.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {rooms.map((room) => (
              <article key={room.name} className="group bg-card">
                <div className="photo-zoom h-[280px] overflow-hidden sm:h-[330px]">
                  <img
                    src={room.image}
                    alt={room.name}
                    loading="lazy"
                    width={1200}
                    height={900}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-[10px] font-semibold tracking-[0.18em] text-accent">
                    {room.type}
                  </p>
                  <h3 className="mt-3 font-display text-[32px] leading-none">{room.name}</h3>
                  <p className="mt-3 min-h-[72px] text-xs leading-6 text-muted-foreground">
                    {room.description}
                  </p>
                  <Button variant="text" onClick={() => setSelectedRoom(room)}>
                    View this stay <ArrowUpRight />
                  </Button>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-muted-foreground">
            Room details are illustrative. Availability and rates are confirmed directly by the
            hotel.
          </p>
        </div>
      </section>

      <section className="relative min-h-[430px] overflow-hidden bg-foreground text-primary-foreground sm:min-h-[500px]">
        <img
          src={pool}
          alt="Illustrative hotel recreation area"
          loading="lazy"
          width={1200}
          height={912}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-shade absolute inset-0" />
        <div className="relative mx-auto flex min-h-[430px] max-w-[1300px] flex-col justify-center px-5 py-16 sm:min-h-[500px] sm:px-8 lg:px-14">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em]">
            YOUR NEXT CHAPTER AWAITS
          </p>
          <h2 className="max-w-[560px] font-display text-[60px] leading-[0.95] sm:text-[82px]">
            There&apos;s more to a stay <em>in the highlands.</em>
          </h2>
          <Button asChild variant="hero" className="mt-8 w-fit">
            <Link to="/booking">
              Plan your stay <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </section>

      <footer id="contact" className="bg-background pt-20">
        <div className="mx-auto grid max-w-[1300px] gap-14 px-5 pb-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-14">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              KEEP IN TOUCH
            </p>
            <h2 className="max-w-[500px] font-display text-[53px] leading-[0.95] sm:text-[67px]">
              A little escape in <em>your inbox.</em>
            </h2>
            <p className="mt-5 max-w-[420px] text-sm leading-7 text-muted-foreground">
              Hotel news, local ideas, and useful notes for your next stay in Debre Birhan.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (newsletterEmail.trim()) setNewsletterDone(true);
              }}
              className="mt-8 flex max-w-[430px] border-b border-foreground"
            >
              <input
                aria-label="Email address"
                type="email"
                required
                placeholder="Your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="min-w-0 flex-1 bg-transparent py-4 text-sm outline-none placeholder:text-muted-foreground"
              />
              <Button variant="text" type="submit" aria-label="Join newsletter">
                <ArrowRight />
              </Button>
            </form>
            {newsletterDone && (
              <p role="status" className="mt-3 text-xs text-muted-foreground">
                Thanks for your interest. Newsletter sign-up is not connected yet.
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-7 lg:justify-self-end lg:gap-20">
            <div>
              <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.15em]">Explore</h3>
              <div className="flex flex-col gap-4 text-sm text-muted-foreground">
                <a href="#about" className="hover:text-foreground">
                  Our story
                </a>
                <Link to="/rooms" className="hover:text-foreground">
                  Rooms
                </Link>
                <Link to="/explore" className="hover:text-foreground">
                  Experiences
                </Link>
                <Link to="/booking" className="hover:text-foreground">
                  Plan a stay
                </Link>
              </div>
            </div>
            <div>
              <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.15em]">
                Getva Hotel
              </h3>
              <p className="max-w-[180px] text-sm leading-7 text-muted-foreground">
                Graceful hospitality at the heart of the city.
              </p>
              <a href="#home" className="mt-6 inline-flex items-center gap-2 text-sm">
                Back to top <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="mx-auto flex max-w-[1300px] flex-col items-center justify-between gap-4 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:px-8 lg:px-14">
            <span>
              © {new Date().getFullYear()} Getva Hotel. Current details are confirmed by the hotel.
            </span>
            <span>Graceful hospitality at the heart of the city.</span>
          </div>
        </div>
      </footer>

      {selectedRoom && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-overlay p-4"
          role="presentation"
          onClick={() => setSelectedRoom(null)}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={selectedRoom.name}
            aria-labelledby="room-dialog-title"
            aria-describedby="room-dialog-description"
            className="relative max-h-[90vh] w-full max-w-[720px] overflow-y-auto bg-card text-card-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              ref={closeButtonRef}
              variant="hero"
              size="icon"
              className="absolute right-4 top-4 z-10"
              aria-label="Close room details"
              onClick={() => setSelectedRoom(null)}
            >
              <X />
            </Button>
            <img
              src={selectedRoom.image}
              alt={selectedRoom.name}
              width={1200}
              height={900}
              className="h-[270px] w-full object-cover sm:h-[350px]"
            />
            <div className="p-7 sm:p-10">
              <p className="text-[10px] font-semibold tracking-[0.18em] text-accent">
                {selectedRoom.type}
              </p>
              <h2 id="room-dialog-title" className="mt-3 font-display text-5xl">
                {selectedRoom.name}
              </h2>
              <p
                id="room-dialog-description"
                className="mt-4 text-base leading-7 text-muted-foreground"
              >
                {selectedRoom.description}
              </p>
              <p className="mt-5 text-xs text-muted-foreground">
                This is a design concept. Reservations and live availability are not available on
                this website.
              </p>
              <Button
                variant="default"
                className="mt-7"
                onClick={() => {
                  setSelectedRoom(null);
                  sessionStorage.setItem(
                    "getva-booking",
                    JSON.stringify({ roomName: selectedRoom.name }),
                  );
                  navigate({ to: "/booking" });
                }}
              >
                Plan this stay <ArrowUpRight />
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function Experience({
  image,
  label,
  title,
  description,
}: {
  image: string;
  label: string;
  title: string;
  description: string;
}) {
  return (
    <article className="photo-zoom relative h-[420px] overflow-hidden">
      <img
        src={image}
        alt={title}
        loading="lazy"
        width={1200}
        height={900}
        className="h-full w-full object-cover"
      />
      <div className="image-shade absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 p-7">
        <p className="text-[10px] font-semibold tracking-[0.18em]">{label}</p>
        <h3 className="mt-2 font-display text-[39px] leading-none">{title}</h3>
        <p className="mt-3 max-w-[300px] text-xs leading-6 text-primary-foreground/85">
          {description}
        </p>
      </div>
    </article>
  );
}
