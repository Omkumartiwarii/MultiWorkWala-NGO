import { ROUTES } from "./routes";

export interface NavItem {
  label: string;
  to: string;
}

export interface NavColumn {
  title: string;
  items: NavItem[];
}

export const primaryNav: NavItem[] = [
  { label: "About", to: ROUTES.about },
  { label: "Programs", to: ROUTES.programs },
  { label: "Projects", to: ROUTES.projects },
  { label: "Impact", to: ROUTES.impact },
  { label: "Events", to: ROUTES.events },
  { label: "Stories", to: ROUTES.news },
];

export const moreNav: NavItem[] = [
  { label: "Gallery", to: ROUTES.gallery },
  { label: "Team", to: ROUTES.team },
  { label: "Reports", to: ROUTES.reports },
  { label: "Partnership", to: ROUTES.partnership },
  { label: "Volunteer", to: ROUTES.volunteer },
  { label: "FAQ", to: ROUTES.faq },
  { label: "Contact", to: ROUTES.contact },
];

const programLink = (label: string, category: string): NavItem => ({
  label,
  to: `${ROUTES.programs}?category=${category}`,
});

export const footerColumns: NavColumn[] = [
  {
    title: "Organization",
    items: [
      { label: "About", to: ROUTES.about },
      { label: "Mission", to: `${ROUTES.about}#mission` },
      { label: "Impact", to: ROUTES.impact },
      { label: "Team", to: ROUTES.team },
    ],
  },
  {
    title: "Programs",
    items: [
      programLink("Education", "education"),
      programLink("Healthcare", "healthcare"),
      programLink("Women Empowerment", "women"),
      programLink("Child Welfare", "children"),
      programLink("Community Development", "community"),
    ],
  },
  {
    title: "Get involved",
    items: [
      { label: "Donate", to: ROUTES.donate },
      { label: "Volunteer", to: ROUTES.volunteer },
      { label: "Partnership", to: ROUTES.partnership },
      { label: "Events", to: ROUTES.events },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "News", to: ROUTES.news },
      { label: "Gallery", to: ROUTES.gallery },
      { label: "Reports", to: ROUTES.reports },
      { label: "FAQ", to: ROUTES.faq },
    ],
  },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", to: ROUTES.privacy },
  { label: "Terms", to: ROUTES.terms },
  { label: "Cancellation Policy", to: ROUTES.cancellation },
];
