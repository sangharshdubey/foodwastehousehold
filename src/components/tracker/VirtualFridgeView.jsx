import React from "react";
import { 
  CheckCircle2, 
  Snowflake, 
  Trash2, 
  ChefHat, 
  Clock, 
  Sparkles, 
  Thermometer, 
  HelpCircle 
} from "lucide-react";
import { useFoodWaste } from "../../context/FoodWasteContext";
import { getDaysUntil, getUrgencyLevel, formatRelativeDate, getUrgencyBadgeConfig } from "../../utils/dateUtils";

export const VirtualFridgeView = ({ onRescueInChef, onLogWaste }) => {
  const { pantryItems, consumeItem, freezeItem } = useFoodWaste();

  const activeItems = pantryItems.filter(i => !i.consumed);

  // Categorize items onto physical refrigerator & pantry shelves
  const topShelfItems = activeItems.filter(i => i.location === "fridge" && (i.category === "Leftovers" || i.name.toLowerCase().includes("leftover")));
  const middleShelfItems = activeItems.filter(i => i.location === "fridge" && i.category === "Dairy");
  const bottomShelfItems = activeItems.filter(i => i.location === "fridge" && (i.category === "Protein" || (i.category !== "Produce" && i.category !== "Dairy" && i.category !== "Leftovers")));
  const crisperItems = activeItems.filter(i => i.location === "fridge" && i.category === "Produce");
  const countertopItems = activeItems.filter(i => i.location === "countertop" || i.location === "pantry");
  const freezerItems = activeItems.filter(i => i.location === "freezer" || i.isFrozen);

  const renderShelfCard = (item) => {
    const urgency = getUrgencyLevel(item.expiryDate, item.isFrozen);
    const badge = getUrgencyBadgeConfig(urgency);
    const daysRemaining = getDaysUntil(item.expiryDate);

    return (
      <div
        key={item.id}
        className={`bg-white rounded-xl p-3 border shadow-2xs hover:shadow-md transition-all flex flex-col justify-between min-w-[200px] sm:min-w-[220px] max-w-[260px] shrink-0 ${
          urgency === "critical" || urgency === "expired"
            ? "border-red-300 ring-1 ring-red-200"
            : urgency === "warning"
            ? "border-amber-200"
            : "border-stone-200"
        }`}
      >
        <div>
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.bg} ${badge.text} ${badge.border}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
              {item.isFrozen ? "Frozen Vault" : badge.label}
            </span>
            <span className="text-[11px] font-mono font-semibold text-stone-700">
              ₹{Number(item.costEst)}
            </span>
          </div>

          <h5 className="font-bold text-stone-900 text-xs sm:text-sm line-clamp-1">{item.name}</h5>
          <p className="text-[11px] text-stone-500 mt-0.5">{item.quantity} {item.unit}</p>

          <div className="mt-2 text-[10px] text-stone-600 bg-stone-50 px-2 py-1 rounded border border-stone-100 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-stone-400" />
              <span>{formatRelativeDate(item.expiryDate)}</span>
            </span>
          </div>
        </div>

        {/* Action icons */}
        <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between gap-1">
          <div className="flex items-center gap-1">
            <button
              onClick={() => consumeItem(item.id)}
              className="p-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs cursor-pointer shadow-2xs"
              title="Rescued / Eaten"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200" />
            </button>

            {!item.isFrozen && (
              <button
                onClick={() => freezeItem(item.id)}
                className="p-1.5 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 rounded-lg text-xs cursor-pointer"
                title="Freeze (+60d)"
              >
                <Snowflake className="w-3.5 h-3.5 text-sky-600" />
              </button>
            )}

            <button
              onClick={() => onRescueInChef(item.name)}
              className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-lg text-xs cursor-pointer"
              title="Find Rescue Recipes"
            >
              <ChefHat className="w-3.5 h-3.5 text-amber-700" />
            </button>
          </div>

          <button
            onClick={() => onLogWaste(item)}
            className="p-1 text-stone-300 hover:text-red-600 rounded cursor-pointer"
            title="Log Waste Incident"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Refrigerator Frame */}
      <div className="bg-[#ffffff] rounded-3xl border-2 border-emerald-950/10 shadow-lg overflow-hidden">
        {/* Refrigerator Header Bar */}
        <div className="bg-gradient-to-r from-[#0a2e20] to-[#134533] text-white px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-emerald-300" />
            <h4 className="font-bold text-sm tracking-wide uppercase">
              Smart Household Refrigerator (Thermal Gradient Map)
            </h4>
          </div>
          <span className="text-[11px] font-mono text-emerald-200 bg-emerald-900/60 px-2.5 py-0.5 rounded-full border border-emerald-700/60">
            Average Interior: 3.2°C
          </span>
        </div>

        {/* Physical Shelves Container */}
        <div className="p-6 space-y-6 bg-gradient-to-b from-[#f9faf9] to-[#edf3ef]">
          {/* Shelf 1: Top Shelf (Leftovers & Ready-to-eat) */}
          <div className="bg-white/90 rounded-2xl border border-stone-200/90 p-4 shadow-2xs">
            <div className="flex items-center justify-between mb-3 border-b border-stone-100 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                <span className="font-bold text-xs uppercase tracking-wider text-stone-800">
                  Top Shelf: Ready-to-Eat & Leftovers (4°C - 5°C)
                </span>
              </div>
              <span className="text-[11px] text-stone-500 font-medium">Eye-level placement prevents forgetting</span>
            </div>

            {topShelfItems.length === 0 ? (
              <p className="text-xs text-stone-400 italic py-2">No leftovers currently stored. Safe zone!</p>
            ) : (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {topShelfItems.map(renderShelfCard)}
              </div>
            )}
          </div>

          {/* Shelf 2: Middle Shelf (Dairy & Eggs) */}
          <div className="bg-white/90 rounded-2xl border border-stone-200/90 p-4 shadow-2xs">
            <div className="flex items-center justify-between mb-3 border-b border-stone-100 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="font-bold text-xs uppercase tracking-wider text-stone-800">
                  Middle Shelf: Dairy, Milk & Eggs (3°C - 4°C)
                </span>
              </div>
              <span className="text-[11px] text-stone-500 font-medium">Uniform cold temperature prevents curdling</span>
            </div>

            {middleShelfItems.length === 0 ? (
              <p className="text-xs text-stone-400 italic py-2">No dairy items currently stored.</p>
            ) : (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {middleShelfItems.map(renderShelfCard)}
              </div>
            )}
          </div>

          {/* Shelf 3: Bottom Shelf (Proteins & High-Perishables) */}
          <div className="bg-white/90 rounded-2xl border border-stone-200/90 p-4 shadow-2xs">
            <div className="flex items-center justify-between mb-3 border-b border-stone-100 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                <span className="font-bold text-xs uppercase tracking-wider text-stone-800">
                  Bottom Shelf: Coldest Zone / Proteins (1°C - 2°C)
                </span>
              </div>
              <span className="text-[11px] text-stone-500 font-medium">Prevents meat drips onto lower produce</span>
            </div>

            {bottomShelfItems.length === 0 ? (
              <p className="text-xs text-stone-400 italic py-2">No raw proteins on bottom shelf.</p>
            ) : (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {bottomShelfItems.map(renderShelfCard)}
              </div>
            )}
          </div>

          {/* Crisper Drawers: High Humidity Produce */}
          <div className="bg-emerald-50/50 rounded-2xl border-2 border-emerald-200/80 p-4 shadow-2xs">
            <div className="flex items-center justify-between mb-3 border-b border-emerald-200 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                <span className="font-bold text-xs uppercase tracking-wider text-emerald-950">
                  High-Humidity Crisper Drawer: Fresh Produce & Greens
                </span>
              </div>
              <span className="text-[11px] text-emerald-800 font-medium">Humidity vent closed to trap moisture</span>
            </div>

            {crisperItems.length === 0 ? (
              <p className="text-xs text-emerald-700/60 italic py-2">Crisper drawer empty.</p>
            ) : (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {crisperItems.map(renderShelfCard)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* External Storage: Countertop, Dry Pantry & Freezer Vault */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Countertop & Pantry */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4.5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-stone-100 pb-2">
            <span className="font-bold text-xs uppercase tracking-wider text-stone-800">
              Countertop & Dry Pantry Zone
            </span>
            <span className="text-[10px] text-stone-500">Bread, bananas, root veg</span>
          </div>

          {countertopItems.length === 0 ? (
            <p className="text-xs text-stone-400 italic py-2">No pantry items logged.</p>
          ) : (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {countertopItems.map(renderShelfCard)}
            </div>
          )}
        </div>

        {/* Freezer Vault */}
        <div className="bg-sky-50/40 rounded-2xl border border-sky-200 p-4.5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-sky-200 pb-2">
            <span className="font-bold text-xs uppercase tracking-wider text-sky-950 flex items-center gap-1.5">
              <Snowflake className="w-3.5 h-3.5 text-sky-600" />
              Freezer Vault (-18°C)
            </span>
            <span className="text-[10px] text-sky-700 font-medium">Decay stopped indefinitely</span>
          </div>

          {freezerItems.length === 0 ? (
            <p className="text-xs text-sky-800/60 italic py-2">No frozen items currently stored.</p>
          ) : (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {freezerItems.map(renderShelfCard)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
