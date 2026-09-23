import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { CTASection } from "@/components/common/CTASection";
import { SiteImage } from "@/components/common/SiteImage";
import { DonationForm } from "@/components/forms/DonationForm";
import { ContactForm } from "@/components/forms/ContactForm";
import { VolunteerForm } from "@/components/forms/VolunteerForm";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Seo } from "@/components/common/Seo";
import { organization } from "@/config/organization";
import { ngoImages } from "@/config/ngoImages";
import { pageMetadata } from "@/config/seo";
import { ROUTES } from "@/constants/routes";

type SiteSectionKind =
  | "gallery"
  | "donate"
  | "volunteer"
  | "partnership"
  | "team"
  | "reports"
  | "contact"
  | "faq"
  | "privacy"
  | "terms"
  | "cancellation";

interface SiteSectionPageProps {
  kind: SiteSectionKind;
  title: string;
  description: string;
}

const metadataKey: Record<SiteSectionKind, keyof typeof pageMetadata> = {
  gallery: "gallery",
  donate: "donate",
  volunteer: "volunteer",
  partnership: "partnership",
  team: "team",
  reports: "reports",
  contact: "contact",
  faq: "faq",
  privacy: "privacy",
  terms: "terms",
  cancellation: "cancellation",
};

const galleryNames = [
  "hero-community",
  "education-1",
  "healthcare-1",
  "women-1",
  "children-1",
  "community-1",
  "environment-1",
  "volunteers-1",
  "events-1",
  "leadership-1",
  "impact-story",
] as const;

const faqItems = [
  ["How can I volunteer?", "Use the volunteer page to email the team with your interests, skills and availability."],
  ["How can I support the work?", "You can contact the team about donations, volunteering or partnership conversations."],
  ["Where can I find reports?", "Verified reports are shared through the reports page when they are approved for publication."],
  ["How can I contact the organization?", "Use the published email address or phone number on the contact page."],
] as const;

