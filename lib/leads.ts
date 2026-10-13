import { z } from "zod";

const trimmed = (max: number) => z.string().trim().max(max);
const optional = (max: number) => trimmed(max).optional().default("");

export const SELLER_SITUATIONS = [
  "Shutting down / wound down",
  "Acquired or acqui-hired",
  "In bankruptcy / restructuring",
  "Operating company",
  "Advisor, trustee or investor",
] as const;

export const DATA_TYPES = [
  "Slack / Teams",
  "Email",
  "Jira / Linear",
  "Code repositories",
  "Docs / Drive / Notion",
  "Support tickets / CRM",
  "Video",
  "Audio / calls",
  "Images",
  "Domain / expert data",
  "Other",
] as const;

export const BUYER_TYPES = [
  "Frontier AI lab",
  "Data / RL vendor",
  "AI startup",
  "Enterprise AI team",
  "Research institution",
] as const;

export const BUDGETS = [
  "Under $50K",
  "$50K – $250K",
  "$250K – $1M",
  "$1M+",
  "Not sure yet",
] as const;

const base = {
  name: trimmed(120).min(1, "Required"),
  email: z.string().trim().email("Enter a valid email").max(200),
  company: trimmed(160).min(1, "Required"),
  role: optional(120),
  notes: optional(4000),
  // Spam traps: honeypot must stay empty, form must take > 2s to fill.
  website: z.string().max(500).optional().default(""),
  startedAt: z.coerce.number().optional(),
};

export const sellerSchema = z.object({
  type: z.literal("seller"),
  ...base,
  situation: z.enum(SELLER_SITUATIONS, { error: "Required" }),
  dataTypes: z.array(z.enum(DATA_TYPES)).min(1, "Pick at least one"),
  headcount: optional(40),
  yearsOfData: optional(40),
});

export const buyerSchema = z.object({
  type: z.literal("buyer"),
  ...base,
  buyerType: z.enum(BUYER_TYPES, { error: "Required" }),
  dataTypes: z.array(z.enum(DATA_TYPES)).min(1, "Pick at least one"),
  budget: z.enum(BUDGETS, { error: "Required" }),
  timeline: optional(80),
});

export const leadSchema = z.discriminatedUnion("type", [sellerSchema, buyerSchema]);

export type Lead = z.infer<typeof leadSchema>;
