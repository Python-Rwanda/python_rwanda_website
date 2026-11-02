import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Upcoming from "@/components/Upcoming";
import EventsBrowser from "@/components/EventsBrowser";
import Join from "@/components/Join";
import { getEvents, getSite } from "@/lib/content";

export const metadata: Metadata = {
  title: "Events",
  description: "Bootcamps, meetups, workshops and webinars from the Python Rwanda community.",
};

export default function EventsPage() {
  const site = getSite();
  const events = getEvents();
  return (
    <>
      <PageHeader eyebrow="Events" title="Learn, build and meet." photo={{ src: site.page_images.events, alt: "" }}
        intro="Bootcamps, university workshops, meetups and webinars. Everything we've run, and what's coming next." />
      <Upcoming events={events.filter((e) => e.upcoming)} fallbackImage={site.page_images.upcoming_fallback} rsvpFallback={site.links.linkedin} />
      <EventsBrowser events={events.filter((e) => !e.upcoming)} />
      <Join title="Don't miss the next one." text="Event announcements go to the WhatsApp community first." />
    </>
  );
}
