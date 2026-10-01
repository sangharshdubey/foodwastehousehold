import React, { useState } from "react";
import { X, HelpCircle, CheckCircle2, AlertTriangle, ShieldAlert, Sparkles, ArrowRight, RotateCcw } from "lucide-react";

export const TriageWizardModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [foodType, setFoodType] = useState("produce"); // produce | dairy | meat | bakery | canned
  const [hasVisibleMold, setHasVisibleMold] = useState("no");
  const [hasBadOdor, setHasBadOdor] = useState("no");
  const [dateStatus, setDateStatus] = useState("pastBestBefore"); // beforeDate | pastBestBefore | pastUseBy

  if (!isOpen) return null;

  const handleReset = () => {
    setStep(1);
    setFoodType("produce");
    setHasVisibleMold("no");
    setHasBadOdor("no");
    setDateStatus("pastBestBefore");
  };

  // Determine triage result
  const calculateVerdict = () => {
    // 1. High risk condition: visible mold on soft/moist items or past "Use By" on meat
    if (hasVisibleMold === "yes") {
      if (foodType === "bakery" || foodType === "dairy" || foodType === "meat") {
        return {
          status: "danger",
          title: "UNSAFE — Must Discard / Compost Immediately",
          badge: "Biohazard & Mycotoxin Risk",
          color: "border-red-300 bg-red-50 text-red-950",
          advice: "Mold threads (hyphae) penetrate deep into porous baked goods, soft cheeses, and cooked meats even if visible mold seems isolated. Discard immediately.",
          divertAction: "Transfer to Municipal Organics or Backyard Compost (if non-meat)."
        };
      } else if (foodType === "produce") {
        return {
          status: "salvage",
          title: "Conditional: Hard Produce Trimming Safe",
          badge: "1-Inch Rule Salvageable",
          color: "border-amber-300 bg-amber-50 text-amber-950",
          advice: "On hard vegetables (carrots, bell peppers, cabbage), cut away at least 1 inch around and below the mold spot. For soft produce (berries, peaches, tomatoes), discard to compost.",
          divertAction: "Compost the trimmed moldy sections."
        };
      }
    }

    if (hasBadOdor === "yes") {
      return {
        status: "danger",
        title: "UNSAFE — Bacterial Spoilage Detected",
        badge: "Do Not Consume",
        color: "border-red-300 bg-red-50 text-red-950",
        advice: "A sour, ammoniac, or rancid smell indicates bacterial colonies (e.g. Pseudomonas or enterobacteria). Cooking cannot destroy heat-stable bacterial toxins.",
        divertAction: "Compost or Green Bin."
      };
    }

    if (dateStatus === "pastUseBy" && foodType === "meat") {
      return {
        status: "danger",
        title: "UNSAFE — High Pathogen Risk",
        badge: "Strict 'Use By' Exceeded",
        color: "border-red-300 bg-red-50 text-red-950",
        advice: "Raw meat or fresh seafood past 'Use By' date can harbor Listeria and Salmonella without producing an obvious smell.",
        divertAction: "Municipal Green Bin or Bokashi."
      };
    }

    if (dateStatus === "pastBestBefore") {
      return {
        status: "safe",
        title: "SAFE TO EAT — Quality Indicator Only!",
        badge: "Zero Health Risk",
        color: "border-emerald-300 bg-emerald-50 text-emerald-950",
        advice: "'Best Before' indicates peak manufacturer flavor, not microbial safety! Since your sensory checks (no mold, normal smell) passed, this food is 100% wholesome and edible.",
        divertAction: "Eat normally or use in a Zero-Waste recipe from Pillar 3."
      };
    }

    return {
      status: "safe",
      title: "Completely Safe to Enjoy",
      badge: "Passes All Safety Checks",
      color: "border-emerald-300 bg-emerald-50 text-emerald-950",
      advice: "Your food passes visual, olfactory, and date checks with zero flags. Cook and enjoy!",
      divertAction: "Store properly to maintain freshness."
    };
  };

  const verdict = calculateVerdict();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#0e382b] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-300" />
            <div>
              <h3 className="font-semibold text-lg">"Can I Still Eat This?" Sensory Triage</h3>
              <p className="text-xs text-emerald-200">Step-by-step evidence-based safety evaluation</p>
            </div>
          </div>
          <button onClick={onClose} className="text-emerald-200 hover:text-white p-1 rounded cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="bg-stone-50 px-6 py-3 border-b border-stone-200 flex items-center justify-between text-xs font-semibold text-stone-500">
          <span className={step >= 1 ? "text-emerald-800 font-bold" : ""}>1. Food Type</span>
          <span>→</span>
          <span className={step >= 2 ? "text-emerald-800 font-bold" : ""}>2. Sensory Check</span>
          <span>→</span>
          <span className={step >= 3 ? "text-emerald-800 font-bold" : ""}>3. Date Label</span>
          <span>→</span>
          <span className={step >= 4 ? "text-emerald-800 font-bold" : ""}>Verdict</span>
        </div>

        {/* Step 1: Food Type */}
        {step === 1 && (
          <div className="p-4 sm:p-6 space-y-4 text-sm">
            <h4 className="font-bold text-stone-900 text-base">What type of food are you assessing?</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: "produce", label: "Fresh Produce", desc: "Fruits, vegetables, herbs" },
                { id: "dairy", label: "Dairy & Eggs", desc: "Milk, yogurt, cheese, eggs" },
                { id: "bakery", label: "Bread & Bakery", desc: "Loaves, pastries, grains" },
                { id: "meat", label: "Meat & Seafood", desc: "Poultry, beef, fish, cold cuts" },
                { id: "canned", label: "Pantry & Canned", desc: "Beans, pasta, sauces, spices" }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setFoodType(t.id)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    foodType === t.id
                      ? "border-emerald-700 bg-emerald-50 ring-2 ring-emerald-700 font-semibold"
                      : "border-stone-200 hover:border-stone-300 bg-white"
                  }`}
                >
                  <p className="font-semibold text-stone-900">{t.label}</p>
                  <p className="text-[11px] text-stone-500 mt-0.5">{t.desc}</p>
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-1 px-5 py-2 bg-[#0e382b] hover:bg-[#16533f] text-white font-medium rounded-lg text-xs cursor-pointer"
              >
                <span>Next: Sensory Inspection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Sensory Inspection */}
        {step === 2 && (
          <div className="p-6 space-y-4 text-sm">
            <h4 className="font-bold text-stone-900 text-base">Sensory Inspection (Look & Smell)</h4>
            
            <div className="space-y-3">
              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  Is there any visible fuzzy mold, dark rot, or abnormal slimy film?
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setHasVisibleMold("no")}
                    className={`flex-1 py-2 rounded-lg border text-xs font-semibold cursor-pointer ${
                      hasVisibleMold === "no" ? "bg-emerald-700 text-white border-emerald-700" : "bg-stone-50 border-stone-200"
                    }`}
                  >
                    No Visible Mold
                  </button>
                  <button
                    onClick={() => setHasVisibleMold("yes")}
                    className={`flex-1 py-2 rounded-lg border text-xs font-semibold cursor-pointer ${
                      hasVisibleMold === "yes" ? "bg-red-700 text-white border-red-700" : "bg-stone-50 border-stone-200"
                    }`}
                  >
                    Yes, Mold / Slime Detected
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  Does it have a sour, rancid, ammoniac, or off smell?
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setHasBadOdor("no")}
                    className={`flex-1 py-2 rounded-lg border text-xs font-semibold cursor-pointer ${
                      hasBadOdor === "no" ? "bg-emerald-700 text-white border-emerald-700" : "bg-stone-50 border-stone-200"
                    }`}
                  >
                    Smells Normal / Fresh
                  </button>
                  <button
                    onClick={() => setHasBadOdor("yes")}
                    className={`flex-1 py-2 rounded-lg border text-xs font-semibold cursor-pointer ${
                      hasBadOdor === "yes" ? "bg-red-700 text-white border-red-700" : "bg-stone-50 border-stone-200"
                    }`}
                  >
                    Yes, Off / Sour Smell
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 text-stone-600 hover:text-stone-800 text-xs font-medium cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex items-center gap-1 px-5 py-2 bg-[#0e382b] hover:bg-[#16533f] text-white font-medium rounded-lg text-xs cursor-pointer"
              >
                <span>Next: Date Label Check</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Date Label */}
        {step === 3 && (
          <div className="p-6 space-y-4 text-sm">
            <h4 className="font-bold text-stone-900 text-base">Date Label Status</h4>
            <div className="space-y-2.5">
              {[
                { id: "beforeDate", label: "Date has NOT passed yet", sub: "Currently within printed date." },
                { id: "pastBestBefore", label: "Past 'Best Before' / 'Best If Used By' date", sub: "Common on pantry goods, yogurts, canned items, cheeses." },
                { id: "pastUseBy", label: "Past strict 'Use By' safety date", sub: "Common on fresh raw chicken, raw fish, deli pâté." }
              ].map(d => (
                <button
                  key={d.id}
                  onClick={() => setDateStatus(d.id)}
                  className={`w-full p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    dateStatus === d.id
                      ? "border-emerald-700 bg-emerald-50 ring-2 ring-emerald-700 font-semibold"
                      : "border-stone-200 hover:border-stone-300 bg-white"
                  }`}
                >
                  <p className="font-semibold text-stone-900">{d.label}</p>
                  <p className="text-[11px] text-stone-500 mt-0.5">{d.sub}</p>
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-200 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 text-stone-600 hover:text-stone-800 text-xs font-medium cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex items-center gap-1 px-5 py-2 bg-[#0e382b] hover:bg-[#16533f] text-white font-medium rounded-lg text-xs cursor-pointer"
              >
                <span>Generate Verdict</span>
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Final Verdict */}
        {step === 4 && (
          <div className="p-6 space-y-4 text-sm">
            <div className={`p-4.5 rounded-xl border ${verdict.color}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/80 border">
                  {verdict.badge}
                </span>
                {verdict.status === "safe" && <CheckCircle2 className="w-5 h-5 text-emerald-700" />}
                {verdict.status === "salvage" && <AlertTriangle className="w-5 h-5 text-amber-700" />}
                {verdict.status === "danger" && <ShieldAlert className="w-5 h-5 text-red-700" />}
              </div>

              <h4 className="font-bold text-base md:text-lg mb-1">{verdict.title}</h4>
              <p className="text-xs leading-relaxed mb-3">{verdict.advice}</p>

              <div className="pt-2.5 border-t border-stone-300/60 text-xs font-semibold">
                <span>Recommended Divert Route: </span>
                <span className="font-normal">{verdict.divertAction}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200 flex justify-between gap-3">
              <button
                onClick={handleReset}
                className="flex items-center gap-1 px-3.5 py-2 text-stone-600 hover:text-stone-900 text-xs font-medium cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Test Another Item</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 bg-[#0e382b] hover:bg-[#16533f] text-white font-medium rounded-lg text-xs cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
