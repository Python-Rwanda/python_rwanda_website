import Hero from "@/components/Hero";
import About from "@/components/About";
import Upcoming from "@/components/Upcoming";
import PastEvents from "@/components/PastEvents";
import PartnerStrip from "@/components/PartnerStrip";
import Join from "@/components/Join";
import { getEvents, getSite } from "@/lib/content";

export default function Home() {
  const site = getSite();
  const events = getEvents();
  return (
    <>
      <Hero {...site.hero} />
      <About />
      <Upcoming events={events.filter((e) => e.upcoming)} fallbackImage={site.page_images.upcoming_fallback} rsvpFallback={site.links.linkedin} />
      <PastEvents events={events.filter((e) => !e.upcoming)} />
      <PartnerStrip />
      <Join />
    </>
  );
}
