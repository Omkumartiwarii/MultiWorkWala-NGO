import type { PageMetadata } from "@/types";

export const defaultOgImage = "/images/og-default.svg";

/** Central SEO copy. Each page reads its entry and passes it to <Seo />. */
export const pageMetadata = {
  home: {
    title: "MultiWorkWala | Social Impact Initiative",
    description:
      "MultiWorkWala works with communities to widen access to education, healthcare and livelihood opportunities. Donate, volunteer or partner with us.",
  },
  about: {
    title: "About Us",
    description: "Learn about our mission, vision, values and approach to community-led social impact.",
  },
  programs: {
    title: "Programs",
    description:
      "Explore our programs across education, healthcare, women empowerment, child welfare, community development and the environment.",
  },
  projects: {
    title: "Projects",
    description: "See ongoing, completed and upcoming projects and how they are progressing.",
  },
  impact: { title: "Our Impact", description: "Measured impact across communities, programs and volunteers." },
  events: { title: "Events", description: "Join upcoming community events or browse past ones." },
  news: { title: "News & Stories", description: "News, updates and stories from our programs and communities." },
  gallery: { title: "Gallery", description: "A visual look at our programs, events and communities." },
  donate: { title: "Donate", description: "Support our programs with a one-time or monthly contribution." },
  volunteer: { title: "Volunteer", description: "Share your time and skills. Explore volunteering opportunities." },
  partnership: {
    title: "Partnerships & CSR",
    description: "Partner with us through CSR, sponsorship, employee volunteering and strategic collaboration.",
  },
  team: { title: "Our Team", description: "Meet the people leading and supporting our work." },
  reports: {
    title: "Reports & Transparency",
    description: "Annual, financial and impact reports, policies and documents.",
  },
  contact: { title: "Contact Us", description: "Get in touch with our team for enquiries, support and partnerships." },
  faq: {
    title: "Frequently Asked Questions",
    description: "Answers about our organization, programs, donations, volunteering and partnerships.",
  },
  privacy: { title: "Privacy Policy", description: "How we handle personal information." },
  terms: { title: "Terms & Conditions", description: "Terms for using this website and our services." },
  cancellation: { title: "Cancellation Policy", description: "Our donation cancellation and refund policy." },
  notFound: { title: "Page not found", description: "The page you're looking for couldn't be found." },
} satisfies Record<string, PageMetadata>;
