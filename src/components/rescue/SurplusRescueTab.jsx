import React, { useState } from "react";
import { 
  ChefHat, 
  Sparkles, 
  Check, 
  Clock, 
  DollarSign, 
  Leaf, 
  Share2, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Play
} from "lucide-react";
import { useFoodWaste } from "../../context/FoodWasteContext";
import { rescueRecipes } from "../../data/rescueRecipes";
import { getUrgencyLevel } from "../../utils/dateUtils";
import { CommunitySharingModal } from "./CommunitySharingModal";
import { CookingModeModal } from "./CookingModeModal";

export const SurplusRescueTab = () => {
  const { 
    pantryItems, 
    consumeItem, 
    selectedRescueIngredients, 
    setSelectedRescueIngredients, 
    toggleRescueIngredient 
  } = useFoodWaste();

  const [expandedRecipeId, setExpandedRecipeId] = useState("recipe-frittata");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [cookingRecipeTarget, setCookingRecipeTarget] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("all");

  const activePantryItems = pantryItems.filter(i => !i.consumed);

  // Quick action: select all critical items
  const handleSelectAllCritical = () => {
    const criticalNames = activePantryItems
      .filter(i => getUrgencyLevel(i.expiryDate, i.isFrozen) === "critical" || getUrgencyLevel(i.expiryDate, i.isFrozen) === "expired")
      .map(i => i.name);
    setSelectedRescueIngredients(criticalNames);
  };

  // Recipe matching logic
  const scoredRecipes = rescueRecipes
    .filter(recipe => {
      if (categoryFilter === "all") return true;
      if (categoryFilter === "quick") return recipe.prepTime.includes("15") || recipe.prepTime.includes("8");
      if (categoryFilter === "skillet") return recipe.category === "Quick Skillet";
      if (categoryFilter === "bake") return recipe.category === "Bake & Casserole";
      return true;
    })
    .map(recipe => {
      const targets = recipe.primaryTargetIngredients.map(t => t.toLowerCase());
      
      // Count how many user-selected ingredients match this recipe
      let matchCount = 0;
      selectedRescueIngredients.forEach(sel => {
        const s = sel.toLowerCase();
        if (targets.some(t => t.includes(s) || s.includes(t))) {
          matchCount++;
        }
      });

      // Score: if user hasn't selected anything, base on general availability in active pantry
      let availableCount = 0;
      activePantryItems.forEach(item => {
        const iName = item.name.toLowerCase();
        if (targets.some(t => t.includes(iName) || iName.includes(t))) {
          availableCount++;
        }
      });

      const totalTargets = targets.length;
      const matchPct = selectedRescueIngredients.length > 0
        ? Math.min(100, Math.round((matchCount / Math.max(1, Math.min(3, totalTargets))) * 100))
        : Math.min(100, Math.round((availableCount / totalTargets) * 100));

      return {
        ...recipe,
        matchPct,
        matchCount: selectedRescueIngredients.length > 0 ? matchCount : availableCount
      };
    }).sort((a, b) => b.matchPct - a.matchPct);

  // Quick 1-click rescue
  const handleQuickRescue = (recipe) => {
    const targets = recipe.primaryTargetIngredients.map(t => t.toLowerCase());
    activePantryItems.forEach(item => {
      const iName = item.name.toLowerCase();
      if (targets.some(t => t.includes(iName) || iName.includes(t))) {
        consumeItem(item.id);
      }
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-2 duration-300">
      {/* Top Banner & Multi-Ingredient Picker */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
                <ChefHat className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 text-base md:text-lg">Surplus Utilization & Rescue Engine</h3>
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full">
                  Pillar 3 Active
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-600 mt-1 max-w-2xl leading-relaxed">
              Select any expiring or leftover ingredients currently in your kitchen. Our algorithm identifies flexible, zero-waste recipes designed specifically to salvage odds-and-ends.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-stone-600" />
              <span>Community Share</span>
            </button>
          </div>
        </div>

        {/* Clickable ingredient chips from active pantry */}
        <div className="pt-4 border-t border-stone-100">
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <span className="text-xs font-bold text-stone-700">
              Check off ingredients to rescue ({selectedRescueIngredients.length} selected):
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSelectAllCritical}
                className="text-xs text-red-700 hover:text-red-900 font-bold cursor-pointer"
              >
                + Select All Critical (0-2d)
              </button>
              {selectedRescueIngredients.length > 0 && (
                <button
                  onClick={() => setSelectedRescueIngredients([])}
                  className="text-xs text-stone-400 hover:text-stone-700 cursor-pointer font-medium"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {activePantryItems.map(item => {
              const isSelected = selectedRescueIngredients.includes(item.name);
              const urgency = getUrgencyLevel(item.expiryDate, item.isFrozen);

              return (
                <button
                  key={item.id}
                  onClick={() => toggleRescueIngredient(item.name)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? "bg-[#0a2e20] text-white shadow-xs ring-2 ring-emerald-600"
                      : urgency === "critical"
                      ? "bg-red-50 hover:bg-red-100 text-red-900 border border-red-200"
                      : urgency === "warning"
                      ? "bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200"
                      : "bg-stone-100 hover:bg-stone-200 text-stone-700"
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 text-emerald-300" />}
                  <span>{item.name}</span>
                  <span className="text-[10px] opacity-70 font-mono">({item.quantity} {item.unit})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recipe Filters & Header */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="font-bold text-stone-900 text-base md:text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              Ranked Zero-Waste Recipes ({scoredRecipes.length})
            </h4>
            <span className="text-xs text-stone-500">
              {selectedRescueIngredients.length > 0 
                ? `Prioritized for ${selectedRescueIngredients.length} selected ingredients` 
                : "Ranked by overall active pantry ingredients"}
            </span>
          </div>

          {/* Quick Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            {[
              { id: "all", label: "All Recipes" },
              { id: "quick", label: "⚡ <15 Mins" },
              { id: "skillet", label: "🍳 Skillet" },
              { id: "bake", label: "🥧 Bake" }
            ].map(c => (
              <button
                key={c.id}
                onClick={() => setCategoryFilter(c.id)}
                className={`px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
                  categoryFilter === c.id
                    ? "bg-[#0a2e20] text-white shadow-xs"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Recipe Cards with Photography */}
        <div className="grid gap-4">
          {scoredRecipes.map((recipe) => {
            const isExpanded = expandedRecipeId === recipe.id;

            return (
              <div
                key={recipe.id}
                className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-2xs hover:border-emerald-300 transition-all hover:shadow-lg flex flex-col"
              >
                {/* Recipe Header Row with Image Thumbnail */}
                <div 
                  onClick={() => setExpandedRecipeId(isExpanded ? null : recipe.id)}
                  className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-stone-50/60"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 sm:gap-4 flex-1 w-full">
                    {/* Responsive Image Thumbnail */}
                    {recipe.imageUrl && (
                      <div className="w-full sm:w-24 h-40 sm:h-24 rounded-2xl overflow-hidden shrink-0 bg-stone-100 shadow-2xs">
                        <img
                          src={recipe.imageUrl}
                          alt={recipe.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    <div className="space-y-1.5 flex-1 min-w-0 w-full">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-extrabold text-stone-900 text-base md:text-lg">
                          {recipe.title}
                        </h4>
                        <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full font-mono ${
                          recipe.matchPct >= 70
                            ? "bg-emerald-100 text-emerald-950 border border-emerald-300"
                            : recipe.matchPct >= 40
                            ? "bg-amber-100 text-amber-950 border border-amber-300"
                            : "bg-stone-100 text-stone-700"
                        }`}>
                          {recipe.matchPct}% Match
                        </span>
                        <span className="text-[10px] uppercase font-bold tracking-wider bg-stone-100 text-stone-600 px-2 py-0.5 rounded">
                          {recipe.category}
                        </span>
                      </div>

                      <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                        {recipe.subtitle}
                      </p>

                      <div className="flex items-center gap-3 sm:gap-4 text-xs text-stone-500 pt-0.5 font-mono flex-wrap">
                        <span className="flex items-center gap-1 font-sans text-stone-600">
                          <Clock className="w-3.5 h-3.5 text-stone-400" />
                          {recipe.prepTime}
                        </span>
                        <span className="flex items-center gap-1 text-emerald-700 font-bold">
                          <Leaf className="w-3.5 h-3.5" />
                          ~{recipe.co2SavedKg} kg CO₂e
                        </span>
                        <span className="flex items-center gap-1 text-stone-800 font-bold">
                          <span className="text-emerald-700 font-bold">₹</span>
                          Save ~₹{recipe.moneySavedEst}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-between sm:justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                    {/* Guided Cooking Mode button with timer */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCookingRecipeTarget(recipe);
                      }}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 bg-[#0a2e20] hover:bg-[#134533] text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer hover:shadow-md transition-all"
                      title="Launch full-screen step-by-step cooking mode with kitchen timer"
                    >
                      <Play className="w-3.5 h-3.5 fill-emerald-300 text-emerald-300" />
                      <span>Cook & Timer</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuickRescue(recipe);
                      }}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1 px-3 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 rounded-xl text-xs font-bold cursor-pointer"
                      title="Quick mark matching ingredients eaten"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Quick Rescue</span>
                    </button>

                    <button 
                      className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="p-6 pt-0 border-t border-stone-100 bg-stone-50/50 space-y-4 text-xs">
                    {/* Zero waste secret tip */}
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-amber-950">
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold text-amber-950 block mb-0.5">Culinary Zero-Waste Secret:</strong>
                        <p className="leading-relaxed">{recipe.zeroWasteSecret}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Ingredients */}
                      <div>
                        <h5 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-2.5">
                          Ingredients & Adaptations
                        </h5>
                        <ul className="space-y-1.5">
                          {recipe.ingredients.map((ing, idx) => (
                            <li key={idx} className="flex items-center justify-between text-stone-700 py-1 border-b border-stone-200/60">
                              <span>{ing.name}</span>
                              <span className="font-mono text-stone-500">{ing.qty}</span>
                            </li>
                          ))}
                        </ul>

                        <p className="text-[11px] text-stone-500 mt-3 italic leading-relaxed">
                          <strong>Substitutions:</strong> {recipe.flexibleReplacements}
                        </p>
                      </div>

                      {/* Instructions */}
                      <div>
                        <h5 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-2.5">
                          Preparation Steps
                        </h5>
                        <ol className="space-y-2.5 list-decimal list-inside text-stone-700">
                          {recipe.instructions.map((step, idx) => (
                            <li key={idx} className="leading-relaxed">
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Community Sharing Modal */}
      <CommunitySharingModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      {/* Interactive Cooking Mode Modal */}
      <CookingModeModal
        isOpen={!!cookingRecipeTarget}
        onClose={() => setCookingRecipeTarget(null)}
        recipe={cookingRecipeTarget}
      />
    </div>
  );
};
