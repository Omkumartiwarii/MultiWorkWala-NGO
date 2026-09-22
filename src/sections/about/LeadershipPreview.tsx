import { TeamCard } from "@/components/cards/TeamCard";
import { AsyncContent } from "@/components/common/AsyncContent";
import { Reveal } from "@/components/common/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ROUTES } from "@/constants/routes";
import { useAsync } from "@/hooks/useAsync";
import { teamService } from "@/services/teamService";

export function LeadershipPreview() {
  const state = useAsync(() => teamService.getLeadership(4));

  return (
    <Section tone="white" labelledBy="leadership-heading">
      <SectionHeading
        id="leadership-heading"
        title="Leadership"
        description="Profiles below are placeholders. Verified leadership details will replace them."
        action={
          <ButtonLink to={ROUTES.team} variant="outline">
            Meet the team
          </ButtonLink>
        }
      />
      <div className="mt-12">
        <AsyncContent state={state} loadingLabel="Loading leadership…" emptyTitle="Leadership information is not available at the moment." skeletonCount={4}>
          {(members) => (
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {members.map((member, index) => (
                <li key={member.id}>
                  <Reveal delay={index * 0.08} className="h-full">
                    <TeamCard member={member} />
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </AsyncContent>
      </div>
    </Section>
  );
}
