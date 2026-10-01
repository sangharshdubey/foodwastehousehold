import React, { useState } from "react";
import { X, ChefHat, Check, Clock, Plus } from "lucide-react";
import { rescueRecipes } from "../../data/rescueRecipes";
import { useFoodWaste } from "../../context/FoodWasteContext";

export const EditMealModal = ({ isOpen, onClose, day, slot, currentMeal }) => {
  const { updateMeal, pantryItems } = useFoodWaste();

  const [title, setTitle] = useState(currentMeal?.title || "");
  const [servings, setServings] = useState(currentMeal?.servings || 2);
  const [notes, setNotes] = useState(currentMeal?.notes || "");
  const [selectedRecipeId, setSelectedRecipeId] = useState(currentMeal?.recipeId || "");

  if (!isOpen) return null;

  const handleSelectPrebuilt = (recipe) => {
    setTitle(recipe.title);
    setSelectedRecipeId(recipe.id);
    setNotes(recipe.subtitle);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    updateMeal(day, slot, {
      title: title.trim(),
      recipeId: selectedRecipeId || null,
      servings: Number(servings) || 2,
      notes: notes.trim(),
      status: "planned"
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#0e382b] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-semibold text-lg">Schedule Meal: {day} {slot}</h3>
            <p className="text-xs text-emerald-200">
              Align with expiring inventory to prevent food waste
            </p>
          </div>
          <button onClick={onClose} className="text-emerald-200 hover:text-white p-1 rounded cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-stone-800">
          {/* Quick pick from zero-waste catalog */}
          <div>
            <label className="block font-medium text-stone-700 mb-2 flex items-center gap-1.5">
              <ChefHat className="w-4 h-4 text-emerald-700" />
              Quick Pick: Zero-Waste Rescue Recipes
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {rescueRecipes.map((r) => (
                <button
                  type="button"
                  key={r.id}
                  onClick={() => handleSelectPrebuilt(r)}
                  className={`p-2.5 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                    selectedRecipeId === r.id
                      ? "border-emerald-700 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-700"
                      : "border-stone-200 hover:border-stone-300 bg-stone-50"
                  }`}
                >
                  <div className="font-semibold text-stone-900 truncate">{r.title}</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">{r.prepTime} • {r.difficulty}</div>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 pt-3 border-t border-stone-200">
            <div>
              <label className="block font-medium text-stone-700 mb-1">Meal Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Vegetable Stir-Fry with Leftover Rice"
                className="w-full px-3.5 py-2 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">Servings</label>
              <input
                type="number"
                min="1"
                max="12"
                value={servings}
                onChange={(e) => setServings(e.target.value)}
                className="w-24 px-3 py-2 border border-stone-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">Notes / Ingredient Strategy</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Uses up the open spinach box and half carton of milk."
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
                className="px-5 py-2 bg-[#0e382b] hover:bg-[#16533f] text-white font-medium rounded-lg shadow-sm cursor-pointer"
              >
                Save to Calendar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
