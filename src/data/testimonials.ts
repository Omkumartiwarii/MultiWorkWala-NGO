// DEMO DATA — FICTIONAL, ILLUSTRATIVE STORIES.
// Replace with verified, consented beneficiary stories and set `isDemo` to false.
import { placeholderImage } from "@/config/images";
import type { Testimonial } from "@/types";

export const testimonials: Testimonial[] = [
  {
    id: "story-1",
    slug: "asha-tailoring-enterprise",
    name: "Asha K.",
    location: "Delhi NCR",
    program: "Women Empowerment & Skills",
    programSlug: "women-empowerment-skills",
    story:
      "After the skills training, Asha began taking tailoring orders from her neighbourhood. Today the income helps cover her children's school costs.",
    image: placeholderImage("women-2", "Placeholder artwork for a women empowerment story"),
    isDemo: true,
  },
  {
    id: "story-2",
    slug: "rohan-digital-learning",
    name: "Rohan, 15",
    location: "North India",
    program: "Education & Digital Learning",
    programSlug: "education-digital-learning-initiative",
    story:
      "Weekly sessions at the learning centre helped Rohan catch up in mathematics, and gave him the confidence to try his first coding lesson.",
    image: placeholderImage("education-2", "Placeholder artwork for an education story"),
    isDemo: true,
  },
  {
    id: "story-3",
    slug: "sunita-health-screening",
    name: "Sunita D.",
    location: "Noida",
    program: "Community Health & Wellness",
    programSlug: "community-health-wellness",
    story: "A screening camp near her home helped Sunita spot a health concern early and connect with follow-up care.",
    image: placeholderImage("healthcare-2", "Placeholder artwork for a health story"),
    isDemo: true,
  },
];
