"use client";

import { useRef, useState } from "react";
import { BUDGETS, BUYER_TYPES, DATA_TYPES, SELLER_SITUATIONS } from "@/lib/leads";

type Kind = "seller" | "buyer";
type Errors = Record<string, string[] | undefined>;

const input =
  "w-full rounded-xl border border-line bg-paper px-4 py-3 text-[15px] outline-none transition placeholder:text-muted focus:border-cobalt focus:bg-white focus:ring-4 focus:ring-cobalt/10";

export function LeadForm({ kind }: { kind: Kind }) {
  const startedAt = useRef(Date.now());
  const [types, setTypes] = useState<string[]>([]);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = { ...Object.fromEntries(fd.entries()), type: kind, dataTypes: types, startedAt: startedAt.current };

    setState("sending");
    setErrors({});
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const out = await res.json();
      if (!res.ok || !out.ok) {
        setErrors(out.issues ?? {});
        setMessage(out.error ?? "Something went wrong.");
        setState("error");
        return;
      }
      setState("done");
    } catch {
      setMessage("Network error. Please try again.");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-3xl border border-line bg-card p-10 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-lime text-2xl">✓</div>
        <h3 className="mt-6 text-2xl font-semibold tracking-tight">Got it. We&apos;ll be in touch within 48 hours.</h3>
        <p className="mt-3 text-ink-2">
          {kind === "seller"
            ? "Until then, don't delete any workspaces or exports. Deleted history can't be sold."
            : "We'll come back with matching supply and next steps on samples."}
        </p>
      </div>
    );
  }

  const err = (k: string) => errors[k]?.[0];

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-3xl border border-line bg-card p-6 sm:p-8">
      {/* honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" error={err("name")}>
          <input name="name" required className={input} autoComplete="name" />
        </Field>
        <Field label="Work email" error={err("email")}>
          <input name="email" type="email" required className={input} autoComplete="email" />
        </Field>
        <Field label={kind === "seller" ? "Company (or former company)" : "Organization"} error={err("company")}>
          <input name="company" required className={input} autoComplete="organization" />
        </Field>
        <Field label="Your role" optional>
          <input name="role" className={input} placeholder={kind === "seller" ? "Founder, GC, trustee…" : "Data lead, researcher…"} />
        </Field>

        {kind === "seller" ? (
          <>
            <Field label="Situation" error={err("situation")} wide>
              <Select name="situation" options={SELLER_SITUATIONS} />
            </Field>
            <Field label="Peak headcount" optional>
              <input name="headcount" className={input} placeholder="e.g. 45" inputMode="numeric" />
            </Field>
            <Field label="Years of data" optional>
              <input name="yearsOfData" className={input} placeholder="e.g. 2017–2025" />
            </Field>
          </>
        ) : (
          <>
            <Field label="You are a…" error={err("buyerType")}>
              <Select name="buyerType" options={BUYER_TYPES} />
            </Field>
            <Field label="Budget" error={err("budget")}>
              <Select name="budget" options={BUDGETS} />
            </Field>
            <Field label="Timeline" optional wide>
              <input name="timeline" className={input} placeholder="e.g. Need samples this quarter" />
            </Field>
          </>
        )}

        <Field label={kind === "seller" ? "What data do you have?" : "What data do you need?"} error={err("dataTypes")} wide group>
          <div className="flex flex-wrap gap-2">
            {DATA_TYPES.map((t) => {
              const on = types.includes(t);
              return (
                <button
                  key={t}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setTypes((s) => (on ? s.filter((x) => x !== t) : [...s, t]))}
                  className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
                    on ? "border-ink bg-ink text-paper" : "border-line bg-paper text-ink-2 hover:border-ink"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </Field>

        <Field label={kind === "seller" ? "Anything else?" : "Describe the request"} optional wide>
          <textarea
            name="notes"
            rows={4}
            className={input}
            placeholder={
              kind === "seller"
                ? "Tools used, whether exports still exist, any deadlines (dissolution date, court dates)…"
                : "Domain, volume, time span, format, exclusivity, de-identification level…"
            }
          />
        </Field>
      </div>

      {state === "error" && <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{message}</p>}

      <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs text-muted">
          Confidential. We never share your details with buyers without your consent.
        </p>
        <button
          type="submit"
          disabled={state === "sending"}
          className="shrink-0 whitespace-nowrap rounded-full bg-ink px-6 py-3 font-medium text-paper transition hover:bg-cobalt disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : kind === "seller" ? "Get my valuation →" : "Submit request →"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
  error,
  optional,
  wide,
  group,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  optional?: boolean;
  wide?: boolean;
  group?: boolean;
}) {
  // A <label> would forward clicks to the first chip button, so groups use a div.
  const Tag = group ? "div" : "label";
  return (
    <Tag className={`block ${wide ? "sm:col-span-2" : ""}`}>
      <span className="mb-2 flex items-baseline justify-between text-sm font-medium">
        {label}
        {optional && <span className="font-mono text-[10px] uppercase tracking-wider text-muted">optional</span>}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-red-600">{error}</span>}
    </Tag>
  );
}

function Select({ name, options }: { name: string; options: readonly string[] }) {
  return (
    <select name={name} required defaultValue="" className={`${input} appearance-none`}>
      <option value="" disabled>
        Select…
      </option>
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}
