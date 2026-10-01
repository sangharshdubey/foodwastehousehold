import React from "react";
import { 
  Sparkles, 
  Flame, 
  Clock, 
  CalendarDays, 
  ChefHat, 
  Recycle, 
  ArrowRight, 
  DollarSign, 
  Leaf, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Snowflake, 
  HelpCircle,
  TrendingDown,
  BarChart3
} from "lucide-react";
import { useFoodWaste } from "../../context/FoodWasteContext";
import { getUrgencyLevel, getDaysUntil, formatRelativeDate } from "../../utils/dateUtils";
import { UrgentTriageStation } from "./UrgentTriageStation";

export const ExecutiveDashboard = () => {
  const { 
    householdProfile, 
    pantryItems, 
    impact, 
    setActiveTab, 
    consumeItem, 
    freezeItem, 
    setSelectedRescueIngredients 
  } = useFoodWaste();

  const activeItems = pantryItems.filter(i => !i.consumed);
  
  // Find critical items needing immediate intervention (<48h)
  const criticalItems = activeItems.filter(i => {
    const urgency = getUrgencyLevel(i.expiryDate, i.isFrozen);
    return urgency === "critical" || urgency === "expired";
  });

  const handleRescueItem = (name) => {
    setSelectedRescueIngredients([name]);
    setActiveTab("rescue");
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 slide-in-from-bottom-2 duration-300">
      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#061710] via-[#0a2e20] to-[#124231] text-white p-5 sm:p-8 lg:p-10 shadow-xl border border-emerald-900/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest bg-emerald-900/90 text-emerald-300 font-bold px-2.5 sm:px-3 py-1 rounded-full border border-emerald-700/60 inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Live Household Command Center
              </span>
              <span className="text-xs text-emerald-200/80 font-mono">
                {householdProfile.householdSize} Members • {householdProfile.dietType}
              </span>
            </div>

            <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Welcome back, {householdProfile.householdName}
            </h1>
            
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-xl">
              Your household has prevented <strong className="text-white font-mono">{impact.kgRescued} kg</strong> of food from landfill this week, preserving <strong className="text-white font-mono">₹{impact.moneySaved}</strong> and cutting your carbon footprint by <strong className="text-emerald-300 font-mono">{impact.co2eSavedKg} kg CO₂e</strong>.
            </p>
          </div>

          {/* Quick Streak & Metric Pill */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-4.5 border border-white/15 flex flex-col gap-3 w-full sm:w-auto sm:min-w-[240px] shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-200">Active Streak</span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-300 bg-amber-950/70 px-2.5 py-0.5 rounded-full border border-amber-500/40">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-bounce" />
                <span>5 Days Zero Waste</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-center font-mono">
              <div className="bg-emerald-950/40 rounded-xl p-2">
                <span className="text-[10px] text-emerald-300 font-sans block">Diversion</span>
                <span className="text-base font-bold text-white">{impact.diversionRatePct}%</span>
              </div>
              <div className="bg-emerald-950/40 rounded-xl p-2">
                <span className="text-[10px] text-emerald-300 font-sans block">Saved</span>
                <span className="text-base font-bold text-emerald-300">₹{impact.moneySaved}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Urgent Rescue Triage Station */}
      <UrgentTriageStation />

      {/* 4-Pillar Visual Navigation & Action Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-stone-900 text-lg md:text-xl">
              The 4 Digital Intervention Pillars
            </h3>
            <p className="text-xs text-stone-500">
              Evidence-based behavioral mechanisms deployed across your household
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Pillar 1: Smart Meal Planner */}
          <div
            onClick={() => setActiveTab("mealplanner")}
            className="group craft-card craft-card-hover rounded-3xl overflow-hidden cursor-pointer flex flex-col justify-between"
          >
            <div className="relative h-44 overflow-hidden bg-stone-100">
              <img
                src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"
                alt="Meal Planning & Meal Prep"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-stone-900 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-2xs">
                Pillar 1: Prevention
              </span>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-xs font-mono font-bold text-emerald-300 block mb-0.5">Tonight's Plan</span>
                <p className="font-bold text-sm truncate">Desi Palak & Paneer Bhurji</p>
              </div>
            </div>

            <div className="p-4.5 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-stone-900 text-base group-hover:text-emerald-800 transition-colors">
                  Smart Meal Planner
                </h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Coordinates multi-day recipes to use 100% of open perishables and stops orphan ingredients.
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-800">
                <span>Open Weekly Board</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Pillar 2: Expiry & Storage Hub */}
          <div
            onClick={() => setActiveTab("tracker")}
            className="group craft-card craft-card-hover rounded-3xl overflow-hidden cursor-pointer flex flex-col justify-between"
          >
            <div className="relative h-44 overflow-hidden bg-stone-100">
              <img
                src="https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80"
                alt="Clean Organized Refrigerator"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-stone-900 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-2xs">
                Pillar 2: Storage Hub
              </span>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-xs font-mono font-bold text-emerald-300 block mb-0.5">Virtual Fridge</span>
                <p className="font-bold text-sm">{activeItems.length} Perishables Tracked</p>
              </div>
            </div>

            <div className="p-4.5 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-stone-900 text-base group-hover:text-emerald-800 transition-colors">
                  Expiry & Storage Hub
                </h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Eliminates fridge blindness with thermal zone racks, ethylene gas science, and freezer prompts.
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-800">
                <span>View Virtual Fridge</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Pillar 3: Surplus Rescue Chef */}
          <div
            onClick={() => setActiveTab("rescue")}
            className="group craft-card craft-card-hover rounded-3xl overflow-hidden cursor-pointer flex flex-col justify-between"
          >
            <div className="relative h-44 overflow-hidden bg-stone-100">
              <img
                src="https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=600&q=80"
                alt="Zero-Waste Sizzling Skillet Frittata"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-stone-900 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-2xs">
                Pillar 3: Utilization
              </span>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-xs font-mono font-bold text-amber-300 block mb-0.5">Scrap Matcher</span>
                <p className="font-bold text-sm">6 Zero-Waste Recipes Ready</p>
              </div>
            </div>

            <div className="p-4.5 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-stone-900 text-base group-hover:text-emerald-800 transition-colors">
                  Surplus Rescue Chef
                </h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Match whatever odd leftovers you have with universal recipes and interactive kitchen timers.
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-800">
                <span>Launch Recipe Matcher</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Pillar 4: Responsible Disposal */}
          <div
            onClick={() => setActiveTab("disposal")}
            className="group craft-card craft-card-hover rounded-3xl overflow-hidden cursor-pointer flex flex-col justify-between"
          >
            <div className="relative h-44 overflow-hidden bg-stone-100">
              <img
                src="https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&w=600&q=80"
                alt="Compost & Regenerative Soil"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-stone-900 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-2xs">
                Pillar 4: Disposal
              </span>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-xs font-mono font-bold text-teal-300 block mb-0.5">Sensory Triage</span>
                <p className="font-bold text-sm">Date Label Decoder Active</p>
              </div>
            </div>

            <div className="p-4.5 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-stone-900 text-base group-hover:text-emerald-800 transition-colors">
                  Responsible Disposal
                </h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  3-step "Can I Eat This?" sensory triage and comprehensive composting diversion guide.
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-800">
                <span>Run Triage Wizard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Today's High-Impact Behavioral Nudges */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
            <h3 className="font-bold text-stone-900 text-base sm:text-lg">
              3 High-Impact Food Waste Interventions for Today
            </h3>
          </div>
          <span className="text-xs text-stone-500 font-mono">Prioritized by ₹ impact</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#f6f8f6] border border-stone-200/80 space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-stone-900 text-sm">1. Cook Desi Palak Bhurji</span>
                <span className="text-emerald-800 font-mono font-bold bg-emerald-100 px-2 py-0.5 rounded text-[11px] shrink-0">+₹280 Saved</span>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Consumes Fresh Desi Palak (expires tomorrow) and Malai Paneer before freshness degrades.
              </p>
            </div>
            <button
              onClick={() => setActiveTab("rescue")}
              className="text-xs text-emerald-800 hover:text-emerald-950 font-bold underline cursor-pointer pt-2 block text-left"
            >
              Start Cooking Mode →
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-[#f6f8f6] border border-stone-200/80 space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-stone-900 text-sm">2. Freeze Leftover Rotis</span>
                <span className="text-sky-800 font-mono font-bold bg-sky-100 px-2 py-0.5 rounded text-[11px] shrink-0">+60d Extension</span>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Stack remaining 5 rotis with parchment paper into Freezer Vault. Thaws fresh on tawa with a drop of ghee.
              </p>
            </div>
            <button
              onClick={() => setActiveTab("tracker")}
              className="text-xs text-sky-800 hover:text-sky-950 font-bold underline cursor-pointer pt-2 block text-left"
            >
              Open Freezer Vault →
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-[#f6f8f6] border border-stone-200/80 space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-stone-900 text-sm">3. Triage Sour Curd (Dahi)</span>
                <span className="text-teal-800 font-mono font-bold bg-teal-100 px-2 py-0.5 rounded text-[11px] shrink-0">FSSAI Check</span>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Curd past Best Before? It's not spoiled! Natural acidity makes perfect Punjabi Kadhi or Dahi Vada batter.
              </p>
            </div>
            <button
              onClick={() => setActiveTab("disposal")}
              className="text-xs text-teal-800 hover:text-teal-950 font-bold underline cursor-pointer pt-2 block text-left"
            >
              Run "Can I Eat This?" Wizard →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
