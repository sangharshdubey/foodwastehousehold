import React, { useState } from "react";
import { X, ShoppingCart, Check, Plus, AlertCircle, Sparkles } from "lucide-react";
import { useFoodWaste } from "../../context/FoodWasteContext";
import { rescueRecipes } from "../../data/rescueRecipes";

export const SmartGroceryModal = ({ isOpen, onClose }) => {
  const { mealPlan, pantryItems, addItem } = useFoodWaste();
  const [checkedItems, setCheckedItems] = useState({});

  if (!isOpen) return null;

  // Aggregate ingredients required across the weekly meal plan
  const neededMap = new Map();

  Object.values(mealPlan).forEach((daySlots) => {
    Object.values(daySlots).forEach((meal) => {
      if (meal?.recipeId) {
        const recipe = rescueRecipes.find((r) => r.id === meal.recipeId);
        if (recipe) {
          recipe.ingredients.forEach((ing) => {
            const normalized = ing.name.toLowerCase();
            if (!neededMap.has(normalized)) {
              neededMap.set(normalized, {
                rawName: ing.name,
                qty: ing.qty,
                fromRecipe: recipe.title
              });
            }
          });
        }
      }
    });
  });

  // Cross-reference against current active pantry items
  const activePantryNames = pantryItems
    .filter((i) => !i.consumed)
    .map((i) => i.name.toLowerCase());

  const inStock = [];
  const needToBuy = [];

  neededMap.forEach((details, key) => {
    const isOwned = activePantryNames.some((pName) =>
      pName.includes(key) || key.includes(pName)
    );

    if (isOwned) {
      inStock.push(details);
    } else {
      needToBuy.push(details);
    }
  });

  const toggleCheck = (name) => {
    setCheckedItems((prev) => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleAddPurchasedToPantry = (item) => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    addItem({
      name: item.rawName,
      category: "Produce",
      location: "fridge",
      quantity: 1,
      unit: item.qty || "portion",
      costEst: 40,
      weightKg: 0.3,
      expiryDate: d.toISOString().split("T")[0],
      purchaseDate: new Date().toISOString().split("T")[0],
      storageTip: "Freshly purchased for weekly meal plan."
    });
    toggleCheck(item.rawName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#0e382b] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <ShoppingCart className="w-5 h-5 text-emerald-300" />
            <div>
              <h3 className="font-semibold text-lg">Smart Grocery List & Anti-Duplicate Sync</h3>
              <p className="text-xs text-emerald-200">
                Cross-referenced with your live pantry to prevent over-purchasing
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-emerald-200 hover:text-white p-1 rounded cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Missing / Need to buy section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-stone-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                Missing Ingredients to Purchase ({needToBuy.length})
              </h4>
              <span className="text-[11px] text-stone-500 font-mono">Deduplicated</span>
            </div>

            {needToBuy.length === 0 ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>All scheduled recipe ingredients are already in your kitchen pantry! Zero purchase needed.</span>
              </div>
            ) : (
              <div className="space-y-2">
                {needToBuy.map((item) => {
                  const isChecked = !!checkedItems[item.rawName];
                  return (
                    <div
                      key={item.rawName}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                        isChecked
                          ? "bg-stone-50 border-stone-200 text-stone-400 line-through"
                          : "bg-white border-stone-200 hover:border-emerald-300 shadow-2xs"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleCheck(item.rawName)}
                          className="h-4 w-4 rounded border-stone-300 text-emerald-700 focus:ring-emerald-700 cursor-pointer"
                        />
                        <div>
                          <p className="font-semibold text-stone-900">{item.rawName}</p>
                          <p className="text-xs text-stone-500">
                            Required: {item.qty} • For: {item.fromRecipe}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleAddPurchasedToPantry(item)}
                        className="text-xs px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-medium rounded-lg transition-colors cursor-pointer"
                        title="Add to active pantry inventory"
                      >
                        + Add to Pantry
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Already in pantry section */}
          <div>
            <h4 className="font-bold text-stone-900 flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              Already in Your Fridge / Pantry ({inStock.length})
            </h4>

            <div className="space-y-2">
              {inStock.map((item) => (
                <div
                  key={item.rawName}
                  className="p-2.5 rounded-xl border border-emerald-100 bg-emerald-50/40 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2 text-emerald-950 font-medium">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item.rawName}</span>
                    <span className="text-stone-500 text-[11px]">({item.qty})</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    In Stock
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-stone-50 px-6 py-3 border-t border-stone-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#0e382b] hover:bg-[#16533f] text-white text-xs font-semibold rounded-lg cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
