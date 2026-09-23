import type { Partner, PartnerCategory } from "@/types";

export const partnerCategories: { id: PartnerCategory; label: string }[] = [
  { id: "csr", label: "CSR partners" },
  { id: "institutional", label: "Institutional partners" },
  { id: "community", label: "Community partners" },
  { id: "supporting", label: "Supporting organizations" },
];

export const partners: Partner[] = [];
