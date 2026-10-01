import React, { useState } from "react";
import { X, BookOpen, AlertTriangle, Snowflake, Sparkles, Check } from "lucide-react";
import { preservationGuides, ethyleneGuide } from "../../data/storageKnowledge";

export const StorageGuideModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("preservation"); // preservation | ethylene | fridgeZones
  const [filterCategory, setFilterCategory] = useState("all");

  if (!isOpen) return null;

  const categories = ["all", "Produce", "Dairy", "Bakery", "Leftovers"];
  const filteredGuides = filterCategory === "all" 
    ? preservationGuides 
    : preservationGuides.filter(g => g.category === filterCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#0e382b] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-300" />
            <div>
              <h3 className="font-semibold text-lg">Household Food Preservation Science</h3>
              <p className="text-xs text-emerald-200">
                Evidence-based storage techniques to double perishables shelf-life
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-emerald-200 hover:text-white p-1 rounded cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="border-b border-stone-200 bg-stone-50 px-4 sm:px-6 py-2.5 flex items-center gap-2 shrink-0 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("preservation")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap ${
              activeTab === "preservation" ? "bg-[#0e382b] text-white" : "text-stone-600 hover:bg-stone-200"
            }`}
          >
            Preservation Protocols
          </button>
          <button
            onClick={() => setActiveTab("ethylene")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap ${
              activeTab === "ethylene" ? "bg-[#0e382b] text-white" : "text-stone-600 hover:bg-stone-200"
            }`}
          >
            Ethylene Gas Pairing Science
          </button>
          <button
            onClick={() => setActiveTab("fridgeZones")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap ${
              activeTab === "fridgeZones" ? "bg-[#0e382b] text-white" : "text-stone-600 hover:bg-stone-200"
            }`}
          >
            Refrigerator Thermal Zones
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6">
          {activeTab === "preservation" && (
            <div>
              {/* Category pill filters */}
              <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize cursor-pointer ${
                      filterCategory === cat
                        ? "bg-emerald-800 text-white"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    {cat === "all" ? "All Categories" : cat}
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {filteredGuides.map((guide) => (
                  <div key={guide.id} className="border border-stone-200 rounded-xl p-4 bg-stone-50/50 hover:bg-white transition-all shadow-2xs">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h4 className="font-semibold text-stone-900 text-sm">{guide.title}</h4>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium">
                        {guide.shelfLifeDays}d shelf life
                      </span>
                    </div>

                    <p className="text-xs text-stone-700 leading-relaxed mb-3">
                      <strong className="text-stone-900">Pro-Tip: </strong>
                      {guide.proTip}
                    </p>

                    <div className="pt-2 border-t border-stone-200/80 text-[11px] text-stone-600 space-y-1">
                      <div>
                        <span className="font-medium text-stone-800">Zone: </span>
                        <span className="capitalize">{guide.idealZone}</span> • <span className="font-medium text-stone-800">Gas: </span>{guide.ethylene}
                      </div>
                      <div>
                        <span className="font-medium text-stone-800">Freezer Strategy: </span>
                        {guide.canFreeze}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "ethylene" && (
            <div className="space-y-6">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 leading-relaxed">
                  <p className="font-bold text-sm text-amber-950 mb-0.5">The Invisible Food Killer: Ethylene Gas ($C_2H_4$)</p>
                  Certain fruits emit ethylene gas as they ripen. When stored together in an enclosed crisper drawer or bowl, they trigger premature over-ripening, bitter compounds, and decay in sensitive vegetables.
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Heavy Emitters */}
                <div className="border border-red-200 rounded-xl p-4 bg-red-50/30">
                  <h4 className="font-bold text-red-900 text-sm mb-3 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    High Ethylene Producers (Keep Isolated)
                  </h4>
                  <div className="space-y-2.5">
                    {ethyleneGuide.emitters.map(e => (
                      <div key={e.name} className="bg-white border border-red-100 rounded-lg p-2.5 text-xs">
                        <div className="flex justify-between font-semibold text-stone-900">
                          <span>{e.name}</span>
                          <span className="text-red-700 font-mono text-[10px] bg-red-50 px-1.5 py-0.5 rounded">
                            {e.intensity}
                          </span>
                        </div>
                        <p className="text-stone-600 mt-1">{e.notes}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sensitive Produce */}
                <div className="border border-emerald-200 rounded-xl p-4 bg-emerald-50/30">
                  <h4 className="font-bold text-emerald-900 text-sm mb-3 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    Gas-Sensitive Victims (Keep Away from Emitters)
                  </h4>
                  <div className="space-y-2.5">
                    {ethyleneGuide.sensitive.map(s => (
                      <div key={s.name} className="bg-white border border-emerald-100 rounded-lg p-2.5 text-xs">
                        <span className="font-semibold text-stone-900 block mb-0.5">{s.name}</span>
                        <p className="text-stone-600">{s.reaction}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "fridgeZones" && (
            <div className="space-y-4">
              <p className="text-xs text-stone-600">
                A refrigerator is not uniformly cold. Warm air rises and the door temperature fluctuates violently. Organizing items according to thermal gradients prevents premature spoilage:
              </p>

              <div className="border border-stone-200 rounded-xl overflow-hidden text-xs">
                <div className="p-3.5 bg-sky-50 border-b border-stone-200">
                  <span className="font-bold text-stone-900">Top Shelves (Warmest stable zone: 4°C - 6°C)</span>
                  <p className="text-stone-600 mt-0.5">
                    Ready-to-eat foods, cooked leftovers, hummus, deli dips, herbs in water.
                  </p>
                </div>

                <div className="p-3.5 bg-blue-50/60 border-b border-stone-200">
                  <span className="font-bold text-stone-900">Middle Shelves (Moderate cold: 3°C - 4°C)</span>
                  <p className="text-stone-600 mt-0.5">
                    Dairy, eggs in original cartons, yogurt, cheeses, prepared meal prep containers.
                  </p>
                </div>

                <div className="p-3.5 bg-blue-100/50 border-b border-stone-200">
                  <span className="font-bold text-stone-900">Bottom Shelf / Rear (Coldest zone: 1°C - 2°C)</span>
                  <p className="text-stone-600 mt-0.5">
                    Raw meats, poultry, fresh fish, and milk jugs (never put milk on the door!).
                  </p>
                </div>

                <div className="p-3.5 bg-emerald-50/50 border-b border-stone-200">
                  <span className="font-bold text-stone-900">Crisper Drawers (Controlled Humidity)</span>
                  <p className="text-stone-600 mt-0.5">
                    <strong>High Humidity:</strong> Leafy greens, herbs, cucumbers. <br />
                    <strong>Low Humidity:</strong> Apples, pears, avocados, stone fruit.
                  </p>
                </div>

                <div className="p-3.5 bg-amber-50/50">
                  <span className="font-bold text-stone-900">Door Bins (Most volatile zone: 7°C - 10°C)</span>
                  <p className="text-stone-600 mt-0.5">
                    Condiments, mustard, vinegar, jam, carbonated water. Avoid dairy or eggs here.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-stone-50 px-6 py-3 border-t border-stone-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#0e382b] hover:bg-[#16533f] text-white text-xs font-semibold rounded-lg cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
