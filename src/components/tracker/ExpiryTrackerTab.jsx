import React, { useState } from "react";
import { 
  Clock, 
  Plus, 
  Search, 
  Filter, 
  Snowflake, 
  CheckCircle2, 
  Trash2, 
  ChefHat, 
  BookOpen, 
  AlertCircle, 
  Sparkles,
  ArrowRight,
  Package,
  LayoutGrid,
  Refrigerator
} from "lucide-react";
import { useFoodWaste } from "../../context/FoodWasteContext";
import { getDaysUntil, getUrgencyLevel, formatRelativeDate, getUrgencyBadgeConfig } from "../../utils/dateUtils";
import { AddItemModal } from "./AddItemModal";
import { StorageGuideModal } from "./StorageGuideModal";
import { LogWasteModal } from "./LogWasteModal";
import { VirtualFridgeView } from "./VirtualFridgeView";

export const ExpiryTrackerTab = () => {
  const { 
    pantryItems, 
    consumeItem, 
    freezeItem, 
    deleteItem, 
    setActiveTab, 
    toggleRescueIngredient,
    setSelectedRescueIngredients
  } = useFoodWaste();

  const [viewMode, setViewMode] = useState("cards"); // "cards" | "virtualFridge"
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedZone, setSelectedZone] = useState("all");
  const [selectedUrgency, setSelectedUrgency] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [wasteItemTarget, setWasteItemTarget] = useState(null);

  // Filter out consumed items from active inventory view
  const activeItems = pantryItems.filter(item => !item.consumed);

  // Compute stats
  const criticalCount = activeItems.filter(i => getUrgencyLevel(i.expiryDate, i.isFrozen) === "critical" || getUrgencyLevel(i.expiryDate, i.isFrozen) === "expired").length;
  const warningCount = activeItems.filter(i => getUrgencyLevel(i.expiryDate, i.isFrozen) === "warning").length;
  const safeCount = activeItems.filter(i => getUrgencyLevel(i.expiryDate, i.isFrozen) === "safe").length;
  const frozenCount = activeItems.filter(i => i.isFrozen || i.location === "freezer").length;

  // Filter items
  const filteredItems = activeItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesZone = selectedZone === "all" || item.location === selectedZone;
    const urgency = getUrgencyLevel(item.expiryDate, item.isFrozen);
    const matchesUrgency = selectedUrgency === "all" || urgency === selectedUrgency;
    return matchesSearch && matchesZone && matchesUrgency;
  });

  // Sort by urgency: expired & critical first, then warning, then safe
  const sortedItems = [...filteredItems].sort((a, b) => {
    return getDaysUntil(a.expiryDate) - getDaysUntil(b.expiryDate);
  });

  const handleRescueInChef = (itemName) => {
    setSelectedRescueIngredients([itemName]);
    setActiveTab("rescue");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Urgency Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div 
          onClick={() => setSelectedUrgency(selectedUrgency === "critical" ? "all" : "critical")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            selectedUrgency === "critical" 
              ? "bg-red-50/80 border-red-300 ring-2 ring-red-400 shadow-xs" 
              : "bg-white border-stone-200/90 hover:border-red-200 shadow-2xs hover:-translate-y-0.5"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-red-700 uppercase tracking-wider">Critical (0-2d)</span>
            <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-ping" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-extrabold text-stone-900 font-mono">{criticalCount}</span>
            <span className="text-xs text-stone-500">items need rescue</span>
          </div>
          <p className="text-[11px] text-stone-500 mt-1">High risk of imminent spoilage</p>
        </div>

        <div 
          onClick={() => setSelectedUrgency(selectedUrgency === "warning" ? "all" : "warning")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            selectedUrgency === "warning" 
              ? "bg-amber-50/80 border-amber-300 ring-2 ring-amber-400 shadow-xs" 
              : "bg-white border-stone-200/90 hover:border-amber-200 shadow-2xs hover:-translate-y-0.5"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">Use Soon (3-5d)</span>
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-extrabold text-stone-900 font-mono">{warningCount}</span>
            <span className="text-xs text-stone-500">items</span>
          </div>
          <p className="text-[11px] text-stone-500 mt-1">Prioritize in weekly meal planner</p>
        </div>

        <div 
          onClick={() => setSelectedUrgency(selectedUrgency === "safe" ? "all" : "safe")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            selectedUrgency === "safe" 
              ? "bg-emerald-50/80 border-emerald-300 ring-2 ring-emerald-400 shadow-xs" 
              : "bg-white border-stone-200/90 hover:border-emerald-200 shadow-2xs hover:-translate-y-0.5"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Optimal Fresh</span>
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-extrabold text-stone-900 font-mono">{safeCount}</span>
            <span className="text-xs text-stone-500">items safe</span>
          </div>
          <p className="text-[11px] text-stone-500 mt-1">6+ days shelf life remaining</p>
        </div>

        <div 
          onClick={() => setSelectedZone(selectedZone === "freezer" ? "all" : "freezer")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            selectedZone === "freezer" 
              ? "bg-sky-50/80 border-sky-300 ring-2 ring-sky-400 shadow-xs" 
              : "bg-white border-stone-200/90 hover:border-sky-200 shadow-2xs hover:-translate-y-0.5"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wider">Freezer Vault</span>
            <Snowflake className="w-4 h-4 text-sky-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-extrabold text-stone-900 font-mono">{frozenCount}</span>
            <span className="text-xs text-stone-500">paused items</span>
          </div>
          <p className="text-[11px] text-stone-500 mt-1">Spoilage paused by freezing</p>
        </div>
      </div>

      {/* Action Controls, Search & View Switcher */}
      <div className="bg-white p-4.5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search items by name or category (e.g. spinach, dairy, bread)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-stone-200 rounded-xl text-xs md:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-700 bg-stone-50/50"
            />
          </div>

          {/* View Mode Switcher + Action Buttons */}
          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200/80">
              <button
                onClick={() => setViewMode("cards")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "cards" 
                    ? "bg-white text-stone-900 shadow-xs" 
                    : "text-stone-500 hover:text-stone-800"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Cards</span>
              </button>
              <button
                onClick={() => setViewMode("virtualFridge")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "virtualFridge" 
                    ? "bg-white text-stone-900 shadow-xs" 
                    : "text-stone-500 hover:text-stone-800"
                }`}
              >
                <Refrigerator className="w-3.5 h-3.5 text-emerald-700" />
                <span>Virtual Fridge</span>
              </button>
            </div>

            <button
              onClick={() => setIsGuideModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 border border-stone-200 hover:border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-700 rounded-xl text-xs font-semibold cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
              <span>Storage Science</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#0a2e20] hover:bg-[#134533] text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4 text-emerald-300" />
              <span>Log Item</span>
            </button>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100 text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-stone-400 text-[10px] font-bold uppercase tracking-wider mr-1">Zone:</span>
            {[
              { id: "all", label: "All Zones" },
              { id: "fridge", label: "Refrigerator" },
              { id: "countertop", label: "Countertop" },
              { id: "pantry", label: "Pantry" },
              { id: "freezer", label: "Freezer" }
            ].map(z => (
              <button
                key={z.id}
                onClick={() => setSelectedZone(z.id)}
                className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                  selectedZone === z.id
                    ? "bg-[#0a2e20] text-white"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {z.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-stone-400 text-[10px] font-bold uppercase tracking-wider mr-1">Urgency:</span>
            {[
              { id: "all", label: "All" },
              { id: "critical", label: "Critical" },
              { id: "warning", label: "Soon" },
              { id: "safe", label: "Safe" }
            ].map(u => (
              <button
                key={u.id}
                onClick={() => setSelectedUrgency(u.id)}
                className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                  selectedUrgency === u.id
                    ? "bg-stone-800 text-white"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {u.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content: Card Grid View OR Virtual Refrigerator Rack */}
      {viewMode === "virtualFridge" ? (
        <VirtualFridgeView
          onRescueInChef={handleRescueInChef}
          onLogWaste={(item) => setWasteItemTarget(item)}
        />
      ) : sortedItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-3">
          <Package className="w-12 h-12 text-stone-300 mx-auto" />
          <h3 className="text-base font-semibold text-stone-800">No items match your filters</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Try adjusting your search keywords, switching zones, or add a new grocery item to track.
          </p>
          <button
            onClick={() => { setSearchQuery(""); setSelectedZone("all"); setSelectedUrgency("all"); }}
            className="px-4 py-1.5 bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-stone-700 rounded-lg cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedItems.map((item) => {
            const urgency = getUrgencyLevel(item.expiryDate, item.isFrozen);
            const badge = getUrgencyBadgeConfig(urgency);
            const daysRemaining = getDaysUntil(item.expiryDate);

            return (
              <div 
                key={item.id}
                className={`bg-white rounded-2xl border p-4.5 transition-all duration-200 flex flex-col justify-between shadow-2xs hover:shadow-md hover:-translate-y-0.5 ${
                  urgency === "critical" || urgency === "expired"
                    ? "border-red-300 ring-1 ring-red-200/60"
                    : urgency === "warning"
                    ? "border-amber-200"
                    : "border-stone-200/90"
                }`}
              >
                <div>
                  {/* Top line badge & location */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${badge.bg} ${badge.text} ${badge.border}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                      {item.isFrozen ? "Frozen Vault" : badge.label}
                    </span>

                    <span className="text-[11px] font-mono text-stone-500 capitalize bg-stone-100 px-2.5 py-0.5 rounded-full">
                      {item.location}
                    </span>
                  </div>

                  {/* Title & Quantity */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm md:text-base leading-snug">
                        {item.name}
                      </h4>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {item.category} • {item.quantity} {item.unit}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-stone-800 font-mono">₹{Number(item.costEst)}</span>
                      <span className="block text-[10px] text-stone-400 font-mono">{item.weightKg} kg</span>
                    </div>
                  </div>

                  {/* Expiry indicator */}
                  <div className="mt-3 bg-stone-50/80 rounded-xl p-2.5 border border-stone-100 text-xs">
                    <div className="flex items-center justify-between text-stone-700">
                      <span className="flex items-center gap-1 text-[11px] font-medium">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        {item.isFrozen ? "Frozen Shelf Life" : "Shelf-Life Status"}
                      </span>
                      <span className={`font-semibold font-mono ${
                        daysRemaining <= 1 ? "text-red-700" : daysRemaining <= 4 ? "text-amber-700" : "text-emerald-700"
                      }`}>
                        {formatRelativeDate(item.expiryDate)}
                      </span>
                    </div>

                    {item.storageTip && (
                      <p className="text-[11px] text-stone-600 mt-1.5 pt-1.5 border-t border-stone-200/60 leading-tight">
                        <strong className="text-stone-800">Storage Tip: </strong>{item.storageTip}
                      </p>
                    )}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-1.5">
                  <div className="flex items-center gap-1.5">
                    {/* Mark as Eaten / Rescued */}
                    <button
                      onClick={() => consumeItem(item.id)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-2xs hover:shadow-xs"
                      title="Mark as eaten or cooked — saves money & emissions!"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200" />
                      <span>Eaten</span>
                    </button>

                    {/* Freeze to save (+60d) */}
                    {!item.isFrozen && (
                      <button
                        onClick={() => freezeItem(item.id)}
                        className="flex items-center gap-1 px-2.5 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                        title="Move to freezer (+60 days extension)"
                      >
                        <Snowflake className="w-3.5 h-3.5 text-sky-600" />
                        <span>Freeze</span>
                      </button>
                    )}

                    {/* Send to Rescue Chef */}
                    <button
                      onClick={() => handleRescueInChef(item.name)}
                      className="flex items-center gap-1 px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                      title="Find zero-waste recipes using this ingredient"
                    >
                      <ChefHat className="w-3.5 h-3.5 text-amber-700" />
                      <span>Rescue</span>
                    </button>
                  </div>

                  <div className="flex items-center">
                    {/* Log Waste button */}
                    <button
                      onClick={() => setWasteItemTarget(item)}
                      className="p-1.5 text-stone-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Log as waste in household research audit"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modals */}
      <AddItemModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
      <StorageGuideModal 
        isOpen={isGuideModalOpen} 
        onClose={() => setIsGuideModalOpen(false)} 
      />
      <LogWasteModal
        isOpen={!!wasteItemTarget}
        onClose={() => setWasteItemTarget(null)}
        item={wasteItemTarget}
      />
    </div>
  );
};
