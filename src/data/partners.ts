// PLACEHOLDER DATA — these are NOT real partners. Replace with verified partner logos.
import type { Partner, PartnerCategory } from "@/types";

export const partnerCategories: { id: PartnerCategory; label: string }[] = [
  { id: "csr", label: "CSR partners" },
  { id: "institutional", label: "Institutional partners" },
  { id: "community", label: "Community partners" },
  { id: "supporting", label: "Supporting organizations" },
];

const placeholders = (category: PartnerCategory, label: string): Partner[] =>
  [1, 2, 3].map((n) => ({ id: `${category}-${n}`, name: `${label} logo ${n}`, category }));

export const partners: Partner[] = [
  ...placeholders("csr", "CSR partner"),
  ...placeholders("institutional", "Institution"),
  ...placeholders("community", "Community partner"),
  ...placeholders("supporting", "Supporter"),
];
