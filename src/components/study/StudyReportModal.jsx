import React from "react";
import { X, Printer, Download, Award, CheckCircle2, FileText, Leaf, DollarSign } from "lucide-react";
import { useFoodWaste } from "../../context/FoodWasteContext";
import { studyBenchmarks } from "../../data/studyBenchmarks";

export const StudyReportModal = ({ isOpen, onClose }) => {
  const { householdProfile, impact, wasteLogs, pantryItems } = useFoodWaste();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const consumedCount = pantryItems.filter(i => i.consumed).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full border border-stone-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Controls Bar (hidden during print) */}
        <div className="bg-[#0e382b] text-white px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between shrink-0 no-print">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-300 shrink-0" />
            <div>
              <h3 className="font-semibold text-base sm:text-lg">Academic Research & Intervention Report</h3>
              <p className="text-[11px] sm:text-xs text-emerald-200">
                Formal Household Food Waste Study • Ready for Submission
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-200" />
              <span className="hidden sm:inline">Print / Export PDF</span>
              <span className="sm:hidden">Print</span>
            </button>
            <button onClick={onClose} className="text-emerald-200 hover:text-white p-1 rounded cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Academic Report Document */}
        <div className="p-4 sm:p-8 overflow-y-auto space-y-5 sm:space-y-6 text-stone-900 bg-white print:p-0 print:space-y-4">
          {/* Header Block */}
          <div className="border-b-2 border-stone-900 pb-4 sm:pb-5">
            <span className="text-[11px] sm:text-xs uppercase tracking-widest font-mono text-emerald-800 font-bold block mb-1">
              Field Research & Digital Intervention Study
            </span>
            <h1 className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-stone-900 leading-tight">
              Mitigating Household Food Waste: Behavioral Diagnostics and a Multi-Pillar Digital Intervention Framework
            </h1>
            <div className="flex flex-wrap items-center justify-between text-xs text-stone-500 mt-3 pt-3 border-t border-stone-200 gap-2">
              <div>
                <strong>Investigator / Household: </strong>{householdProfile.householdName} ({householdProfile.householdSize} Members)
              </div>
              <div>
                <strong>Dietary Regimen: </strong>{householdProfile.dietType}
              </div>
              <div>
                <strong>Generated: </strong>{new Date().toLocaleDateString(undefined, { dateStyle: "long" })}
              </div>
            </div>
          </div>

          {/* Section 1: Abstract & Executive Summary */}
          <div className="bg-stone-50 p-4.5 rounded-xl border border-stone-200 text-xs leading-relaxed space-y-2">
            <h4 className="font-bold text-stone-900 text-sm uppercase tracking-wider">Executive Summary</h4>
            <p>
              According to the <em>UNEP Food Waste Index 2024</em>, Indian households generate approximately <strong>55 kg of food waste per capita annually</strong>, aggregating to over 78.2 million metric tonnes across the subcontinent. This research investigates the root causes of domestic food wastage in Indian kitchens—specifically excess quantity estimation in rice and dough preparation, lack of visibility into crisper vegetables (palak, coriander, capsicum), hesitation in remixing previous night's rotis and dal, and misinterpretation of FSSAI "Best Before" versus "Expiry Date" labeling. A four-pillar digital intervention platform (<strong>NourishLoop India</strong>) was deployed to systematically intervene across meal planning, shelf-life monitoring, surplus recipe rescue, and Swachh Bharat segregated disposal.
            </p>
          </div>

          {/* Section 2: Key Quantitative Efficacy Metrics */}
          <div className="space-y-3">
            <h4 className="font-bold text-stone-900 text-sm uppercase tracking-wider border-b border-stone-200 pb-1">
              Table 1: Empirical Impact & Intervention Efficacy
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 border border-stone-200 rounded-xl bg-emerald-50/40">
                <span className="block text-[11px] font-semibold text-emerald-900">Total Food Diverted</span>
                <span className="text-xl md:text-2xl font-bold text-emerald-950 font-mono">{impact.kgRescued} kg</span>
                <span className="block text-[10px] text-stone-500 mt-0.5">{consumedCount} items rescued</span>
              </div>

              <div className="p-3 border border-stone-200 rounded-xl bg-emerald-50/40">
                <span className="block text-[11px] font-semibold text-emerald-900">Household Cost Saved</span>
                <span className="text-xl md:text-2xl font-bold text-emerald-950 font-mono">₹{impact.moneySaved}</span>
                <span className="block text-[10px] text-stone-500 mt-0.5">Budget preserved</span>
              </div>

              <div className="p-3 border border-stone-200 rounded-xl bg-stone-50">
                <span className="block text-[11px] font-semibold text-stone-700">CO₂e Averted</span>
                <span className="text-xl md:text-2xl font-bold text-stone-900 font-mono">{impact.co2eSavedKg} kg</span>
                <span className="block text-[10px] text-stone-500 mt-0.5">~{impact.carKmEquivalent} km car equiv.</span>
              </div>

              <div className="p-3 border border-stone-200 rounded-xl bg-stone-50">
                <span className="block text-[11px] font-semibold text-stone-700">Virtual Water Saved</span>
                <span className="text-xl md:text-2xl font-bold text-stone-900 font-mono">{impact.waterSavedLiters} L</span>
                <span className="block text-[10px] text-stone-500 mt-0.5">850 L/kg factor</span>
              </div>
            </div>
          </div>

          {/* Section 3: Baseline vs Intervention Comparison */}
          <div className="space-y-3">
            <h4 className="font-bold text-stone-900 text-sm uppercase tracking-wider border-b border-stone-200 pb-1">
              Section 2: Comparative Behavioral Baseline
            </h4>

            <div className="border border-stone-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-100 border-b border-stone-200 font-bold text-stone-700">
                    <th className="p-2.5">Metric Dimension</th>
                    <th className="p-2.5">UNEP India Baseline</th>
                    <th className="p-2.5">Pre-Intervention Household</th>
                    <th className="p-2.5">With Digital Interventions</th>
                    <th className="p-2.5">Net Variance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  <tr>
                    <td className="p-2.5 font-semibold text-stone-900">Weekly Food Wasted</td>
                    <td className="p-2.5">4.2 kg / household</td>
                    <td className="p-2.5">{impact.baselineKgPerWeek} kg / week</td>
                    <td className="p-2.5 font-bold text-emerald-900">{impact.totalWastedKg} kg (logged)</td>
                    <td className="p-2.5 font-bold text-emerald-700">-{impact.reductionVsBaselinePct}% reduction</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-stone-900">Weekly Financial Loss</td>
                    <td className="p-2.5">~₹350 / week</td>
                    <td className="p-2.5">₹{impact.baselineCostPerWeek} / week</td>
                    <td className="p-2.5 font-bold text-emerald-900">₹{impact.totalCostLost} lost</td>
                    <td className="p-2.5 font-bold text-emerald-700">+₹{impact.moneySaved} salvaged</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-stone-900">Segregation & Diversion</td>
                    <td className="p-2.5">22% (national green bin)</td>
                    <td className="p-2.5">30% (pre-study)</td>
                    <td className="p-2.5 font-bold text-emerald-900">{impact.diversionRatePct}% diverted</td>
                    <td className="p-2.5 font-bold text-emerald-700">+{impact.diversionRatePct - 30}% increase</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Behavioral Diagnostics & Waste Incident Log */}
          <div className="space-y-3">
            <h4 className="font-bold text-stone-900 text-sm uppercase tracking-wider border-b border-stone-200 pb-1">
              Section 3: Empirical Waste Incident Log & Root Cause Analysis
            </h4>

            {wasteLogs.length === 0 ? (
              <p className="text-xs text-stone-500 italic">No waste incidents logged during study period.</p>
            ) : (
              <div className="border border-stone-200 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-stone-100 border-b border-stone-200 font-bold text-stone-700">
                      <th className="p-2">Item</th>
                      <th className="p-2">Category</th>
                      <th className="p-2">Cost Lost</th>
                      <th className="p-2">Root Cause</th>
                      <th className="p-2">Disposal Method</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {wasteLogs.map((log) => (
                      <tr key={log.id}>
                        <td className="p-2 font-medium text-stone-900">{log.itemName}</td>
                        <td className="p-2 text-stone-600">{log.category}</td>
                        <td className="p-2 font-mono text-stone-800">₹{Number(log.costLost)}</td>
                        <td className="p-2 text-stone-700">{log.rootCause}</td>
                        <td className="p-2">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                            log.disposalMethod === "Landfill" 
                              ? "bg-red-100 text-red-800" 
                              : "bg-emerald-100 text-emerald-800"
                          }`}>
                            {log.disposalMethod}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Section 5: Four-Pillar Digital Intervention Synthesis */}
          <div className="space-y-3">
            <h4 className="font-bold text-stone-900 text-sm uppercase tracking-wider border-b border-stone-200 pb-1">
              Section 4: Digital Intervention Efficacy Assessment
            </h4>

            <div className="grid md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 border border-stone-200 rounded-xl bg-stone-50/50">
                <span className="font-bold text-stone-900 block mb-1">Pillar 1: Smart Meal Planner</span>
                <p className="text-stone-600 leading-relaxed">
                  Intervenes prior to shopping by scheduling Indian regional meal cycles (Dal-Chawal, Thepla, Palak Bhurji) that cross-utilize perishable ingredients and auto-generate precise grocery portion checklists.
                </p>
              </div>

              <div className="p-3 border border-stone-200 rounded-xl bg-stone-50/50">
                <span className="font-bold text-stone-900 block mb-1">Pillar 2: Expiry & Storage Hub</span>
                <p className="text-stone-600 leading-relaxed">
                  Solves Indian refrigerator blindness (milk souring, wilted coriander, paneer drying out). Employs water submersion techniques, cotton dabba wrap heuristics, and proactive deep-freezer preservation.
                </p>
              </div>

              <div className="p-3 border border-stone-200 rounded-xl bg-stone-50/50">
                <span className="font-bold text-stone-900 block mb-1">Pillar 3: Surplus Rescue Chef</span>
                <p className="text-stone-600 leading-relaxed">
                  Eliminates domestic surplus friction by converting leftover rotis into Tadka Roti Poha, cooked basmati into Mumbai Tawa Pulao, sour dahi into Punjabi Kadhi, and leftover dal into crisp Missi Parathas.
                </p>
              </div>

              <div className="p-3 border border-stone-200 rounded-xl bg-stone-50/50">
                <span className="font-bold text-stone-900 block mb-1">Pillar 4: Responsible Disposal Triage</span>
                <p className="text-stone-600 leading-relaxed">
                  Enforces Swachh Bharat segregated Green Bins, Traditional Gau Grasa diversion to Gaushalas, Terracotta Khamba urban composting, and demystifies FSSAI "Best Before" sensory evaluation.
                </p>
              </div>
            </div>
          </div>

          {/* Academic Footer & References */}
          <div className="pt-4 border-t border-stone-200 text-[11px] text-stone-500 space-y-1">
            <p><strong>Methodological References:</strong> UNEP Food Waste Index Report (2024 - India Assessment); Ministry of Food Processing Industries (MoFPI India 2023); FSSAI Food Safety and Standards (Packaging and Labelling) Regulations; FAO Global Food Waste in Developing Economies (2022).</p>
            <p>Document certified for institutional coursework, sustainability audit, or environmental science portfolio submission.</p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-stone-50 px-6 py-3 border-t border-stone-200 flex justify-end gap-3 shrink-0 no-print">
          <button
            onClick={onClose}
            className="px-4 py-2 text-stone-600 hover:text-stone-800 text-xs font-semibold cursor-pointer"
          >
            Close Report
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-5 py-2 bg-[#0e382b] hover:bg-[#16533f] text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-emerald-300" />
            <span>Print Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};
