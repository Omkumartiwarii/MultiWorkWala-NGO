import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { organization } from "@/config/organization";
import { socialLabels, socialLinks, type SocialPlatform } from "@/config/social";
import { footerColumns, legalNav } from "@/constants/navigation";
import { Logo } from "./Logo";

const linkClass = "inline-flex min-h-8 items-center text-navy-200 transition-colors hover:text-white";

export function Footer() {
  const platforms = Object.keys(socialLinks) as SocialPlatform[];

  return (
    <footer className="bg-navy-950 text-navy-200">
      <Container className="grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Logo tone="dark" />
          <p className="mt-6 max-w-sm leading-relaxed">
            {organization.tagline} A community-first initiative working to widen access to learning, healthcare and
            livelihoods.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:col-span-8 lg:pl-8">
          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="font-sans text-base font-semibold text-white">{column.title}</h2>
              <ul className="mt-4 space-y-1 text-sm">
                {column.items.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-10">
          <h2 className="sr-only">Contact</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <address className="flex gap-3 text-sm not-italic">
              <MapPin className="mt-0.5 size-5 shrink-0 text-gold-300" aria-hidden="true" />
              <span>
                {organization.address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </address>
            <a
              href={organization.phoneHref}
              className="flex items-start gap-3 text-sm transition-colors hover:text-white"
            >
              <Phone className="mt-0.5 size-5 shrink-0 text-gold-300" aria-hidden="true" />
              {organization.phone}
            </a>
            <a
              href={`mailto:${organization.email}`}
              className="flex items-start gap-3 text-sm transition-colors hover:text-white"
            >
              <Mail className="mt-0.5 size-5 shrink-0 text-gold-300" aria-hidden="true" />
              {organization.email}
            </a>
            <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm" aria-label="Social media (placeholder links)">
              {platforms.map((platform) => (
                <li key={platform}>
                  <a
                    href={socialLinks[platform]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-8 items-center gap-1 transition-colors hover:text-white"
                  >
                    {socialLabels[platform]}
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {organization.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {legalNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
