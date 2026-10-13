import "server-only";
import type { Lead } from "./leads";

// Writes inbound leads into the DataDrop Attio workspace:
//   seller → Person + Company (supplier) + Deal (stage "Lead") + note
//   buyer  → Person + Company (broker)   + Brief (status "Open") + note

const API = process.env.ATTIO_API_URL ?? "https://api.attio.com/v2";

const FREE_MAIL = new Set([
  "gmail.com", "googlemail.com", "outlook.com", "hotmail.com", "live.com", "yahoo.com", "icloud.com",
  "me.com", "proton.me", "protonmail.com", "aol.com", "gmx.com", "hey.com", "fastmail.com",
]);

// Website data types → Attio Brief "Data categories" options.
const CATEGORY: Record<string, string[]> = {
  "Slack / Teams": ["Workspace comms"],
  Email: ["Workspace comms"],
  "Jira / Linear": ["Tickets/ITSM"],
  "Code repositories": ["Code & repos"],
  "Docs / Drive / Notion": ["Documents/knowledge base"],
  "Support tickets / CRM": ["Support transcripts", "CRM/sales"],
  Video: ["Video"],
  "Audio / calls": ["Audio/speech"],
  Images: ["Other"],
  "Domain / expert data": ["Other"],
  Other: ["Other"],
};

type Values = Record<string, unknown>;

async function attio<T = { data: { id: { record_id: string } } }>(method: string, path: string, body: unknown): Promise<T> {
  const res = await fetch(API + path, {
    method,
    headers: { Authorization: `Bearer ${process.env.ATTIO_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Attio ${method} ${path} → ${res.status}: ${await res.text()}`);
  return res.json() as Promise<T>;
}

const assertRecord = (object: string, matchOn: string, values: Values) =>
  attio("PUT", `/objects/${object}/records?matching_attribute=${matchOn}`, { data: { values } }).then((r) => r.data.id.record_id);

const createRecord = (object: string, values: Values) =>
  attio("POST", `/objects/${object}/records`, { data: { values } }).then((r) => r.data.id.record_id);

const ref = (object: string, id: string) => [{ target_object: object, target_record_id: id }];

function splitName(full: string) {
  const [first, ...rest] = full.trim().split(/\s+/);
  return { first_name: first ?? "", last_name: rest.join(" "), full_name: full.trim() };
}

function summary(lead: Lead) {
  const rows: [string, string][] = [
    ["Type", lead.type === "seller" ? "Seller (supply)" : "Buyer (demand)"],
    ["Name", lead.name],
    ["Email", lead.email],
    ["Company", lead.company],
    ["Role", lead.role],
    ["Data", lead.dataTypes.join(", ")],
    ...(lead.type === "seller"
      ? ([["Situation", lead.situation], ["Peak headcount", lead.headcount], ["Years of data", lead.yearsOfData]] as [string, string][])
      : ([["Buyer type", lead.buyerType], ["Budget", lead.budget], ["Timeline", lead.timeline]] as [string, string][])),
    ["Notes", lead.notes],
  ];
  return rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");
}

export function attioConfigured() {
  return Boolean(process.env.ATTIO_API_KEY && process.env.ATTIO_OWNER_EMAIL);
}

export async function pushLeadToAttio(lead: Lead, source: string) {
  const domain = lead.email.split("@")[1]?.toLowerCase() ?? "";

  const companyId = FREE_MAIL.has(domain)
    ? await createRecord("companies", { name: lead.company })
    : await assertRecord("companies", "domains", { domains: [domain], name: lead.company });

  const personValues: Values = {
    email_addresses: [lead.email],
    name: [splitName(lead.name)],
    company: ref("companies", companyId),
  };
  if (lead.role) personValues.job_title = lead.role;
  const personId = await assertRecord("people", "email_addresses", personValues);

  const date = new Date().toISOString().slice(0, 10);
  let parent: { object: string; id: string };

  if (lead.type === "seller") {
    const id = await createRecord("deals", {
      name: `${lead.company} · inbound (${date})`,
      stage: "Lead",
      owner: process.env.ATTIO_OWNER_EMAIL,
      associated_company: ref("companies", companyId),
      associated_people: ref("people", personId),
    });
    parent = { object: "deals", id };
  } else {
    const categories = [...new Set(lead.dataTypes.flatMap((t) => CATEGORY[t] ?? ["Other"]))];
    const id = await createRecord("briefs", {
      name: `${lead.company}: ${lead.dataTypes.join(", ")}`.slice(0, 200),
      broker: ref("companies", companyId),
      data_categories: categories,
      description: [lead.notes, lead.timeline && `Timeline: ${lead.timeline}`, `Buyer type: ${lead.buyerType}`].filter(Boolean).join("\n\n"),
      budget_signal: lead.budget,
      brief_status: "Open",
      speculative: false,
      source_link: source,
    });
    parent = { object: "briefs", id };
  }

  await attio("POST", "/notes", {
    data: {
      parent_object: parent.object,
      parent_record_id: parent.id,
      title: `Website ${lead.type} form · ${lead.name}`,
      format: "plaintext",
      content: `${summary(lead)}\n\nSource: ${source || "website"}`,
    },
  });

  return parent;
}
