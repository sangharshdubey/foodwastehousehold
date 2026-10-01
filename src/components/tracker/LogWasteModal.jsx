import React, { useState } from "react";
import { X, Trash2, AlertTriangle, HelpCircle } from "lucide-react";
import { useFoodWaste } from "../../context/FoodWasteContext";

export const LogWasteModal = ({ isOpen, onClose, item }) => {
  const { logWasteItem } = useFoodWaste();

  const [rootCause, setRootCause] = useState("Forgotten in fridge / lack of visibility");
  const [disposalMethod, setDisposalMethod] = useState("Landfill");
  const [reflection, setReflection] = useState("");

  if (!isOpen || !item) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    logWasteItem(item, rootCause, disposalMethod, reflection);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-red-400" />
            <h3 className="font-semibold text-lg">Log Food Waste Incident</h3>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-white p-1 rounded cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm text-stone-800">
          <div className="bg-red-50 border border-red-200/80 rounded-xl p-3.5 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-stone-900">{item.name}</p>
              <p className="text-xs text-stone-600 mt-0.5">
                Quantity: {item.quantity} {item.unit} • Est. Value Lost: ₹{Number(item.costEst)} • Weight: {item.weightKg} kg
              </p>
            </div>
          </div>

          <div>
            <label className="block font-medium text-stone-700 mb-1">
              Primary Root Cause (For Household Audit) *
            </label>
            <select
              value={rootCause}
              onChange={(e) => setRootCause(e.target.value)}
              className="w-full px-3.5 py-2 border border-stone-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-red-600"
            >
              <option value="Forgotten in fridge / lack of visibility">Forgotten in fridge / hidden behind dabbas</option>
              <option value="Over-purchased / bought excess sabzi on deal">Over-purchased excess sabzi / impulse mandi buy</option>
              <option value="Misread date label ('Best Before' assumed expired)">Misread FSSAI "Best Before" as spoiled</option>
              <option value="Cooked excessive portion sizes (excess rice/rotis)">Cooked excessive portion sizes (leftover rotis/dal/chawal)</option>
              <option value="Improper storage / moisture condensation">Improper storage / moisture rot in plastic pouch</option>
              <option value="Family member preference / stale texture">Family member skipped meal / food turned stale</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-stone-700 mb-1">
              Disposal Destination *
            </label>
            <select
              value={disposalMethod}
              onChange={(e) => setDisposalMethod(e.target.value)}
              className="w-full px-3.5 py-2 border border-stone-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-stone-600"
            >
              <option value="Swachh Bharat Green Bin">Swachh Bharat Green Bin (Municipal Wet Waste)</option>
              <option value="Gau Grasa (Cow Feed)">Traditional Gau Grasa (Gaushala / Stray Cattle Feed)</option>
              <option value="Terracotta Khamba">Terracotta Khamba (Aerobic Apartment Composting)</option>
              <option value="Bokashi Fermentation">Bokashi Anaerobic Fermentation</option>
              <option value="Landfill">Black Bin Landfill (High Methane Risk)</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-stone-700 mb-1">
              Behavioral Reflection / Prevention Idea
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Next time freeze half immediately upon buying or keep in front row."
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              className="w-full px-3.5 py-2 border border-stone-300 rounded-lg text-xs"
            />
          </div>

          <div className="pt-3 border-t border-stone-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-stone-600 hover:text-stone-800 font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-sm cursor-pointer"
            >
              Record in Audit Log
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
