import React, { useState } from "react";
import { X, Share2, Heart, MapPin, Check, Sparkles } from "lucide-react";
import { useFoodWaste } from "../../context/FoodWasteContext";

export const CommunitySharingModal = ({ isOpen, onClose }) => {
  const { pantryItems, deleteItem } = useFoodWaste();
  const [selectedItemId, setSelectedItemId] = useState("");
  const [targetLocation, setTargetLocation] = useState("Robin Hood Army Community Node");
  const [sharedDone, setSharedDone] = useState(false);

  if (!isOpen) return null;

  const eligibleItems = pantryItems.filter(i => !i.consumed);

  const handleShare = (e) => {
    e.preventDefault();
    if (!selectedItemId) return;
    deleteItem(selectedItemId);
    setSharedDone(true);
    setTimeout(() => {
      setSharedDone(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#0e382b] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-emerald-300" />
            <h3 className="font-semibold text-lg">Community Food Share Network</h3>
          </div>
          <button onClick={onClose} className="text-emerald-200 hover:text-white p-1 rounded cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {sharedDone ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 text-emerald-700" />
            </div>
            <h4 className="font-bold text-stone-900 text-base">Surplus Food Shared!</h4>
            <p className="text-xs text-stone-600">
              Notified neighbors and volunteers near {targetLocation}. Thank you for diverting edible food from landfill!
            </p>
          </div>
        ) : (
          <form onSubmit={handleShare} className="p-6 space-y-4 text-sm text-stone-800">
            <p className="text-xs text-stone-600 leading-relaxed">
              Have bulk unopened staples, fresh sabzi surplus, or excess groceries before traveling? Post to a nearby grassroots community fridge or Robin Hood Army volunteer node.
            </p>

            <div>
              <label className="block font-medium text-stone-700 mb-1">Select Surplus Item from Pantry *</label>
              <select
                required
                value={selectedItemId}
                onChange={(e) => setSelectedItemId(e.target.value)}
                className="w-full px-3.5 py-2 border border-stone-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
              >
                <option value="">-- Choose item to donate --</option>
                {eligibleItems.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name} ({item.quantity} {item.unit})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">Drop-off Destination *</label>
              <select
                value={targetLocation}
                onChange={(e) => setTargetLocation(e.target.value)}
                className="w-full px-3.5 py-2 border border-stone-300 rounded-lg bg-white"
              >
                <option value="Robin Hood Army Community Node">Robin Hood Army Community Node (0.8 km)</option>
                <option value="Feeding India / Rotary Community Fridge">Feeding India / Rotary Community Fridge (1.2 km)</option>
                <option value="Local Gaushala (Gau Grasa Safe Produce)">Local Gaushala (Gau Grasa Veg Scraps & Rotis - 0.6 km)</option>
                <option value="Apartment Society / RWA Sharing Hub">Apartment Society / RWA Sharing Hub (In-building)</option>
              </select>
            </div>

            <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
              <Heart className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                Donating safe surplus feeds local community members and immediately reduces municipal organic landfill burdens.
              </span>
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
                disabled={!selectedItemId}
                className="px-5 py-2 bg-[#0e382b] hover:bg-[#16533f] text-white font-medium rounded-lg shadow-sm disabled:opacity-50 cursor-pointer"
              >
                Post Surplus Donation
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
