// DEMO DATA — REPLACE WITH VERIFIED ORGANIZATION CONTENT
// Articles below are clearly marked sample editorial content until verified articles are available.
import { placeholderImage } from "@/config/images";
import { daysFromNow } from "@/utils/date";
import type { BlogAuthor, BlogPost } from "@/types";

const editorial: BlogAuthor = { name: "Editorial Team", role: "Communications" };
const programs: BlogAuthor = { name: "Programs Team", role: "Program delivery" };
const volunteers: BlogAuthor = { name: "Volunteer Team", role: "Volunteer engagement" };

export const blogPosts: BlogPost[] = [
  {
    id: "post-1",
    slug: "why-community-led-learning-works",
    title: "Why community-led learning works",
    excerpt:
      "Learning centres shaped by the families who use them tend to be more welcoming and easier to sustain. Here is how we think about designing them.",
    category: "Education",
    image: placeholderImage("education-1", "Teacher helping children learn in a community classroom"),
    author: programs,
    publishedAt: daysFromNow(-6),
    readingMinutes: 5,
    featured: true,
  },
  {
    id: "post-2",
    slug: "inside-a-health-awareness-camp",
    title: "Inside a health awareness camp: what volunteers should know",
    excerpt:
      "A practical look at how a preventive health camp is planned, from registration to referral guidance, and where volunteers help most.",
    category: "Healthcare",
    image: placeholderImage("healthcare-1", "Health worker speaking with a family at a community camp"),
    author: programs,
    publishedAt: daysFromNow(-14),
    readingMinutes: 6,
    featured: false,
  },
  {
    id: "post-3",
    slug: "how-we-plan-to-report-impact-openly",
    title: "How we plan to report our impact openly",
    excerpt: "What we intend to publish, how often, and how you can check our work. A short note on transparency.",
    category: "Organization Updates",
    image: placeholderImage("leadership-1", "Placeholder artwork for an organization update"),
    author: editorial,
    publishedAt: daysFromNow(-21),
    readingMinutes: 4,
    featured: false,
  },
  {
    id: "post-4",
    slug: "five-ways-to-volunteer-your-skills",
    title: "Five ways to volunteer your skills",
    excerpt:
      "From teaching and digital support to fundraising and event help, here are practical ways to contribute whatever your schedule.",
    category: "Volunteer",
    image: placeholderImage("volunteers-2", "Placeholder artwork for a volunteering article"),
    author: volunteers,
    publishedAt: daysFromNow(-30),
    readingMinutes: 4,
    featured: false,
  },
  {
    id: "post-5",
    slug: "greener-neighbourhoods-begin-with-small-habits",
    title: "Greener neighbourhoods begin with small habits",
    excerpt:
      "Segregating waste, sharing tools and planting together: everyday actions that add up when a whole street joins in.",
    category: "Environment",
    image: placeholderImage("environment-2", "Placeholder artwork for an environment article"),
    author: editorial,
    publishedAt: daysFromNow(-38),
    readingMinutes: 5,
    featured: false,
  },
  {
    id: "post-6",
    slug: "listening-first-how-programs-begin",
    title: "Listening first: how programs begin with communities",
    excerpt:
      "Before we design a program, we listen. A look at the questions we ask and how the answers shape our work.",
    category: "Community",
    image: placeholderImage("community-1", "Placeholder artwork for a community article"),
    author: programs,
    publishedAt: daysFromNow(-47),
    readingMinutes: 5,
    featured: false,
  },
  {
    id: "post-7",
    slug: "small-enterprises-big-confidence",
    title: "Small enterprises, big confidence",
    excerpt:
      "Notes on what makes livelihood training effective for women starting their first enterprise, and what support helps most.",
    category: "Women Empowerment",
    image: placeholderImage("women-2", "Placeholder artwork for an impact article"),
    author: programs,
    publishedAt: daysFromNow(-55),
    readingMinutes: 6,
    featured: false,
  },
  {
    id: "post-8",
    slug: "looking-back-volunteer-orientation",
    title: "Looking back at our volunteer orientation",
    excerpt: "A short recap of what the orientation covers, the questions volunteers ask most, and how to get started.",
    category: "Events",
    image: placeholderImage("events-2", "Placeholder artwork for an events article"),
    author: volunteers,
    publishedAt: daysFromNow(-88),
    readingMinutes: 3,
    featured: false,
  },
  {
    id: "post-9",
    slug: "creating-space-for-children-to-learn-and-play",
    title: "Creating space for children to learn and play",
    excerpt:
      "A sample editorial note on designing welcoming spaces where children can learn, play and feel supported by their community.",
    category: "Child Welfare",
    image: placeholderImage("children-2", "Sample artwork for a child welfare article"),
    author: programs,
    publishedAt: daysFromNow(-62),
    readingMinutes: 5,
    featured: false,
  },
];
