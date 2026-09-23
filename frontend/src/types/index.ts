/* Shared domain types. Each maps 1:1 to a future API resource. */

export type IconName =
  | "graduation"
  | "health"
  | "women"
  | "children"
  | "community"
  | "environment"
  | "lives"
  | "communities"
  | "projects"
  | "volunteers"
  | "programs"
  | "partners"
  | "integrity"
  | "inclusion"
  | "transparency"
  | "compassion"
  | "innovation"
  | "sustainability"
  | "listen"
  | "codesign"
  | "deliver"
  | "measure";

export type FocusAreaId = "education" | "healthcare" | "women" | "children" | "community" | "environment";

export type WorkStatus = "ongoing" | "completed" | "upcoming";

export interface ImageAsset {
  src: string;
  alt: string;
  fallbackSrc?: string;
  objectPosition?: string;
}

export interface FocusArea {
  id: FocusAreaId;
  title: string;
  /** Short label for filter chips. */
  shortTitle: string;
  description: string;
  icon: IconName;
}

export interface ImpactStat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  icon: IconName;
}

export interface LabelledStat {
  label: string;
  value: number;
  suffix?: string;
}

export interface Program {
  id: string;
  slug: string;
  title: string;
  category: FocusAreaId;
  /** Short summary used on cards. */
  description: string;
  image: ImageAsset;
  location: string;
  beneficiaries: number;
  status: WorkStatus;
  impactHighlight: string;
  featured: boolean;
  /** Only verified operational figures should be shown publicly. */
  verified?: boolean;
  /* Detail page fields */
  overview: string;
  objectives: string[];
  targetBeneficiaries: string;
  approach: string;
  activities: string[];
  stats: LabelledStat[];
  gallery: ImageAsset[];
}

export interface Milestone {
  label: string;
  state: "done" | "current" | "next";
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: FocusAreaId;
  description: string;
  image: ImageAsset;
  location: string;
  status: WorkStatus;
  beneficiaries: number;
  /** 0–100 */
  progress: number;
  featured: boolean;
  /** Only verified operational figures should be shown publicly. */
  verified?: boolean;
  /* Detail page fields */
  overview: string;
  objectives: string[];
  activities: string[];
  /** Outcomes achieved, or expected outcomes for upcoming projects. */
  impact: string[];
  timeline: Milestone[];
  duration: string;
  gallery: ImageAsset[];
}

/** Named NgoEvent to avoid clashing with the DOM `Event` type. */
export interface NgoEvent {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  image: ImageAsset;
  /** ISO 8601 start date-time */
  startsAt: string;
  /** Human-readable time range, e.g. "10:00 AM – 2:00 PM" */
  time: string;
  location: string;
  organizer: string;
}

export type BlogCategory =
  | "Impact"
  | "Community"
  | "Education"
  | "Healthcare"
  | "Women Empowerment"
  | "Child Welfare"
  | "Environment"
  | "Volunteer"
  | "Events"
  | "Organization Updates";

export interface BlogAuthor {
  name: string;
  role: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  image: ImageAsset;
  author: BlogAuthor;
  /** ISO 8601 */
  publishedAt: string;
  readingMinutes: number;
  featured: boolean;
}

export interface Testimonial {
  id: string;
  slug: string;
  name: string;
  location: string;
  program: string;
  story: string;
  /** Slug of the related program, if any. */
  programSlug?: string;
  image: ImageAsset;
  /** True while the story is illustrative. Set to false only for verified stories. */
  isDemo: boolean;
}

export type PartnerCategory = "csr" | "institutional" | "community" | "supporting";

export interface Partner {
  id: string;
  name: string;
  category: PartnerCategory;
  logo?: string;
  website?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  bio: string;
  image: ImageAsset;
  linkedin?: string;
}

export type GalleryCategory = "programs" | "events" | "community" | "team" | "campaigns";

export interface GalleryItem {
  id: string;
  image: ImageAsset;
  caption: string;
  category: GalleryCategory;
}

export type ReportType = "annual" | "financial" | "impact" | "registration" | "certificate" | "policy";

export interface Report {
  id: string;
  title: string;
  year: number;
  type: ReportType;
  description: string;
  fileUrl: string;
}

export type DonationFrequency = "one-time" | "monthly";

export interface Donation {
  id?: number;
  amount: number;
  currency?: string;
  frequency: DonationFrequency;
  purpose?: string;
  anonymous?: boolean;
  message?: string;
  orderId?: string;
  paymentId?: string;
  status?: "pending" | "success" | "failed" | "cancelled";
  created_at?: string;
  updated_at?: string;
  donor: { fullName: string; email: string; phone?: string };
}

export interface VolunteerApplication {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  interests: string[];
  skills: string;
  availability: string;
  experience: string;
  message: string;
}

export interface NewsletterSubscription {
  name: string;
  email: string;
}

export interface ContactEnquiry {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface PageMetadata {
  title: string;
  description: string;
  image?: string;
}
