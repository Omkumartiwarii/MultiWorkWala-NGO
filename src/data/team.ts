// PLACEHOLDER DATA — NOT REAL PEOPLE.
// Do not copy leadership from the existing commercial MultiWorkWala website unless the
// organization confirms those individuals lead this NGO/Trust. Replace with verified profiles.
import { placeholderImage } from "@/config/images";
import type { TeamMember } from "@/types";

const portrait = (name: string) => placeholderImage(name, "Placeholder artwork standing in for a team photo");

export const teamMembers: TeamMember[] = [
  {
    id: "team-1",
    name: "Name to be confirmed",
    designation: "Chairperson / Trustee",
    bio: "[BIO] Replace with a short, verified biography covering background, role and focus areas.",
    image: portrait("leadership-1"),
  },
  {
    id: "team-2",
    name: "Name to be confirmed",
    designation: "Managing Trustee",
    bio: "[BIO] Replace with a short, verified biography covering background, role and focus areas.",
    image: portrait("leadership-2"),
  },
  {
    id: "team-3",
    name: "Name to be confirmed",
    designation: "Director, Programs",
    bio: "[BIO] Replace with a short, verified biography covering background, role and focus areas.",
    image: portrait("education-2"),
  },
  {
    id: "team-4",
    name: "Name to be confirmed",
    designation: "Head of Partnerships",
    bio: "[BIO] Replace with a short, verified biography covering background, role and focus areas.",
    image: portrait("community-2"),
  },
];
