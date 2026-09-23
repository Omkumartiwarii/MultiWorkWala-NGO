import { ArrowUpRight } from "lucide-react";
import { SiteImage } from "@/components/common/SiteImage";
import type { TeamMember } from "@/types";

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="group h-full">
      <div className="overflow-hidden rounded-2xl">
        <SiteImage
          image={member.image}
          loading="lazy"
          decoding="async"
          className="aspect-4/5 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <h3 className="mt-5 text-xl font-medium">{member.name}</h3>
      <p className="mt-1 text-sm font-semibold text-brand-700">{member.designation}</p>
      <p className="mt-3 line-clamp-3 leading-relaxed text-ink-500">{member.bio}</p>
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex min-h-8 items-center gap-1 text-sm font-semibold text-navy-900 hover:underline"
        >
          LinkedIn profile
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      )}
    </article>
  );
}
