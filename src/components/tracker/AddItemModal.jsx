import React, { useState } from "react";
import { X, Plus, AlertCircle, Sparkles } from "lucide-react";
import { useFoodWaste } from "../../context/FoodWasteContext";

const categoryDefaults = {
  Produce: { days: 5, location: "fridge", tip: "Store in a dry cotton cloth bag or crisper drawer.", cost: 35, weight: 0.25 },
  Dairy: { days: 7, location: "fridge", tip: "Boil milk or keep paneer submerged in fresh water.", cost: 65, weight: 0.5 },
  Protein: { days: 2, location: "fridge", tip: "Cook within 48h or freeze immediately.", cost: 110, weight: 0.45 },
  Bakery: { days: 3, location: "countertop", tip: "Keep in a clean dry dabba. Reheat on tawa with ghee.", cost: 40, weight: 0.25 },
  Leftovers: { days: 3, location: "fridge", tip: "Store in airtight steel dabba or glass box.", cost: 50, weight: 0.35 },
  Pantry: { days: 90, location: "pantry", tip: "Keep in airtight jar with neem/bay leaves away from dampness.", cost: 80, weight: 0.5 }
};

export const AddItemModal = ({ isOpen, onClose }) => {
  const { addItem } = useFoodWaste();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");
  const [location, setLocation] = useState("fridge");
  const [quantity, setQuantity] = useState("1");
  const [unit, setUnit] = useState("item");
  const [costEst, setCostEst] = useState("35");
  const [weightKg, setWeightKg] = useState("0.25");
  
  // calculate default expiry date based on category
  const getDefaultExpiry = (cat) => {
    const d = new Date();
    const days = categoryDefaults[cat]?.days || 5;
    d.setDate(d.getDate() + days);
    return d.toISOString().split("T")[0];
  };

  const [expiryDate, setExpiryDate] = useState(() => getDefaultExpiry("Produce"));
  const [storageTip, setStorageTip] = useState(() => categoryDefaults["Produce"].tip);

  if (!isOpen) return null;

  const handleCategoryChange = (e) => {
    const cat = e.target.value;
    setCategory(cat);
    const defaults = categoryDefaults[cat];
    if (defaults) {
      setLocation(defaults.location);
      setStorageTip(defaults.tip);
      setCostEst(defaults.cost.toString());
      setWeightKg(defaults.weight.toString());
      setExpiryDate(getDefaultExpiry(cat));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    addItem({
      name: name.trim(),
      category,
      location,
      quantity: Number(quantity) || 1,
      unit,
      costEst: Number(costEst) || 35,
      weightKg: Number(weightKg) || 0.25,
      expiryDate,
      purchaseDate: new Date().toISOString().split("T")[0],
      storageTip: storageTip || "Stored carefully in Indian household pantry."
    });

    onClose();
    setName("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#0e382b] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-emerald-300" />
            <h3 className="font-semibold text-lg">Log New Grocery / Pantry Item</h3>
          </div>
          <button onClick={onClose} className="text-emerald-200 hover:text-white p-1 rounded cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-stone-800 text-sm">
          <div>
            <label className="block font-medium text-stone-700 mb-1">Item Name *</label>
            <input
              type="text"
              required
              placeholder="e.g., Desi Palak, Malai Paneer, Leftover Rotis, Amul Milk"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block font-medium text-stone-700 mb-1">Category</label>
              <select
                value={category}
                onChange={handleCategoryChange}
                className="w-full px-3.5 py-2 border border-stone-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
              >
                <option value="Produce">Fresh Produce</option>
                <option value="Dairy">Dairy & Eggs</option>
                <option value="Protein">Meat, Seafood & Tofu</option>
                <option value="Bakery">Bakery & Bread</option>
                <option value="Leftovers">Prepared Leftovers</option>
                <option value="Pantry">Pantry Staples</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">Storage Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2 border border-stone-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
              >
                <option value="fridge">Refrigerator</option>
                <option value="countertop">Countertop / Fruit Bowl</option>
                <option value="pantry">Dry Pantry</option>
                <option value="freezer">Freezer</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block font-medium text-stone-700 mb-1">Estimated Expiry Date</label>
              <input
                type="date"
                required
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full px-3.5 py-2 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">Quantity & Unit</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-20 px-3 py-2 border border-stone-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="tub, box, kg, loaf"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="flex-1 px-3 py-2 border border-stone-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block font-medium text-stone-700 mb-1">Estimated Cost (₹)</label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={costEst}
                onChange={(e) => setCostEst(e.target.value)}
                className="w-full px-3.5 py-2 border border-stone-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">Estimated Weight (kg)</label>
              <input
                type="number"
                min="0.05"
                step="0.05"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                className="w-full px-3.5 py-2 border border-stone-300 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-stone-700 mb-1">Preservation Recommendation</label>
            <input
              type="text"
              value={storageTip}
              onChange={(e) => setStorageTip(e.target.value)}
              className="w-full px-3.5 py-2 border border-stone-300 rounded-lg text-xs text-stone-600 bg-stone-50"
            />
          </div>

          {/* Action buttons */}
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
              className="px-5 py-2 bg-[#0e382b] hover:bg-[#16533f] text-white font-medium rounded-lg shadow-sm cursor-pointer"
            >
              Add to Inventory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
