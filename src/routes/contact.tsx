import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { PageBand, PageHero, SectionIntro, SiteFooter, routeHead } from "@/components/site";
import { photos } from "@/lib/resort-content";

export const Route = createFileRoute("/contact")({
  head: () =>
    routeHead(
      "Contact",
      "Contact Getva Hotel in Debre Birhan about rooms, dining, events, and current availability.",
    ),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }
  return (
    <>
      <PageHero
        eyebrow="WE’D LOVE TO HEAR FROM YOU"
        title={
          <>
            Let’s start with <em>hello.</em>
          </>
        }
        description="Tell us what you have in mind. We’ll help you ask about rooms, dining, wellness, events, and the details that matter for your visit."
        image={photos.suite}
      />
      <PageBand>
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <SectionIntro
              eyebrow="GET IN TOUCH"
              title="Make room for a conversation."
              text="For reservations, celebrations, or a question about what is currently available, send Getva a note or use the published contact details below."
            />
            <div className="space-y-6 text-sm text-muted-foreground">
              <div className="flex gap-4">
                <MapPin className="shrink-0 text-accent" size={19} />
                <span>
                  Zerayakob Street, Debre Birhan
                  <br />
                  Ethiopia · Map code MGCH+M75
                </span>
              </div>
              <div className="flex gap-4">
                <Mail className="shrink-0 text-accent" size={19} />
                <span>reservations@getvahotel.com</span>
              </div>
              <div className="flex gap-4">
                <Phone className="shrink-0 text-accent" size={19} />
                <span>0937376237</span>
              </div>
            </div>
            <p className="mt-6 text-xs leading-6 text-muted-foreground">
              Contact details are transcribed from the supplied research brief. Please confirm the
              current phone number and email before launch.
            </p>
          </div>
          <div className="bg-cream p-6 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              SEND A NOTE
            </p>
            <h2 className="mt-4 font-display text-5xl leading-none">How can we help?</h2>
            <form onSubmit={submit} className="mt-8 grid gap-5 sm:grid-cols-2">
              <label className="text-xs font-semibold uppercase tracking-[0.12em]">
                Your name
                <input
                  required
                  name="name"
                  className="mt-2 w-full border border-border bg-card px-4 py-3 text-sm font-normal normal-case outline-none focus:border-accent"
                  placeholder="Full name"
                />
              </label>
              <label className="text-xs font-semibold uppercase tracking-[0.12em]">
                Email
                <input
                  required
                  type="email"
                  name="email"
                  className="mt-2 w-full border border-border bg-card px-4 py-3 text-sm font-normal normal-case outline-none focus:border-accent"
                  placeholder="you@example.com"
                />
              </label>
              <label className="text-xs font-semibold uppercase tracking-[0.12em] sm:col-span-2">
                I’m interested in
                <select
                  name="interest"
                  className="mt-2 w-full border border-border bg-card px-4 py-3 text-sm font-normal normal-case outline-none focus:border-accent"
                >
                  <option>Planning a stay</option>
                  <option>A room or suite</option>
                  <option>Dining</option>
                  <option>Wellness</option>
                  <option>An event</option>
                </select>
              </label>
              <label className="text-xs font-semibold uppercase tracking-[0.12em] sm:col-span-2">
                Your message
                <textarea
                  required
                  name="message"
                  rows={5}
                  className="mt-2 w-full border border-border bg-card px-4 py-3 text-sm font-normal normal-case outline-none focus:border-accent"
                  placeholder="Tell us what you have in mind"
                />
              </label>
              <Button type="submit" className="h-12 sm:col-span-2">
                Send your note <ArrowUpRight />
              </Button>
            </form>
            {sent && (
              <p role="status" className="mt-5 text-sm text-muted-foreground">
                Thanks — your note has been received as part of this concept experience. We’ll be in
                touch soon.
              </p>
            )}
          </div>
        </div>
      </PageBand>
      <PageBand muted>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            A SMALL REMINDER
          </p>
          <h2 className="mt-4 font-display text-5xl leading-none sm:text-6xl">
            You don’t have to wait for the perfect time.
          </h2>
          <p className="mt-5 text-sm leading-8 text-muted-foreground">
            Sometimes the best reason to get away is simply to remember how good it feels to be
            somewhere new.
          </p>
        </div>
      </PageBand>
      <SiteFooter />
    </>
  );
}
