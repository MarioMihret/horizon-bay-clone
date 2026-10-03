import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Mail, MapPin, Phone, Users } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { SiteFooter, SiteHeader, routeHead } from "@/components/site";
import { roomCatalog } from "@/lib/resort-content";

export const Route = createFileRoute("/booking")({
  head: () =>
    routeHead(
      "Plan your stay",
      "Share your dates, choose a room, and send a reservation enquiry to Getva Hotel.",
    ),
  component: Booking,
});

const steps = ["Dates & guests", "Choose a room", "Your details", "Review"];
const today = new Date().toISOString().split("T")[0];

type GuestDetails = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

function Booking() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [roomName, setRoomName] = useState("");
  const [details, setDetails] = useState<GuestDetails>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("getva-booking");
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as Partial<{
        checkIn: string;
        checkOut: string;
        guests: number;
        roomName: string;
      }>;
      if (parsed.checkIn) setCheckIn(parsed.checkIn);
      if (parsed.checkOut) setCheckOut(parsed.checkOut);
      if (parsed.guests) setGuests(parsed.guests);
      if (parsed.roomName) setRoomName(parsed.roomName);
    } catch {
      sessionStorage.removeItem("getva-booking");
    }
  }, []);

  function saveBooking(nextRoomName = roomName) {
    sessionStorage.setItem(
      "getva-booking",
      JSON.stringify({ checkIn, checkOut, guests, roomName: nextRoomName }),
    );
  }

  function nextStep() {
    setError("");
    if (step === 0) {
      if (!checkIn || !checkOut) {
        setError("Add both check-in and check-out dates to continue.");
        return;
      }
      if (checkOut <= checkIn) {
        setError("Check-out must be after check-in.");
        return;
      }
    }
    if (step === 1 && !roomName) {
      setError("Choose a room so the team knows what to check for you.");
      return;
    }
    if (step === 2 && (!details.name.trim() || !details.email.trim() || !details.phone.trim())) {
      setError("Add your name, email, and phone number so Getva can reply.");
      return;
    }
    if (step === 2 && !/^\S+@\S+\.\S+$/.test(details.email)) {
      setError("Enter a valid email address so Getva can reply.");
      return;
    }
    saveBooking();
    setStep((current) => Math.min(3, current + 1));
  }

  function previousStep() {
    setError("");
    setStep((current) => Math.max(0, current - 1));
  }

  function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    sessionStorage.removeItem("getva-booking");
  }

  const selectedRoom = roomCatalog.find((room) => room.name === roomName);

  if (sent) {
    return (
      <>
        <SiteHeader />
        <main className="bg-cream px-5 pb-24 pt-36 sm:px-8 lg:px-14">
          <div className="mx-auto max-w-2xl bg-card p-7 text-center shadow-sm sm:p-12">
            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check size={26} />
            </span>
            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              ENQUIRY RECEIVED
            </p>
            <h1 className="mt-4 font-display text-5xl leading-none sm:text-6xl">
              Thank you, {details.name.split(" ")[0] || "there"}.
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-base leading-8 text-muted-foreground">
              Your stay request is ready for the Getva reservations team. They will confirm current
              availability, room details, and rates directly with you.
            </p>
            <div className="mt-8 grid gap-3 border-y border-border py-5 text-left text-sm sm:grid-cols-2">
              <p className="flex gap-3">
                <Mail size={17} className="shrink-0 text-accent" /> reservations@getvahotel.com
              </p>
              <p className="flex gap-3">
                <Phone size={17} className="shrink-0 text-accent" /> 0937376237
              </p>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild>
                <Link to="/">Back to Getva home</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact">Contact the hotel</Link>
              </Button>
            </div>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <main className="bg-cream px-5 pb-24 pt-32 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-[1100px]">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              PLAN YOUR STAY
            </p>
            <h1 className="mt-4 font-display text-6xl leading-[0.92] sm:text-8xl">
              Let’s make a plan.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground">
              Four simple steps. No payment is taken here—we’ll send your request to Getva so the
              team can confirm the details with you.
            </p>
          </div>

          <nav
            aria-label="Booking progress"
            className="mt-12 grid grid-cols-4 gap-2 border-y border-border py-5"
          >
            {steps.map((label, index) => (
              <button
                key={label}
                type="button"
                onClick={() => index < step && setStep(index)}
                className={`text-left text-xs font-semibold uppercase tracking-[0.12em] ${index === step ? "text-primary" : index < step ? "text-accent" : "text-muted-foreground"}`}
              >
                <span className={`mb-3 block h-1 ${index <= step ? "bg-primary" : "bg-border"}`} />
                <span className="hidden sm:inline">0{index + 1} · </span>
                {label}
              </button>
            ))}
          </nav>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_330px]">
            <section className="bg-card p-6 shadow-sm sm:p-10" aria-labelledby="booking-step-title">
              {step === 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    STEP 1 OF 4
                  </p>
                  <h2 id="booking-step-title" className="mt-3 font-display text-5xl leading-none">
                    When are you staying?
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    Start with the dates and number of guests. We’ll use this to check the right
                    room options.
                  </p>
                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    <label className="text-xs font-semibold uppercase tracking-[0.12em]">
                      Check-in
                      <input
                        aria-label="Booking check-in"
                        type="date"
                        min={today}
                        value={checkIn}
                        onChange={(event) => {
                          setCheckIn(event.target.value);
                          setError("");
                        }}
                        className="mt-2 h-12 w-full border border-border bg-background px-4 text-sm font-normal normal-case outline-none focus:border-accent"
                      />
                    </label>
                    <label className="text-xs font-semibold uppercase tracking-[0.12em]">
                      Check-out
                      <input
                        aria-label="Booking check-out"
                        type="date"
                        min={checkIn || today}
                        value={checkOut}
                        onChange={(event) => {
                          setCheckOut(event.target.value);
                          setError("");
                        }}
                        className="mt-2 h-12 w-full border border-border bg-background px-4 text-sm font-normal normal-case outline-none focus:border-accent"
                      />
                    </label>
                  </div>
                  <div className="mt-7 flex items-center justify-between border-t border-border pt-6">
                    <span className="flex items-center gap-3 text-sm">
                      <Users size={19} className="text-accent" /> Guests
                    </span>
                    <div className="flex items-center gap-4">
                      <Button
                        type="button"
                        variant="counter"
                        size="icon"
                        aria-label="Remove guest"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                      >
                        −
                      </Button>
                      <span className="min-w-5 text-center">{guests}</span>
                      <Button
                        type="button"
                        variant="counter"
                        size="icon"
                        aria-label="Add guest"
                        onClick={() => setGuests(Math.min(8, guests + 1))}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    STEP 2 OF 4
                  </p>
                  <h2 id="booking-step-title" className="mt-3 font-display text-5xl leading-none">
                    Choose a room.
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    Select the option you would like the reservations team to check first.
                  </p>
                  <div className="mt-8 grid gap-4">
                    {roomCatalog.map((room) => (
                      <button
                        type="button"
                        key={room.name}
                        onClick={() => setRoomName(room.name)}
                        className={`grid gap-5 border p-4 text-left transition-colors sm:grid-cols-[150px_1fr_auto] sm:items-center ${roomName === room.name ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                      >
                        <img src={room.image} alt="" className="h-28 w-full object-cover sm:h-24" />
                        <span>
                          <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                            {room.label}
                          </span>
                          <span className="mt-2 block font-display text-3xl">{room.name}</span>
                          <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                            {room.description}
                          </span>
                        </span>
                        <span
                          className={`flex size-6 items-center justify-center rounded-full border ${roomName === room.name ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}
                        >
                          {roomName === room.name && <Check size={14} />}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    STEP 3 OF 4
                  </p>
                  <h2 id="booking-step-title" className="mt-3 font-display text-5xl leading-none">
                    How can we reach you?
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    These details let the hotel reply with availability and a current quote.
                  </p>
                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    <label className="text-xs font-semibold uppercase tracking-[0.12em]">
                      Full name
                      <input
                        required
                        value={details.name}
                        onChange={(event) => setDetails({ ...details, name: event.target.value })}
                        placeholder="Your name"
                        className="mt-2 h-12 w-full border border-border bg-background px-4 text-sm font-normal normal-case outline-none focus:border-accent"
                      />
                    </label>
                    <label className="text-xs font-semibold uppercase tracking-[0.12em]">
                      Email
                      <input
                        required
                        type="email"
                        value={details.email}
                        onChange={(event) => setDetails({ ...details, email: event.target.value })}
                        placeholder="you@example.com"
                        className="mt-2 h-12 w-full border border-border bg-background px-4 text-sm font-normal normal-case outline-none focus:border-accent"
                      />
                    </label>
                    <label className="text-xs font-semibold uppercase tracking-[0.12em] sm:col-span-2">
                      Phone number
                      <input
                        required
                        type="tel"
                        value={details.phone}
                        onChange={(event) => setDetails({ ...details, phone: event.target.value })}
                        placeholder="Your phone number"
                        className="mt-2 h-12 w-full border border-border bg-background px-4 text-sm font-normal normal-case outline-none focus:border-accent"
                      />
                    </label>
                    <label className="text-xs font-semibold uppercase tracking-[0.12em] sm:col-span-2">
                      Anything we should know?{" "}
                      <span className="font-normal normal-case text-muted-foreground">
                        Optional
                      </span>
                      <textarea
                        rows={4}
                        value={details.message}
                        onChange={(event) =>
                          setDetails({ ...details, message: event.target.value })
                        }
                        placeholder="Arrival time, accessibility needs, event details…"
                        className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm font-normal normal-case outline-none focus:border-accent"
                      />
                    </label>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    STEP 4 OF 4
                  </p>
                  <h2 id="booking-step-title" className="mt-3 font-display text-5xl leading-none">
                    Check everything.
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    Review your enquiry before sending it to Getva. The hotel will confirm
                    availability, amenities, and rates.
                  </p>
                  <dl className="mt-8 divide-y divide-border border-y border-border text-sm">
                    <SummaryRow
                      label="Dates"
                      value={`${checkIn} → ${checkOut}`}
                      onEdit={() => setStep(0)}
                    />
                    <SummaryRow
                      label="Guests"
                      value={`${guests} ${guests === 1 ? "guest" : "guests"}`}
                      onEdit={() => setStep(0)}
                    />
                    <SummaryRow label="Room" value={roomName} onEdit={() => setStep(1)} />
                    <SummaryRow
                      label="Contact"
                      value={`${details.name} · ${details.email}`}
                      onEdit={() => setStep(2)}
                    />
                  </dl>
                  {details.message && (
                    <p className="mt-5 bg-cream p-4 text-sm leading-7 text-muted-foreground">
                      “{details.message}”
                    </p>
                  )}
                  <form onSubmit={submitEnquiry}>
                    <Button type="submit" className="mt-8 w-full sm:w-auto">
                      Send reservation enquiry <ArrowRight />
                    </Button>
                  </form>
                </div>
              )}

              {error && (
                <p
                  role="alert"
                  className="mt-7 border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
                >
                  {error}
                </p>
              )}
              {step < 3 && (
                <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                  {step > 0 ? (
                    <Button type="button" variant="outline" onClick={previousStep}>
                      <ArrowLeft /> Back
                    </Button>
                  ) : (
                    <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                      Cancel
                    </Link>
                  )}
                  <Button type="button" onClick={nextStep}>
                    {step === 2
                      ? "Review enquiry"
                      : step === 1
                        ? "Continue with room"
                        : "See room options"}{" "}
                    <ArrowRight />
                  </Button>
                </div>
              )}
              {step === 3 && (
                <button
                  type="button"
                  onClick={previousStep}
                  className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft size={15} /> Back to edit
                </button>
              )}
            </section>

            <aside className="self-start bg-foreground p-6 text-primary-foreground sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                YOUR ENQUIRY
              </p>
              <h2 className="mt-4 font-display text-4xl">Getva Hotel</h2>
              <p className="mt-3 flex gap-2 text-sm leading-6 text-primary-foreground/70">
                <MapPin size={16} className="mt-1 shrink-0 text-accent" /> Zerayakob Street, Debre
                Birhan, Ethiopia
              </p>
              <div className="mt-8 border-t border-primary-foreground/20 pt-5 text-sm leading-7 text-primary-foreground/75">
                <p>
                  <strong className="text-primary-foreground">No payment today.</strong>
                  <br />
                  This form sends an enquiry. The hotel confirms availability and rates with you.
                </p>
                <p className="mt-5">
                  Published contact:
                  <br />
                  reservations@getvahotel.com
                  <br />
                  0937376237
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

function SummaryRow({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </dt>
      <dd className="flex items-center gap-3 text-right">
        <span>{value}</span>
        <button
          type="button"
          onClick={onEdit}
          className="text-xs font-semibold text-accent hover:underline"
        >
          Edit
        </button>
      </dd>
    </div>
  );
}
