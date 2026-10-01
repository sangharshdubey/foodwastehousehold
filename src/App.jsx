import React, { useState } from "react";
import { FoodWasteProvider, useFoodWaste } from "./context/FoodWasteContext";
import { Navbar } from "./components/common/Navbar";
import { Toast } from "./components/common/Toast";
import { ExecutiveDashboard } from "./components/dashboard/ExecutiveDashboard";
import { ExpiryTrackerTab } from "./components/tracker/ExpiryTrackerTab";
import { MealPlannerTab } from "./components/mealplanner/MealPlannerTab";
import { SurplusRescueTab } from "./components/rescue/SurplusRescueTab";
import { DisposalGuideTab } from "./components/disposal/DisposalGuideTab";
import { HouseholdStudyTab } from "./components/study/HouseholdStudyTab";
import { StudyReportModal } from "./components/study/StudyReportModal";
import { Leaf, Heart, BookOpen, ExternalLink } from "lucide-react";

import { MobileBottomBar } from "./components/common/MobileBottomBar";

function MainContent() {
  const { activeTab } = useFoodWaste();
  const [isReportOpen, setIsReportOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f8f6] selection:bg-emerald-200 selection:text-emerald-950">
      {/* Floating Capsule Glassmorphism Navbar */}
      <Navbar onOpenReport={() => setIsReportOpen(true)} />

      {/* Main Page Body Container with Mobile Safe-Bottom Padding */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 md:px-6 pt-4 sm:pt-6 pb-24 md:pb-12">
        {activeTab === "dashboard" && <ExecutiveDashboard />}
        {activeTab === "study" && <HouseholdStudyTab />}
        {activeTab === "tracker" && <ExpiryTrackerTab />}
        {activeTab === "mealplanner" && <MealPlannerTab />}
        {activeTab === "rescue" && <SurplusRescueTab />}
        {activeTab === "disposal" && <DisposalGuideTab />}
      </main>

      {/* High-Craft Professional Footer */}
      <footer className="border-t border-stone-200/80 bg-white/70 backdrop-blur-sm text-stone-600 text-xs py-8 pb-24 md:pb-8 no-print mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#0a2e20] flex items-center justify-center text-white">
              <Leaf className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <span className="font-extrabold text-stone-900 text-sm">NourishLoop Platform</span>
              <p className="text-[11px] text-stone-500">
                Household Food Waste Study & Multi-Pillar Digital Intervention Architecture
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] text-stone-500">
            <span>UNEP Food Waste Index 2024</span>
            <span className="hidden sm:inline">•</span>
            <span>Zero-Waste Culinary Frameworks</span>
            <span className="hidden sm:inline">•</span>
            <button
              onClick={() => setIsReportOpen(true)}
              className="text-emerald-800 hover:text-emerald-950 font-bold cursor-pointer underline"
            >
              Academic Thesis Report
            </button>
          </div>
        </div>
      </footer>

      {/* Dedicated Native-Feel Mobile Bottom Navigation */}
      <MobileBottomBar />

      {/* Global Toast Notifications */}
      <Toast />

      {/* Study Report Modal */}
      <StudyReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <FoodWasteProvider>
      <MainContent />
    </FoodWasteProvider>
  );
}
