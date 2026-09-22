// DEMO DATA — REPLACE WITH VERIFIED ORGANIZATION DATA
// Dates are generated relative to today so the demo always shows upcoming and past events.
import { placeholderImage } from "@/config/images";
import { daysFromNow } from "@/utils/date";
import type { NgoEvent } from "@/types";

export const events: NgoEvent[] = [
  {
    id: "evt-1",
    slug: "community-education-drive",
    title: "Community Education Drive",
    description:
      "A day of learning stations, career conversations and enrolment support for students and families, with volunteers on hand to help.",
    category: "Education",
    image: placeholderImage("events-1", "Placeholder artwork for the education drive event"),
    startsAt: daysFromNow(18),
    time: "10:00 AM – 2:00 PM",
    location: "Delhi NCR (venue to be announced)",
    organizer: "Programs Team",
  },
  {
    id: "evt-2",
    slug: "healthcare-awareness-camp",
    title: "Healthcare Awareness Camp",
    description: "Preventive health awareness sessions, basic screening and guidance on where to find follow-up care.",
    category: "Healthcare",
    image: placeholderImage("healthcare-2", "Placeholder artwork for the health camp event"),
    startsAt: daysFromNow(34),
    time: "9:00 AM – 1:00 PM",
    location: "Noida (venue to be announced)",
    organizer: "Health Programs Team",
  },
  {
    id: "evt-3",
    slug: "women-entrepreneurship-workshop",
    title: "Women Entrepreneurship Workshop",
    description:
      "A hands-on workshop on starting small, with sessions on budgeting, sourcing and reaching first customers.",
    category: "Women Empowerment",
    image: placeholderImage("women-1", "Placeholder artwork for the workshop event"),
    startsAt: daysFromNow(52),
    time: "11:00 AM – 3:00 PM",
    location: "Delhi NCR (venue to be announced)",
    organizer: "Livelihoods Team",
  },
  {
    id: "evt-4",
    slug: "environment-awareness-campaign",
    title: "Environment Awareness Campaign",
    description: "A neighbourhood walk and clean-up focused on waste segregation and plantation.",
    category: "Environment",
    image: placeholderImage("environment-1", "Placeholder artwork for the environment campaign"),
    startsAt: daysFromNow(-40),
    time: "8:00 AM – 12:00 PM",
    location: "Delhi NCR",
    organizer: "Programs Team",
  },
  {
    id: "evt-5",
    slug: "volunteer-orientation-program",
    title: "Volunteer Orientation Program",
    description: "An introduction to our programs, volunteer roles and ways of working with communities.",
    category: "Volunteer",
    image: placeholderImage("volunteers-1", "Placeholder artwork for the volunteer orientation"),
    startsAt: daysFromNow(-90),
    time: "4:00 PM – 6:00 PM",
    location: "Online",
    organizer: "Volunteer Team",
  },
];
