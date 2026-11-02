import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { getSite } from "@/lib/content";

export const metadata: Metadata = {
  title: "Code of Conduct",
  description: "How we expect everyone to behave at Python Rwanda events and in our online spaces, and how to report a problem.",
};

// NOTE: draft for the organizers to review before launch.
export default function CodeOfConductPage() {
  const { links: LINKS } = getSite();
  const mail = `mailto:${LINKS.email}?subject=${encodeURIComponent("Code of Conduct report")}`;
  return (
    <>
      <PageHeader eyebrow="Code of Conduct" title="A welcoming community, for everyone."
        intro="This applies to everyone taking part in Python Rwanda: attendees, speakers, organizers, volunteers and sponsors, at events and in our online spaces." />

      <section className="section prose" style={{ paddingTop: "clamp(24px,3vw,40px)" }}>
        <h2>Our commitment</h2>
        <p>
          We want Python Rwanda to be a place where everyone feels safe and welcome, whatever their background, gender, age, ethnicity,
          religion, disability, appearance or level of experience. Beginners and experts belong here equally.
        </p>

        <h2>Expected behaviour</h2>
        <ul>
          <li>Be respectful and kind, in person and online.</li>
          <li>Be patient with people who are learning. Everyone started somewhere.</li>
          <li>Give feedback that is constructive and about the work, not the person.</li>
          <li>Keep discussions on topic and make room for others to speak.</li>
          <li>Respect people&apos;s privacy. Ask before sharing photos of someone or their personal details.</li>
        </ul>

        <h2>Unacceptable behaviour</h2>
        <ul>
          <li>Harassment, intimidation or discrimination of any kind.</li>
          <li>Offensive comments, slurs or imagery.</li>
          <li>Unwelcome physical contact or sexual attention.</li>
          <li>Disrupting talks, sessions or online discussions.</li>
          <li>Spam, unsolicited promotion, or sharing others&apos; private information.</li>
        </ul>

        <h2>Reporting a problem</h2>
        <p>
          If something makes you or someone else uncomfortable, please tell an organizer at the event, or email{" "}
          <a href={mail}>{LINKS.email}</a>. Reports are handled in confidence by the organizers, and we will not share your identity
          without your permission.
        </p>
        <p>If you are in immediate danger, contact local emergency services first.</p>

        <h2>What happens next</h2>
        <p>
          Organizers will review every report and may take any action they consider appropriate, from a warning to removal from an event
          or from our online spaces. We will follow up with the person who reported once the matter is resolved.
        </p>

        <p className="mono" style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 40 }}>Last updated: November 2026</p>
      </section>
    </>
  );
}
