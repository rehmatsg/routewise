import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProposalHero } from "@/components/proposal/proposal-hero";
import { ProblemSection } from "@/components/proposal/problem-section";
import { TargetUsers } from "@/components/proposal/target-users";
import { CompetitorAnalysis } from "@/components/proposal/competitor-analysis";
import { IndustryTrends } from "@/components/proposal/industry-trends";
import { References } from "@/components/proposal/references";

export const metadata: Metadata = {
  title: "Project Proposal - Routewise",
  description:
    "HCI Project Proposal for Routewise: AI-Powered Road Trip Planning for EV Drivers and Scenic Explorers.",
};

export default function ProposalPage() {
  return (
    <main>
      <Navbar />
      <ProposalHero />
      <ProblemSection />
      <TargetUsers />
      <CompetitorAnalysis />
      <IndustryTrends />
      <References />
      <Footer />
    </main>
  );
}