export default function SiteSectionPage({ kind, title, description }: SiteSectionPageProps) {
  const metadata = pageMetadata[metadataKey[kind]];
  return (
    <>
      <Seo {...metadata} />
      <PageHero title={title} description={description} breadcrumbs={[{ label: title }]} />

      {kind === "gallery" && (
        <Section labelledBy="gallery-heading" tone="white">
          <h2 id="gallery-heading" className="text-3xl font-medium sm:text-4xl">Community work in focus</h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-500">A visual collection of the programs, people and community settings represented across this site.</p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryNames.map((name) => (
              <li key={name} className="overflow-hidden rounded-2xl bg-ivory-100">
                <SiteImage image={ngoImages[name]} loading="lazy" decoding="async" className="aspect-4/3 w-full object-cover transition-transform duration-500 hover:scale-105" />
              </li>
            ))}
          </ul>
        </Section>
      )}

      {kind === "donate" && (
        <Section labelledBy="donate-heading">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 id="donate-heading" className="text-3xl font-medium sm:text-4xl">Choose how you would like to support the work</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-500">Choose an amount, review your order and complete a clearly labelled demo payment.</p>
              <div className="mt-8 max-w-md"><DonationForm /></div>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink to={ROUTES.contact} variant="outline">Contact the team</ButtonLink>
              </div>
            </div>
            <div className="rounded-3xl border border-navy-900/10 bg-white p-8 shadow-card">
              <h3 className="text-2xl font-medium">Transparent next steps</h3>
              <ol className="mt-6 space-y-5 text-ink-600">
                <li><strong className="text-navy-900">01. Tell us your intent.</strong><br />Share the amount or type of support you are considering.</li>
                <li><strong className="text-navy-900">02. Confirm the details.</strong><br />The team can provide verified payment and documentation information.</li>
                <li><strong className="text-navy-900">03. Keep a record.</strong><br />Use the official confirmation shared by the organization.</li>
              </ol>
            </div>
          </div>
        </Section>
      )}

      {kind === "volunteer" && <Section labelledBy="volunteer-heading"><div className="mx-auto max-w-3xl"><h2 id="volunteer-heading" className="text-3xl font-medium sm:text-4xl">Bring your time and skills</h2><p className="mt-5 text-lg leading-relaxed text-ink-500">Share your interests, skills and availability with the volunteer team.</p><div className="mt-8"><VolunteerForm /></div></div></Section>}
      {kind === "partnership" && <ActionSection title="Start a partnership conversation" text="Share your organization, the kind of collaboration you are exploring and the best way to reach you." subject="Partnership enquiry" action="Email partnership enquiry" />}
      {kind === "reports" && <ActionSection title="Reports and transparency" text="Verified reports, policies and organizational documents will be published here after review. For a specific document request, contact the team directly." subject="Reports request" action="Request a document" />}
      {kind === "team" && <ActionSection title="Meet the people behind the work" text="Team profiles are published only after names, roles, biographies and image permissions are verified. Contact the organization for current team information." subject="Team information request" action="Request team information" />}

      {kind === "contact" && (
        <Section labelledBy="contact-heading">
          <Container size="narrow" className="px-0!">
            <h2 id="contact-heading" className="text-3xl font-medium sm:text-4xl">Contact the organization</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <a href={`mailto:${organization.email}`} className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-card hover:border-brand-500"><Mail className="size-5 text-brand-600" aria-hidden="true" /><span className="mt-4 block font-semibold">Email</span><span className="mt-1 block text-sm text-ink-500">{organization.email}</span></a>
              <a href={organization.phoneHref} className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-card hover:border-brand-500"><Phone className="size-5 text-brand-600" aria-hidden="true" /><span className="mt-4 block font-semibold">Phone</span><span className="mt-1 block text-sm text-ink-500">{organization.phone}</span></a>
              <address className="rounded-2xl border border-navy-900/10 bg-white p-6 not-italic shadow-card"><MapPin className="size-5 text-brand-600" aria-hidden="true" /><span className="mt-4 block font-semibold">Address</span><span className="mt-1 block text-sm text-ink-500">{organization.address.lines.join(", ")}</span></address>
            </div>
            <div className="mt-12"><ContactForm /></div>
          </Container>
        </Section>
      )}

      {kind === "faq" && <Section labelledBy="faq-heading"><h2 id="faq-heading" className="text-3xl font-medium sm:text-4xl">Questions people ask</h2><div className="mt-8 divide-y divide-navy-900/10 rounded-2xl border border-navy-900/10 bg-white">{faqItems.map(([question, answer]) => <details key={question} className="group p-6"><summary className="cursor-pointer font-semibold text-navy-900">{question}</summary><p className="mt-3 max-w-2xl leading-relaxed text-ink-500">{answer}</p></details>)}</div></Section>}

      {(kind === "privacy" || kind === "terms" || kind === "cancellation") && <PolicySection kind={kind} />}

      {!['contact', 'faq', 'privacy', 'terms', 'cancellation', 'donate'].includes(kind) && <CTASection id={`${kind}-cta-heading`} title="Take the next step" description="Connect with the team to discuss a verified, practical way to participate." primary={{ label: "Contact Us", to: ROUTES.contact }} secondary={{ label: "Explore Programs", to: ROUTES.programs }} />}
    </>
  );
}

function ActionSection({ title, text, subject, action }: { title: string; text: string; subject: string; action: string }) {
  return <Section labelledBy="action-heading"><div className="mx-auto max-w-3xl text-center"><h2 id="action-heading" className="text-3xl font-medium sm:text-4xl">{title}</h2><p className="mt-5 text-lg leading-relaxed text-ink-500">{text}</p><a href={`mailto:${organization.email}?subject=${encodeURIComponent(subject)}`} className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-gold-400 px-6 py-3 font-semibold text-navy-950 hover:bg-gold-300">{action}</a></div></Section>;
}

function PolicySection({ kind }: { kind: "privacy" | "terms" | "cancellation" }) {
  const titles = { privacy: "Privacy principles", terms: "Use of this website", cancellation: "Donation enquiries and cancellations" };
  const copy = {
    privacy: "We aim to handle enquiries and newsletter information responsibly and only for the purpose for which it is shared. Contact the organization to ask about your information.",
    terms: "Use this website lawfully and do not rely on illustrative program content as a verified claim. Contact the organization before acting on any donation, partnership or program information.",
    cancellation: "Donation enquiries are handled directly by the organization. For a cancellation or refund request, use the official contact details and include the relevant confirmation information.",
  };
  return <Section labelledBy="policy-heading"><article className="mx-auto max-w-3xl"><h2 id="policy-heading" className="text-3xl font-medium sm:text-4xl">{titles[kind]}</h2><p className="mt-6 text-lg leading-relaxed text-ink-600">{copy[kind]}</p><p className="mt-5 leading-relaxed text-ink-500">For questions about this page or to request clarification, contact <a className="font-semibold text-brand-700 underline" href={`mailto:${organization.email}`}>{organization.email}</a>.</p></article></Section>;
}
