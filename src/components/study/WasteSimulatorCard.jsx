import React, { useState } from "react";
import { 
  Calculator, 
  DollarSign, 
  Leaf, 
  TrendingUp, 
  Users, 
  Sparkles, 
  TreePine, 
  Car 
} from "lucide-react";
import { useFoodWaste } from "../../context/FoodWasteContext";

export const WasteSimulatorCard = () => {
  const { householdProfile, setHouseholdProfile } = useFoodWaste();

  const [monthlySpend, setMonthlySpend] = useState(16000); // INR ₹16,000/month average Indian family
  const [occupants, setOccupants] = useState(householdProfile.householdSize || 4);
  const [compliancePct, setCompliancePct] = useState(30); // 15% to 45% waste reduction

  // Calculations
  // Average household wastes ~20-25% of purchased food by value
  const monthlyWastedValue = monthlySpend * 0.22;
  const annualWastedValue = monthlyWastedValue * 12;

  // With Digital Interventions
  const annualMoneySaved = Math.round(annualWastedValue * (compliancePct / 100));
  
  // Food weight estimation: ~₹70/kg average in Indian urban/peri-urban retail
  const annualKgRescued = Math.round(annualMoneySaved / 70);

  // Carbon: 2.52 kg CO2e / kg food
  const annualCo2eKg = Math.round(annualKgRescued * 2.52);

  // Tree seedlings grown for 10 years equivalent: ~0.06 trees per kg CO2e
  const treesEquivalent = Math.max(1, Math.round(annualCo2eKg * 0.016));

  // Passenger car km equivalent: ~0.17 kg CO2e / km
  const carKmEquivalent = Math.round(annualCo2eKg / 0.17);

  const handleApplyToProfile = () => {
    setHouseholdProfile((prev) => ({
      ...prev,
      householdSize: occupants,
      baselineWeeklySpendLost: Math.round(monthlyWastedValue / 4),
      baselineWeeklyWasteKg: Number((annualKgRescued / 52).toFixed(1))
    }));
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-2xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
            <Calculator className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <h3 className="font-bold text-stone-900 text-base md:text-lg">
              Interactive Household Waste & ROI Simulator
            </h3>
            <p className="text-xs text-stone-500">
              Drag parameters to project 1-year and 5-year financial & carbon dividends
            </p>
          </div>
        </div>

        <button
          onClick={handleApplyToProfile}
          className="text-xs font-semibold px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl transition-colors cursor-pointer self-start sm:self-auto"
        >
          Sync with Household Profile
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-center">
        {/* Sliders Column */}
        <div className="space-y-5 text-xs text-stone-700">
          {/* Monthly Grocery Spend Slider */}
          <div className="space-y-2">
            <div className="flex justify-between font-bold text-stone-900 text-sm">
              <span>Monthly Household Grocery Budget</span>
              <span className="font-mono text-emerald-700 text-base font-extrabold">
                ₹{monthlySpend.toLocaleString("en-IN")} / mo
              </span>
            </div>
            <input
              type="range"
              min="3000"
              max="40000"
              step="1000"
              value={monthlySpend}
              onChange={(e) => setMonthlySpend(Number(e.target.value))}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-mono">
              <span>₹3,000 (Single)</span>
              <span>₹16,000 (Family of 4)</span>
              <span>₹40,000 (Large Household)</span>
            </div>
          </div>

          {/* Household Size Slider */}
          <div className="space-y-2">
            <div className="flex justify-between font-bold text-stone-900 text-sm">
              <span>Occupants in Residence</span>
              <span className="font-mono text-emerald-700 text-base font-extrabold">
                {occupants} {occupants === 1 ? "Person" : "Persons"}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="6"
              step="1"
              value={occupants}
              onChange={(e) => setOccupants(Number(e.target.value))}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-mono">
              <span>1 Person</span>
              <span>3 Persons</span>
              <span>6+ Persons</span>
            </div>
          </div>

          {/* Compliance Slider */}
          <div className="space-y-2">
            <div className="flex justify-between font-bold text-stone-900 text-sm">
              <span>Digital Intervention Compliance Level</span>
              <span className="font-mono text-emerald-700 text-base font-extrabold">
                {compliancePct}% Reduction
              </span>
            </div>
            <input
              type="range"
              min="15"
              max="45"
              step="5"
              value={compliancePct}
              onChange={(e) => setCompliancePct(Number(e.target.value))}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-mono">
              <span>15% (Basic Tracking)</span>
              <span>30% (Standard 4 Pillars)</span>
              <span>45% (Zero-Waste Mastery)</span>
            </div>
          </div>
        </div>

        {/* Dynamic Projection Results Card */}
        <div className="bg-gradient-to-br from-[#061710] to-[#0f3d2b] text-white rounded-3xl p-6 shadow-md space-y-5">
          <div className="flex items-center justify-between border-b border-emerald-900/60 pb-3">
            <span className="text-xs uppercase tracking-wider font-mono text-emerald-300 font-bold">
              Projected Annual Dividend
            </span>
            <span className="text-[11px] bg-emerald-800/80 text-emerald-200 px-2.5 py-0.5 rounded-full font-mono">
              5-Year Value: ₹${(annualMoneySaved * 5).toLocaleString("en-IN")}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10">
              <span className="text-[11px] text-emerald-200/80 block">Annual Cash Saved</span>
              <span className="text-2xl md:text-3xl font-bold font-mono text-white">
                ₹{annualMoneySaved.toLocaleString("en-IN")}
              </span>
              <span className="text-[10px] text-emerald-300 block mt-0.5">Retained in budget</span>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10">
              <span className="text-[11px] text-emerald-200/80 block">Food Rescued</span>
              <span className="text-2xl md:text-3xl font-bold font-mono text-white">
                {annualKgRescued} kg
              </span>
              <span className="text-[10px] text-emerald-300 block mt-0.5">Diverted from dump</span>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 flex items-center gap-3">
              <TreePine className="w-7 h-7 text-emerald-400 shrink-0" />
              <div>
                <span className="text-lg font-bold font-mono text-white">{treesEquivalent} Trees</span>
                <span className="text-[10px] text-emerald-200/70 block leading-tight">Carbon absorption equivalent</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 flex items-center gap-3">
              <Car className="w-7 h-7 text-cyan-400 shrink-0" />
              <div>
                <span className="text-lg font-bold font-mono text-white">{carKmEquivalent.toLocaleString()} km</span>
                <span className="text-[10px] text-emerald-200/70 block leading-tight">Car emissions averted</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-emerald-100/70 italic text-center pt-1">
            Empirical calculation based on UNEP Food Waste Index 2024 & MoFPI India domestic waste multiplier models.
          </p>
        </div>
      </div>
    </div>
  );
};
