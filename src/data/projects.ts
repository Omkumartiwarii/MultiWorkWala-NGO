// DEMO DATA — REPLACE WITH VERIFIED ORGANIZATION DATA
// Outcomes and milestones below are illustrative placeholders, not real results.
import { placeholderImage } from "@/config/images";
import type { ImageAsset, Milestone, Project, WorkStatus } from "@/types";

const art = (name: string): ImageAsset => placeholderImage(name, "Placeholder artwork for the project gallery");

/** Builds a four-step timeline whose states match the project status. */
function timeline(status: WorkStatus, labels: [string, string, string, string]): Milestone[] {
  const states: Record<WorkStatus, Milestone["state"][]> = {
    completed: ["done", "done", "done", "done"],
    ongoing: ["done", "done", "current", "next"],
    upcoming: ["current", "next", "next", "next"],
  };
  return labels.map((label, index) => ({ label, state: states[status][index] }));
}

export const projects: Project[] = [
  {
    id: "proj-1",
    slug: "community-learning-centre-network",
    title: "Community Learning Centre Network",
    category: "education",
    description:
      "A network of neighbourhood learning centres offering after-school study support, digital skills and mentoring.",
    image: placeholderImage("education-2", "Placeholder artwork for the learning centre project"),
    location: "Delhi NCR",
    status: "ongoing",
    beneficiaries: 480,
    progress: 62,
    featured: true,
    overview:
      "Neighbourhood centres give students a quiet, supported place to study after school, with volunteer mentors and shared computers.",
    objectives: ["Open and equip neighbourhood learning centres", "Recruit and train volunteer mentors", "Track each learner's progress with families"],
    activities: ["Centre set-up with local partners", "Mentor training", "Weekly study and digital skills sessions"],
    impact: ["Students have a consistent place to study", "Families receive regular progress updates", "Volunteers gain structured teaching experience"],
    timeline: timeline("ongoing", ["Community consultation", "Centre set-up", "Learning sessions", "Review and expansion"]),
    duration: "18 months (demo)",
    gallery: [art("education-1"), art("volunteers-1"), art("community-1")],
  },
  {
    id: "proj-2",
    slug: "mobile-health-screening-camps",
    title: "Mobile Health Screening Camps",
    category: "healthcare",
    description:
      "Scheduled camps that bring basic screening, health education and referral guidance to underserved neighbourhoods.",
    image: placeholderImage("healthcare-2", "Placeholder artwork for the health camps project"),
    location: "North India",
    status: "ongoing",
    beneficiaries: 1500,
    progress: 45,
    featured: false,
    overview:
      "A rotating schedule of camps that meets people where they live, offering screening, health talks and clear referral paths.",
    objectives: ["Bring basic screening close to home", "Explain results and next steps clearly", "Build links with nearby clinics"],
    activities: ["Camp planning with local partners", "Screening and health talks", "Referral and follow-up calls"],
    impact: ["More people know their basic health status", "Clearer paths to follow-up care", "Stronger ties with local clinics"],
    timeline: timeline("ongoing", ["Partner clinics identified", "Pilot camps", "Regular camp schedule", "Follow-up review"]),
    duration: "12 months (demo)",
    gallery: [art("healthcare-1"), art("community-2"), art("volunteers-2")],
  },
  {
    id: "proj-3",
    slug: "womens-micro-enterprise-studio",
    title: "Women's Micro-Enterprise Studio",
    category: "women",
    description:
      "A shared workspace with training, tools and mentoring for women starting small home-based enterprises.",
    image: placeholderImage("women-2", "Placeholder artwork for the enterprise studio project"),
    location: "Peri-urban communities",
    status: "upcoming",
    beneficiaries: 200,
    progress: 10,
    featured: true,
    overview:
      "A planned studio where women can learn, share equipment and get mentoring while they build their first small enterprise.",
    objectives: ["Set up a shared, safe workspace", "Provide training and equipment access", "Match each woman with a mentor"],
    activities: ["Site and partner selection", "Equipment and curriculum planning", "First training cohort"],
    impact: ["Expected: lower start-up costs for new enterprises", "Expected: stronger peer networks", "Expected: more confidence in pricing and selling"],
    timeline: timeline("upcoming", ["Planning and site selection", "Studio set-up", "First cohort", "Review"]),
    duration: "12 months, planned (demo)",
    gallery: [art("women-1"), art("events-1"), art("leadership-1")],
  },
  {
    id: "proj-4",
    slug: "safe-play-and-learn-spaces",
    title: "Safe Play & Learn Spaces",
    category: "children",
    description:
      "Child-friendly community spaces with supervised play, early learning activities and caregiver workshops.",
    image: placeholderImage("children-2", "Placeholder artwork for the play spaces project"),
    location: "Urban communities",
    status: "completed",
    beneficiaries: 320,
    progress: 100,
    featured: true,
    overview:
      "Community rooms were turned into safe spaces for play and early learning, with trained facilitators and caregiver sessions.",
    objectives: ["Create safe spaces for young children", "Train facilitators in child safeguarding", "Involve caregivers in early learning"],
    activities: ["Space refurbishment", "Facilitator training", "Weekly play and learning sessions"],
    impact: ["Children have a safe place to play and learn", "Facilitators trained in safeguarding practice", "Caregivers report more confidence supporting learning"],
    timeline: timeline("completed", ["Space identified", "Refurbishment", "Sessions run", "Handover to community"]),
    duration: "9 months (demo)",
    gallery: [art("children-1"), art("education-2"), art("community-1")],
  },
  {
    id: "proj-5",
    slug: "clean-water-sanitation-points",
    title: "Clean Water & Sanitation Points",
    category: "community",
    description:
      "Community-managed water and sanitation points, planned and maintained together with local residents.",
    image: placeholderImage("community-2", "Placeholder artwork for the water and sanitation project"),
    location: "Rural communities",
    status: "ongoing",
    beneficiaries: 900,
    progress: 70,
    featured: false,
    overview:
      "Residents chose the sites and now co-manage each water and sanitation point through a local committee.",
    objectives: ["Improve access to clean water and sanitation", "Set up resident-run maintenance committees", "Share simple hygiene guidance"],
    activities: ["Community site selection", "Construction with local labour", "Committee and maintenance training"],
    impact: ["Shorter trips to reach clean water", "Committees able to maintain facilities", "Better hygiene awareness in households"],
    timeline: timeline("ongoing", ["Community meetings", "Site selection", "Construction", "Handover and training"]),
    duration: "15 months (demo)",
    gallery: [art("community-1"), art("volunteers-1"), art("environment-1")],
  },
  {
    id: "proj-6",
    slug: "green-neighbourhoods-campaign",
    title: "Green Neighbourhoods Campaign",
    category: "environment",
    description:
      "A resident-led campaign on plantation, composting and waste reduction across local neighbourhoods.",
    image: placeholderImage("environment-2", "Placeholder artwork for the green neighbourhoods project"),
    location: "Delhi NCR",
    status: "completed",
    beneficiaries: 2500,
    progress: 100,
    featured: false,
    overview:
      "Neighbours took part in plantation days, composting demonstrations and waste segregation drives that residents continue to run.",
    objectives: ["Encourage waste segregation and composting", "Increase green cover", "Train resident champions"],
    activities: ["Plantation days", "Composting demonstrations", "Champion training"],
    impact: ["Residents continue segregation on their own", "New plantation sites cared for by neighbours", "A network of trained champions"],
    timeline: timeline("completed", ["Resident consultation", "Campaign launch", "Plantation and drives", "Handover to champions"]),
    duration: "6 months (demo)",
    gallery: [art("environment-1"), art("events-2"), art("volunteers-2")],
  },
];
