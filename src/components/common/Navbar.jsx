import React from "react";
import { 
  Leaf, 
  Clock, 
  CalendarDays, 
  ChefHat, 
  Recycle, 
  BarChart3, 
  RotateCcw, 
  FileText,
  DollarSign,
  Flame,
  LayoutDashboard
} from "lucide-react";
import { useFoodWaste } from "../../context/FoodWasteContext";

export const Navbar = ({ onOpenReport }) => {
  const { activeTab, setActiveTab, impact, resetToDemo } = useFoodWaste();

  const navItems = [
    { id: "dashboard", label: "Overview", icon: LayoutDashboard },
    { id: "tracker", label: "Expiry & Fridge", icon: Clock },
    { id: "mealplanner", label: "Meal Plan", icon: CalendarDays },
    { id: "rescue", label: "Rescue Chef", icon: ChefHat },
    { id: "disposal", label: "Disposal", icon: Recycle },
    { id: "study", label: "Study & Audit", icon: BarChart3 }
  ];

  return (
    <header className="sticky top-3 z-50 px-3 sm:px-4 max-w-7xl mx-auto w-full no-print">
      {/* Floating Frosted Glass Capsule */}
      <div className="bg-white/90 backdrop-blur-xl border border-stone-200/90 shadow-lg rounded-2xl px-3.5 sm:px-5 py-2.5 flex flex-wrap items-center justify-between gap-3 transition-all duration-200">
        {/* Brand identity */}
        <div 
          onClick={() => setActiveTab("dashboard")}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#061710] to-[#124231] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            <Leaf className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-stone-900 text-base sm:text-lg tracking-tight">
                NourishLoop
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-[10px] text-stone-400 font-mono hidden md:block">
              Household Intervention Platform
            </p>
          </div>
        </div>

        {/* Segmented Capsule View Switcher (Desktop & Tablet) */}
        <nav className="hidden md:flex items-center bg-stone-100/90 p-1 rounded-xl border border-stone-200/80 overflow-x-auto max-w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-white text-stone-900 shadow-xs scale-100"
                    : "text-stone-600 hover:text-stone-900 hover:bg-white/50"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-emerald-700" : "text-stone-400"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Live Metrics Chip & Primary CTAs */}
        <div className="flex items-center gap-2">
          {/* Live Household Streak & Savings Chip */}
          <div 
            onClick={() => setActiveTab("study")}
            className="flex items-center gap-1.5 sm:gap-2.5 bg-emerald-50/80 border border-emerald-200/80 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl cursor-pointer hover:bg-emerald-100/70 transition-colors"
            title="View full study baseline & impact analytics"
          >
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-amber-700 font-mono">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="hidden xs:inline">5d</span>
            </span>
            <span className="text-stone-300 hidden xs:inline">•</span>
            <span className="text-[10px] sm:text-[11px] font-mono font-bold text-emerald-950">
              ₹{impact.moneySaved}
            </span>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={onOpenReport}
            className="flex items-center gap-1.5 bg-[#0a2e20] hover:bg-[#134533] text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs transition-all cursor-pointer hover:shadow-md hover:-translate-y-0.5"
            title="Generate academic thesis / project report"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-300" />
            <span className="hidden sm:inline">Export Thesis Report</span>
            <span className="sm:hidden">Report</span>
          </button>

          {/* Reset Demo Button */}
          <button
            onClick={resetToDemo}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
            title="Reset data to initial case study state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
