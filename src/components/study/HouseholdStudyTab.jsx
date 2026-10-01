import React, { useState } from "react";
import { 
  BarChart3, 
  FileText, 
  Users, 
  Trash2, 
  Leaf, 
  TrendingDown, 
  Sparkles, 
  AlertCircle, 
  Target, 
  CheckCircle2, 
  Award,
  ShieldCheck,
  Flame
} from "lucide-react";
import { useFoodWaste } from "../../context/FoodWasteContext";
import { studyBenchmarks } from "../../data/studyBenchmarks";
import { StudyReportModal } from "./StudyReportModal";
import { WasteSimulatorCard } from "./WasteSimulatorCard";

export const HouseholdStudyTab = () => {
  const { householdProfile, setHouseholdProfile, wasteLogs, impact, pantryItems } = useFoodWaste();
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isProfileEditing, setIsProfileEditing] = useState(false);

  // Editable profile state
  const [tempProfile, setTempProfile] = useState(householdProfile);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setHouseholdProfile(tempProfile);
    setIsProfileEditing(false);
  };

  const consumedItems = pantryItems.filter(i => i.consumed);

  const achievements = [
    { title: "Zero-Waste Streak", desc: "5 consecutive days without landfill waste", icon: Flame, earned: true, color: "text-amber-500 bg-amber-50 border-amber-200" },
    { title: "Leftover Alchemist", desc: "Cooked 3+ meals using only surplus odds-and-ends", icon: Sparkles, earned: true, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
    { title: "Freezer Master", desc: "Extended 2+ perishables by transferring to freezer", icon: ShieldCheck, earned: true, color: "text-sky-600 bg-sky-50 border-sky-200" },
    { title: "Triage Scholar", desc: "Saved safe food past 'Best Before' date via sensory check", icon: Award, earned: true, color: "text-teal-600 bg-teal-50 border-teal-200" }
  ];

  return (
    <div className="space-y-6">
      {/* Topic Scope Banner */}
      <div className="bg-gradient-to-r from-[#061710] via-[#0a2e20] to-[#175440] rounded-3xl p-6 md:p-8 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-3xl">
            <span className="text-[10px] font-mono tracking-widest uppercase bg-emerald-900/90 text-emerald-300 px-3 py-1 rounded-full border border-emerald-700/60 inline-block font-bold">
              Research Project & Empirical Case Study
            </span>
            <h2 className="text-xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
              Household Food Waste Practices & Multi-Pillar Digital Intervention Framework
            </h2>
            <p className="text-xs md:text-sm text-emerald-100/90 leading-relaxed pt-1">
              Investigating the behavioral drivers of domestic food waste and validating digital interventions across meal planning, shelf-life visibility, surplus utilization, and composting triage.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => setIsReportOpen(true)}
              className="flex items-center gap-2 px-5 py-3 bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-bold rounded-2xl text-xs md:text-sm shadow-md transition-all cursor-pointer hover:shadow-lg hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4 text-stone-950" />
              <span>Generate Academic Thesis Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Household Profile & Baseline Calibration */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-700" />
            <h3 className="font-bold text-stone-900 text-base md:text-lg">
              Household Demographic & Baseline Calibration
            </h3>
          </div>
          <button
            onClick={() => setIsProfileEditing(!isProfileEditing)}
            className="text-xs text-emerald-800 hover:text-emerald-950 font-bold cursor-pointer"
          >
            {isProfileEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {isProfileEditing ? (
          <form onSubmit={handleSaveProfile} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-stone-100 text-xs">
            <div>
              <label className="block font-medium text-stone-700 mb-1">Household Name / Identifier</label>
              <input
                type="text"
                value={tempProfile.householdName}
                onChange={(e) => setTempProfile({ ...tempProfile, householdName: e.target.value })}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">Number of Occupants</label>
              <select
                value={tempProfile.householdSize}
                onChange={(e) => setTempProfile({ ...tempProfile, householdSize: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white"
              >
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <option key={n} value={n}>{n} {n === 1 ? "Person" : "Persons"}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">Dietary Regimen</label>
              <select
                value={tempProfile.dietType}
                onChange={(e) => setTempProfile({ ...tempProfile, dietType: e.target.value })}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white"
              >
                <option value="Omnivore">Omnivore</option>
                <option value="Flexitarian">Flexitarian (Plant-Forward)</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
              </select>
            </div>

            <div className="sm:col-span-3 flex justify-end gap-2 pt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-[#0a2e20] text-white rounded-lg font-semibold cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs pt-3 border-t border-stone-100">
            <div className="p-3.5 bg-stone-50 rounded-2xl">
              <span className="text-stone-500 block text-[11px]">Subject Household</span>
              <span className="font-bold text-stone-900 text-sm">{householdProfile.householdName}</span>
            </div>
            <div className="p-3.5 bg-stone-50 rounded-2xl">
              <span className="text-stone-500 block text-[11px]">Occupancy</span>
              <span className="font-bold text-stone-900 text-sm font-mono">{householdProfile.householdSize} Persons</span>
            </div>
            <div className="p-3.5 bg-stone-50 rounded-2xl">
              <span className="text-stone-500 block text-[11px]">National Baseline Loss</span>
              <span className="font-bold text-stone-900 text-sm font-mono">~{impact.baselineKgPerWeek} kg/wk (₹{impact.baselineCostPerWeek})</span>
            </div>
            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200">
              <span className="text-emerald-800 block text-[11px] font-bold uppercase tracking-wider">Intervention Efficacy</span>
              <span className="font-extrabold text-emerald-950 text-sm font-mono">{impact.reductionVsBaselinePct}% Waste Reduction</span>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Simulation Lab Slider Card */}
      <WasteSimulatorCard />

      {/* Gamified Household Achievements */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-stone-900 text-base md:text-lg">
              Household Sustainability Milestones
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
            4 / 4 Badges Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {achievements.map((a, idx) => {
            const Icon = a.icon;
            return (
              <div key={idx} className={`p-4 rounded-2xl border ${a.color} space-y-1.5`}>
                <div className="flex items-center justify-between">
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Unlocked</span>
                </div>
                <h5 className="font-bold text-stone-900 text-sm">{a.title}</h5>
                <p className="text-stone-600 leading-snug">{a.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Behavioral Root Cause Diagnostics & Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        {/* Behavioral Drivers Card */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-2xs space-y-4">
          <div>
            <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-700" />
              Household Behavioral Breakdown Points
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Empirical research findings on why domestic food waste occurs (WRAP/UNEP)
            </p>
          </div>

          <div className="space-y-3 text-xs">
            {studyBenchmarks.behavioralDrivers.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl border border-stone-100 bg-stone-50/70 space-y-1.5">
                <div className="flex items-center justify-between font-bold text-stone-900">
                  <span>{item.driver}</span>
                  <span className="font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
                    {item.prevalencePct}% of Waste
                  </span>
                </div>
                <p className="text-stone-600 leading-relaxed">{item.description}</p>
                <div className="pt-1 text-[11px] text-emerald-900 font-semibold">
                  <strong>Digital Remedy: </strong>{item.targetedIntervention}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown Card */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-2xs space-y-4">
          <div>
            <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-700" />
              Vulnerability by Food Category
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Household waste distribution across physical food streams
            </p>
          </div>

          <div className="space-y-3 text-xs">
            {studyBenchmarks.wasteByCategory.map((cat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between font-medium text-stone-800 text-xs">
                  <span>{cat.category}</span>
                  <span className="font-bold text-stone-900 font-mono">{cat.sharePct}%</span>
                </div>
                {/* Visual Progress Bar */}
                <div className="h-2.5 w-full bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${cat.sharePct}%`, backgroundColor: cat.color }}
                  />
                </div>
                <span className="text-[10px] text-stone-500 block">{cat.note}</span>
              </div>
            ))}
          </div>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
            <span className="font-bold block">Environmental Footprint Multipliers:</span>
            <p className="text-[11px] text-emerald-900 leading-relaxed">
              Discarding 1 kg of household food generates on average <strong>2.52 kg CO₂e</strong> emissions in landfill and squanders <strong>850 liters</strong> of embedded virtual water.
            </p>
          </div>
        </div>
      </div>

      {/* Empirical Household Waste Incident Audit Log */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-red-500" />
              Household Waste Audit & Incident Diary
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Empirical tracking of items lost to understand household behavioral triggers
            </p>
          </div>

          <span className="text-xs font-mono font-bold text-stone-700 bg-stone-100 px-3 py-1.5 rounded-xl">
            Total Logged Waste: {impact.totalWastedKg} kg (₹{impact.totalCostLost})
          </span>
        </div>

        {wasteLogs.length === 0 ? (
          <div className="p-8 text-center text-xs text-stone-500 bg-stone-50 rounded-2xl">
            Zero waste incidents logged! Continue using the 4 Pillars to maintain zero waste.
          </div>
        ) : (
          <div className="overflow-x-auto border border-stone-200 rounded-2xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 font-bold text-stone-700">
                  <th className="p-3.5">Item Discarded</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Cost Lost</th>
                  <th className="p-3.5">Root Cause</th>
                  <th className="p-3.5">Disposal Stream</th>
                  <th className="p-3.5">Reflection / Countermeasure</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {wasteLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-stone-50/60">
                    <td className="p-3.5 font-semibold text-stone-900">{log.itemName}</td>
                    <td className="p-3.5 text-stone-600">{log.category}</td>
                    <td className="p-3.5 font-mono font-bold text-stone-800">₹{Number(log.costLost)}</td>
                    <td className="p-3.5 text-stone-700 max-w-xs">{log.rootCause}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        log.disposalMethod === "Landfill" ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800"
                      }`}>
                        {log.disposalMethod}
                      </span>
                    </td>
                    <td className="p-3.5 text-stone-500 text-[11px] italic max-w-xs">
                      {log.reflection || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Academic Study Report Modal */}
      <StudyReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />
    </div>
  );
};
