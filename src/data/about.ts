// DEMO COPY — replace with the organization's approved text.
// Nothing here describes real history: founding details are deliberately left as placeholders.
import { placeholderImage } from "@/config/images";
import type { IconName } from "@/types";

interface ValueItem {
  title: string;
  description: string;
  icon: IconName;
}

interface ApproachStep {
  title: string;
  description: string;
  icon: IconName;
}

export const aboutContent = {
  hero: {
    title: "About MultiWorkWala",
    description:
      "A community-first initiative working to widen access to learning, healthcare and livelihood opportunities.",
  },
  intro: {
    eyebrow: "Who we are",
    title: "Built with communities, not just for them",
    paragraphs: [
      "MultiWorkWala works with families, local groups, volunteers and institutions to remove the practical barriers that keep people from opportunities that already exist.",
      "Our programs focus on education, healthcare, women's livelihoods, child welfare, community development and the environment, and every one begins by listening.",
    ],
    image: placeholderImage("about-community", "Placeholder artwork of layered hills at dusk"),
  },
  story: {
    title: "Our story",
    paragraphs: [
      "Our work grows from a simple belief: lasting change happens when the people it affects help shape it.",
      "As we grow, we want to share what works, what does not, and what we are learning along the way.",
    ],
    /** Shown to reviewers until the founding story is supplied. */
    placeholderNote:
      "Placeholder copy. Replace this section with the organization's verified founding story, including dates and founders.",
  },
  mission:
    "To widen access to education, healthcare and livelihood opportunities, so that every family can plan for a better future.",
  vision:
    "Communities that are healthy, educated and economically independent, and that lead their own development.",
  values: [
    { title: "Integrity", description: "We do what we say and hold ourselves to clear, honest standards.", icon: "integrity" },
    { title: "Inclusion", description: "Our programs are designed so that everyone can take part.", icon: "inclusion" },
    { title: "Transparency", description: "We share our plans, progress and results openly.", icon: "transparency" },
    { title: "Compassion", description: "We treat every person we work with with dignity and care.", icon: "compassion" },
    { title: "Innovation", description: "We try practical new ideas and keep what works.", icon: "innovation" },
    { title: "Sustainability", description: "We build solutions communities can keep running themselves.", icon: "sustainability" },
  ] satisfies ValueItem[],
  approach: [
    { title: "Listen", description: "We start with community conversations to understand real needs and priorities.", icon: "listen" },
    { title: "Co-design", description: "We shape programs together with residents, partners and volunteers.", icon: "codesign" },
    { title: "Deliver", description: "Trained teams and volunteers run programs close to where people live.", icon: "deliver" },
    { title: "Measure and share", description: "We track results and report what we learn, including what did not work.", icon: "measure" },
  ] satisfies ApproachStep[],
};
