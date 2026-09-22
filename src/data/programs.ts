// DEMO DATA — REPLACE WITH VERIFIED ORGANIZATION DATA
// All figures, locations and descriptions below are illustrative placeholders.
import { placeholderImage } from "@/config/images";
import type { ImageAsset, Program } from "@/types";

const art = (name: string): ImageAsset => placeholderImage(name, "Placeholder artwork for the program gallery");

export const programs: Program[] = [
  {
    id: "prog-1",
    slug: "education-digital-learning-initiative",
    title: "Education & Digital Learning Initiative",
    category: "education",
    description:
      "Community learning centres, study support and digital literacy sessions that help students stay in school and build future-ready skills.",
    image: placeholderImage("education-1", "Placeholder artwork for the education program"),
    location: "North India",
    beneficiaries: 1200,
    status: "ongoing",
    impactHighlight: "Stronger learning access for first-generation students",
    featured: true,
    overview:
      "The program runs community learning centres where students receive homework support, catch-up sessions and digital literacy classes. Trained volunteers and local educators work together so learning continues beyond school hours.",
    objectives: [
      "Strengthen foundational reading and numeracy",
      "Build basic digital skills for students and young adults",
      "Help families keep children enrolled in school",
    ],
    targetBeneficiaries: "Children and young people aged 6–18 from families with limited access to learning support.",
    approach:
      "Centres are set up with local partners and led by trained educators. Sessions are short, regular and matched to each learner's level, with progress shared openly with families.",
    activities: ["After-school study support", "Digital literacy labs", "Reading circles", "Career conversations with volunteers"],
    stats: [
      { label: "Learners supported", value: 1200, suffix: "+" },
      { label: "Learning centres", value: 12 },
      { label: "Volunteer educators", value: 90, suffix: "+" },
    ],
    gallery: [art("education-2"), art("community-2"), art("volunteers-1")],
  },
  {
    id: "prog-2",
    slug: "community-health-wellness",
    title: "Community Health & Wellness",
    category: "healthcare",
    description:
      "Health awareness camps, preventive screening and referral support that bring essential care closer to families.",
    image: placeholderImage("healthcare-1", "Placeholder artwork for the healthcare program"),
    location: "Delhi NCR",
    beneficiaries: 3400,
    status: "ongoing",
    impactHighlight: "Earlier detection and better health awareness",
    featured: true,
    overview:
      "Regular camps and awareness sessions bring basic screening and health information into neighbourhoods, with clear guidance on where to go for follow-up care.",
    objectives: [
      "Raise awareness of preventive health",
      "Make basic screening easier to reach",
      "Connect people with follow-up care",
    ],
    targetBeneficiaries: "Families in underserved neighbourhoods, with a focus on women, children and older adults.",
    approach:
      "Camps are planned with local health professionals and community volunteers. Each visit pairs screening with education and a written next-step plan for the family.",
    activities: ["Health awareness sessions", "Basic screening camps", "Referral and follow-up guidance", "Nutrition and hygiene workshops"],
    stats: [
      { label: "People reached", value: 3400, suffix: "+" },
      { label: "Camps held", value: 40, suffix: "+" },
      { label: "Community health volunteers", value: 60, suffix: "+" },
    ],
    gallery: [art("healthcare-2"), art("community-1"), art("volunteers-2")],
  },
  {
    id: "prog-3",
    slug: "women-empowerment-skills",
    title: "Women Empowerment & Skills",
    category: "women",
    description:
      "Skills training, mentoring and enterprise support that help women build confidence and independent livelihoods.",
    image: placeholderImage("women-1", "Placeholder artwork for the women empowerment program"),
    location: "Rural and peri-urban communities",
    beneficiaries: 850,
    status: "ongoing",
    impactHighlight: "New pathways to income and independence",
    featured: true,
    overview:
      "Women join practical skills courses, then receive mentoring and small-business guidance to turn new skills into steady income.",
    objectives: [
      "Build marketable and digital skills",
      "Improve financial confidence and literacy",
      "Support women to start and grow small enterprises",
    ],
    targetBeneficiaries: "Women and girls seeking skills and income opportunities.",
    approach:
      "Training is offered close to home and at times that fit family responsibilities. Mentors stay in touch after each course to help with first customers, pricing and savings.",
    activities: ["Skills training courses", "Financial literacy workshops", "Mentoring circles", "Micro-enterprise support"],
    stats: [
      { label: "Women trained", value: 850, suffix: "+" },
      { label: "Enterprises started", value: 120, suffix: "+" },
      { label: "Mentors", value: 45, suffix: "+" },
    ],
    gallery: [art("women-2"), art("events-2"), art("leadership-2")],
  },
  {
    id: "prog-4",
    slug: "child-development-welfare",
    title: "Child Development & Welfare",
    category: "children",
    description:
      "Safe learning spaces, nutrition awareness and development activities for children and their caregivers.",
    image: placeholderImage("children-1", "Placeholder artwork for the child welfare program"),
    location: "Urban communities",
    beneficiaries: 950,
    status: "ongoing",
    impactHighlight: "Safer, healthier early years",
    featured: false,
    overview:
      "Child-friendly spaces offer supervised play, early learning and nutrition guidance, while caregiver sessions help families support development at home.",
    objectives: [
      "Provide safe spaces for play and early learning",
      "Improve nutrition awareness among caregivers",
      "Strengthen child protection awareness in the community",
    ],
    targetBeneficiaries: "Children aged 3–12 and their caregivers.",
    approach:
      "Spaces are run by trained facilitators with clear child-safeguarding practices. Caregivers are involved throughout, so support continues at home.",
    activities: ["Supervised play and early learning", "Nutrition awareness sessions", "Caregiver workshops", "Child safety awareness"],
    stats: [
      { label: "Children supported", value: 950, suffix: "+" },
      { label: "Safe learning spaces", value: 8 },
      { label: "Caregivers reached", value: 600, suffix: "+" },
    ],
    gallery: [art("children-2"), art("education-2"), art("community-2")],
  },
  {
    id: "prog-5",
    slug: "sustainable-community-development",
    title: "Sustainable Community Development",
    category: "community",
    description:
      "Locally led sanitation, infrastructure and livelihood initiatives built with community participation.",
    image: placeholderImage("community-1", "Placeholder artwork for the community development program"),
    location: "Rural communities",
    beneficiaries: 2100,
    status: "ongoing",
    impactHighlight: "Community-owned solutions that last",
    featured: false,
    overview:
      "Residents identify their own priorities, and the program supports them to plan, build and maintain shared facilities and livelihood activities.",
    objectives: [
      "Improve access to water and sanitation",
      "Support locally led livelihood activities",
      "Build community capacity to maintain what is built",
    ],
    targetBeneficiaries: "Residents of rural communities with limited basic infrastructure.",
    approach:
      "Every project starts with community meetings. Local committees co-own decisions and maintenance, so facilities keep working after the initial build.",
    activities: ["Community planning meetings", "Water and sanitation points", "Livelihood group support", "Maintenance training"],
    stats: [
      { label: "People benefiting", value: 2100, suffix: "+" },
      { label: "Community-led projects", value: 18 },
      { label: "Communities engaged", value: 9 },
    ],
    gallery: [art("community-2"), art("volunteers-1"), art("environment-2")],
  },
  {
    id: "prog-6",
    slug: "environmental-awareness-action",
    title: "Environmental Awareness & Action",
    category: "environment",
    description:
      "Awareness drives, plantation and waste-reduction campaigns that encourage responsible everyday habits.",
    image: placeholderImage("environment-1", "Placeholder artwork for the environment program"),
    location: "Delhi NCR",
    beneficiaries: 5000,
    status: "upcoming",
    impactHighlight: "Cleaner, greener neighbourhoods",
    featured: false,
    overview:
      "A planned program of neighbourhood campaigns on waste segregation, plantation and responsible resource use, led by residents and volunteers.",
    objectives: [
      "Encourage waste segregation and reduction",
      "Increase green cover through community plantation",
      "Build a network of resident environment champions",
    ],
    targetBeneficiaries: "Residents of urban and peri-urban neighbourhoods.",
    approach:
      "Campaigns are designed with resident groups and run through simple, repeatable actions that neighbours can continue on their own.",
    activities: ["Neighbourhood clean-up drives", "Plantation campaigns", "Waste segregation workshops", "School awareness sessions"],
    stats: [
      { label: "Target: people reached", value: 5000, suffix: "+" },
      { label: "Target: neighbourhoods", value: 10 },
      { label: "Target: volunteers", value: 300, suffix: "+" },
    ],
    gallery: [art("environment-2"), art("events-1"), art("volunteers-2")],
  },
];
