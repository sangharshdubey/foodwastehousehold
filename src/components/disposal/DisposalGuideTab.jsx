import React, { useState } from "react";
import { 
  Recycle, 
  HelpCircle, 
  Leaf, 
  Search, 
  Check, 
  X as XIcon, 
  AlertTriangle, 
  Sparkles, 
  RotateCw, 
  Truck 
} from "lucide-react";
import { dateLabelTaxonomy, compostingStreams, foodItemDisposalDirectory } from "../../data/disposalRules";
import { TriageWizardModal } from "./TriageWizardModal";

export const DisposalGuideTab = () => {
  const [isTriageOpen, setIsTriageOpen] = useState(false);
  const [selectedStreamIndex, setSelectedStreamIndex] = useState(0);
  const [directorySearch, setDirectorySearch] = useState("");

  const filteredDirectory = foodItemDisposalDirectory.filter(item => 
    item.name.toLowerCase().includes(directorySearch.toLowerCase()) ||
    item.bestDivert.toLowerCase().includes(directorySearch.toLowerCase())
  );

  const activeStream = compostingStreams[selectedStreamIndex];

  return (
    <div className="space-y-6">
      {/* Top Banner & Triage Launcher */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-800 shrink-0">
              <Recycle className="w-5 h-5 text-teal-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-stone-900 text-base">Responsible Disposal & Composting Triage</h3>
                <span className="text-[11px] bg-teal-100 text-teal-900 font-semibold px-2 py-0.5 rounded-full">
                  Pillar 4 Active
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-1 max-w-2xl leading-relaxed">
                When food cannot be consumed, landfill disposal is an environmental catastrophe: decaying organics generate potent methane ($CH_4$). 
                Use this guide to distinguish safe food from true waste and divert inedible organic matter into nutrient-rich soil.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsTriageOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#0e382b] hover:bg-[#16533f] text-white rounded-xl text-xs md:text-sm font-semibold shadow-xs transition-all shrink-0 cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-emerald-300" />
            <span>"Can I Still Eat This?" Wizard</span>
          </button>
        </div>
      </div>

      {/* Date Label Demystifier Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-stone-900 text-base">
            Date Label Demystifier: Safety vs Quality
          </h4>
          <span className="text-xs text-stone-500">Based on FSSAI (Food Safety and Standards Authority of India) & Swachh Bharat</span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dateLabelTaxonomy.map((label, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-stone-200 p-4 flex flex-col justify-between shadow-2xs hover:border-stone-300 transition-colors"
            >
              <div>
                <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2 ${
                  label.color === "emerald" ? "bg-emerald-100 text-emerald-800" :
                  label.color === "rose" ? "bg-rose-100 text-rose-800" :
                  label.color === "blue" ? "bg-blue-100 text-blue-800" : "bg-amber-100 text-amber-800"
                }`}>
                  {label.badge}
                </span>

                <h5 className="font-bold text-stone-900 text-sm">{label.type}</h5>
                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">{label.meaning}</p>
              </div>

              <div className="mt-3 pt-3 border-t border-stone-100 text-[11px]">
                <strong className="text-stone-900 block mb-0.5">Consumer Rule:</strong>
                <p className="text-stone-600 leading-tight">{label.safetyVerdict}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Composting Stream Navigator */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h4 className="font-bold text-stone-900 text-base flex items-center gap-2">
            <Leaf className="w-4 h-4 text-emerald-600" />
            Organic Waste Diversion Streams
          </h4>
          <span className="text-xs text-stone-500">Select system to view permitted inputs</span>
        </div>

        {/* Stream tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {compostingStreams.map((stream, idx) => (
            <button
              key={stream.stream}
              onClick={() => setSelectedStreamIndex(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedStreamIndex === idx
                  ? "bg-[#0e382b] text-white shadow-xs"
                  : "bg-stone-100 hover:bg-stone-200 text-stone-700"
              }`}
            >
              {stream.stream}
            </button>
          ))}
        </div>

        {/* Selected Stream Details */}
        <div className="bg-stone-50/70 border border-stone-200/80 rounded-xl p-4.5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h5 className="font-bold text-stone-900 text-sm">{activeStream.summary}</h5>
            <span className="text-xs text-stone-500 italic bg-white px-2.5 py-1 rounded border border-stone-200">
              Pro-Tip: {activeStream.proTip}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-xs">
            {/* Allowed */}
            <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-3.5">
              <h6 className="font-bold text-emerald-950 flex items-center gap-1.5 mb-2">
                <Check className="w-4 h-4 text-emerald-700" />
                Permitted Organic Inputs
              </h6>
              <ul className="space-y-1 text-emerald-900">
                {activeStream.allowed.map((item, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prohibited */}
            <div className="bg-red-50/40 border border-red-200 rounded-xl p-3.5">
              <h6 className="font-bold text-red-950 flex items-center gap-1.5 mb-2">
                <XIcon className="w-4 h-4 text-red-600" />
                Prohibited / Avoid
              </h6>
              <ul className="space-y-1 text-red-900">
                {activeStream.prohibited.map((item, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-red-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Searchable Waste Directory */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="font-bold text-stone-900 text-base">
              Common Household Scraps Disposal Directory
            </h4>
            <p className="text-xs text-stone-500 mt-0.5">
              Instant divert decisions for confusing kitchen odds-and-ends
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search scrap (e.g. eggshells, milk)..."
              value={directorySearch}
              onChange={(e) => setDirectorySearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border border-stone-200 rounded-lg text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-700 bg-stone-50"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3 text-xs">
          {filteredDirectory.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/30 hover:bg-white transition-colors">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-bold text-stone-900 text-sm">{item.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-medium">
                  {item.bestDivert}
                </span>
              </div>
              <p className="text-stone-600 leading-relaxed mt-1">
                <strong className="text-stone-800">Action: </strong>{item.action}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Triage Wizard Modal */}
      <TriageWizardModal
        isOpen={isTriageOpen}
        onClose={() => setIsTriageOpen(false)}
      />
    </div>
  );
};
