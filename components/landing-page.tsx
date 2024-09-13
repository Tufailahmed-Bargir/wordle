"use client";

import Header from "./Header";
import Features from "./Features";
import Leaderboard from "./LeaderBoard2";
import Footer from "./Footer";
import CTA from "./CTA";

export function LandingPageComponent() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <Features />
      <Leaderboard />
      <CTA />
      <Footer />
    </div>
  );
}
