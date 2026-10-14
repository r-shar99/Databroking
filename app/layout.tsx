import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { SiteHeader, SiteFooter } from "@/components/chrome";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://datadrop.vercel.app"),
  title: { default: "DataDrop: your company's data, matched to AI labs", template: "%s · DataDrop" },
  description:
    "DataDrop matchmakes companies with AI labs and data buyers. We help you sell Slack, email, Jira and code archives with clean provenance, scrubbed PII and a competitive process.",
  openGraph: {
    title: "DataDrop",
    description: "Your company's history is training data. Get paid for it, cleanly.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${serif.variable} ${mono.variable}`}>
      <body className="min-h-screen font-sans">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
