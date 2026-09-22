import { CTASection } from "@/components/common/CTASection";
import { ROUTES } from "@/constants/routes";
import { volunteerCtaContent as content } from "@/data/homeContent";

export function VolunteerCTA() {
  return (
    <CTASection
      id="volunteer-heading"
      title={content.title}
      description={content.description}
      primary={{ label: "Become a Volunteer", to: ROUTES.volunteer }}
      secondary={{ label: "Explore Opportunities", to: `${ROUTES.volunteer}#opportunities` }}
    />
  );
}
