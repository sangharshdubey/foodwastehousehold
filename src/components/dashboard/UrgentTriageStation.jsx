import React, { useState } from "react";
import { 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2, 
  Snowflake, 
  ChefHat, 
  Clock, 
  DollarSign, 
  Leaf, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Trash2, 
  Flame, 
  LayoutGrid, 
  List, 
  Zap, 
  ShieldAlert 
} from "lucide-react";
import { useFoodWaste } from "../../context/FoodWasteContext";
import { getUrgencyLevel, getDaysUntil, formatRelativeDate } from "../../utils/dateUtils";

// High-res curated image lookup for realistic kitchen staples
const itemPhotoMap = {
  "Fresh Desi Palak (Spinach)": "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=300&q=80",
  "Fresh Malai Paneer": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=300&q=80",
  "Leftover Phulkas / Rotis (5 pcs)": "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=300&q=80",
  "Full Cream Milk (Amul / Nandini)": "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&q=80",
  "Fresh Dhaniya / Coriander": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=300&q=80",
  "Ripe Yellow Robusta Bananas": "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=300&q=80",
  "Leftover Cooked Basmati Rice": "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=300&q=80",
  "Fresh Desi Curd / Dahi": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=300&q=80",
  "Green Shimla Mirch (Capsicum)": "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=300&q=80",
  "Leftover Dal Tadka (Yellow Dal)": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80",
  "Farm Eggs (Tray)": "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=300&q=80",
  "Kabuli Chana (Chickpeas)": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=300&q=80",
  default: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=300&q=80"
};

export const UrgentTriageStation = ({ onLogWaste }) => {
  const { 
    pantryItems, 
    consumeItem, 
    freezeItem, 
    setActiveTab, 
    setSelectedRescueIngredients 
  } = useFoodWaste();

  const [viewMode, setViewMode] = useState("deck"); // "deck" | "list"
  const [expandedItemId, setExpandedItemId] = useState(null);

  const activeItems = pantryItems.filter(i => !i.consumed);
  
  // Find critical items needing immediate intervention (<48h)
  const criticalItems = activeItems.filter(i => {
    const urgency = getUrgencyLevel(i.expiryDate, i.isFrozen);
    return urgency === "critical" || urgency === "expired";
  });

  if (criticalItems.length === 0) {
    return (
      <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-3xl p-6 shadow-2xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6 text-emerald-200" />
          </div>
          <div>
            <h4 className="font-bold text-stone-900 text-base">All Kitchen Perishables Safe!</h4>
            <p className="text-xs text-stone-600 mt-0.5">
              Zero items expiring within 48 hours. Your proactive freezing and meal planning kept waste at 0%.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab("tracker")}
          className="text-xs font-bold text-emerald-800 hover:text-emerald-950 px-4 py-2 bg-white rounded-xl border border-emerald-200 shadow-2xs cursor-pointer shrink-0"
        >
          View Full Pantry →
        </button>
      </div>
    );
  }

  // Tally value at risk in INR
  const totalValueAtRisk = criticalItems.reduce((acc, curr) => acc + (Number(curr.costEst) || 40), 0);
  const totalCarbonAtRisk = (criticalItems.reduce((acc, curr) => acc + (Number(curr.weightKg) || 0.25), 0) * 2.52).toFixed(1);

  // Smart Combo Rescue logic:
  // Detects if Palak, Paneer, Rice, Rotis, or Dal are in critical list
  const comboCandidates = criticalItems.filter(i => 
    ["Fresh Desi Palak (Spinach)", "Fresh Malai Paneer", "Leftover Cooked Basmati Rice", "Leftover Phulkas / Rotis (5 pcs)", "Ripe Yellow Robusta Bananas", "Leftover Dal Tadka (Yellow Dal)"].includes(i.name)
  );

  const comboSavings = comboCandidates.reduce((acc, curr) => acc + (Number(curr.costEst) || 0), 0);

  const handleAutoRescueCombo = () => {
    comboCandidates.forEach(item => consumeItem(item.id));
  };

  const handleRescueInChef = (name) => {
    setSelectedRescueIngredients([name]);
    setActiveTab("rescue");
  };

  // Batch Freeze All Freezables
  const handleBatchFreeze = () => {
    criticalItems
      .filter(i => ["Bakery", "Protein", "Dairy"].includes(i.category) || i.name.includes("Bananas"))
      .forEach(i => freezeItem(i.id));
  };

  return (
    <div className="bg-gradient-to-br from-[#ffffff] via-[#fffbfa] to-[#fff4f2] rounded-3xl border-2 border-rose-200/90 shadow-md p-5 sm:p-7 space-y-6">
      {/* Triage Station Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-rose-100 pb-5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-rose-600 text-white shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              🚨 Urgent Rescue Triage Station
            </span>
            <span className="text-xs font-mono font-bold text-rose-800 bg-rose-100/90 px-2.5 py-0.5 rounded-full border border-rose-300">
              {criticalItems.length} Perishables &lt;48h Left
            </span>
          </div>
          <h3 className="font-extrabold text-stone-900 text-lg sm:text-xl tracking-tight">
            Intervene before spoilage: Save your food, money & planetary carbon
          </h3>
        </div>

        {/* Live Metrics at Risk Ticker + View Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-white rounded-2xl border border-rose-200/80 px-3.5 py-2 flex items-center gap-3 shadow-2xs text-xs font-mono">
            <div className="text-right">
              <span className="text-[10px] text-stone-400 font-sans block">Value at Stake</span>
              <strong className="text-stone-900 text-sm font-extrabold">₹{Math.round(totalValueAtRisk)}</strong>
            </div>
            <span className="text-stone-200">|</span>
            <div>
              <span className="text-[10px] text-stone-400 font-sans block">Carbon Risk</span>
              <strong className="text-rose-700 text-sm font-extrabold">{totalCarbonAtRisk} kg CO₂e</strong>
            </div>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-rose-100/70 p-1 rounded-xl border border-rose-200/80">
            <button
              onClick={() => setViewMode("deck")}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === "deck" ? "bg-white text-stone-900 shadow-2xs" : "text-stone-500 hover:text-stone-900"
              }`}
              title="Interactive Card Deck"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === "list" ? "bg-white text-stone-900 shadow-2xs" : "text-stone-500 hover:text-stone-900"
              }`}
              title="Compact Triage List"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Smart One-Click Combo Rescue Recommendation Banner */}
      {comboCandidates.length >= 2 && (
        <div className="relative overflow-hidden bg-gradient-to-r from-[#061710] to-[#124231] text-white rounded-2xl p-4.5 sm:p-5 shadow-sm border border-emerald-800/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-amber-300" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-amber-300 font-bold">
                    Smart One-Pot Salvage Recommendation
                  </span>
                  <span className="text-[10px] bg-emerald-800 text-emerald-200 px-2 py-0.2 rounded-full font-mono font-bold">
                    {comboCandidates.length} Items Clustered
                  </span>
                </div>
                <h4 className="font-extrabold text-sm sm:text-base text-white">
                  Turn {comboCandidates.map(c => c.name.split(" ")[0]).join(" + ")} into Tonight's Cleanout Feast!
                </h4>
                <p className="text-xs text-emerald-200/80">
                  One cooking session consumes these perishables before expiration.
                </p>
              </div>
            </div>

            <button
              onClick={handleAutoRescueCombo}
              className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold rounded-xl text-xs shadow-md transition-all cursor-pointer hover:scale-102 w-full sm:w-auto shrink-0"
            >
              <ChefHat className="w-4 h-4 text-stone-950" />
              <span>Auto-Rescue Combo (Save ~₹{comboSavings > 0 ? comboSavings : 280})</span>
            </button>
          </div>
        </div>
      )}

      {/* Perishable Cards Deck View */}
      {viewMode === "deck" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {criticalItems.map((item) => {
            const isExpanded = expandedItemId === item.id;
            const daysRemaining = getDaysUntil(item.expiryDate);
            const photoUrl = itemPhotoMap[item.name] || itemPhotoMap.default;

            return (
              <div
                key={item.id}
                className="group craft-card rounded-2xl overflow-hidden border border-rose-200/90 shadow-2xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between hover:-translate-y-1 bg-white"
              >
                <div>
                  {/* Top Bar with Thumbnail & Basic Info */}
                  <div className="p-4 flex items-start gap-3.5">
                    {/* Food Photo Avatar */}
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-stone-100 border border-stone-200 shadow-2xs relative">
                      <img
                        src={photoUrl}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white animate-pulse" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                          {formatRelativeDate(item.expiryDate)}
                        </span>
                        <span className="text-xs font-mono font-bold text-stone-900">
                          ₹{Number(item.costEst)}
                        </span>
                      </div>

                      <h4 className="font-extrabold text-stone-900 text-sm truncate" title={item.name}>
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-stone-500 font-mono mt-0.5">
                        {item.quantity} {item.unit} • {item.weightKg} kg
                      </p>
                    </div>
                  </div>

                  {/* Shelf-Life Decay Progress Meter */}
                  <div className="px-4 pb-2">
                    <div className="flex items-center justify-between text-[10px] font-mono text-stone-500 mb-1">
                      <span className="flex items-center gap-1 text-rose-700 font-bold">
                        <Clock className="w-3 h-3 text-rose-500" />
                        {daysRemaining <= 0 ? "Expires Today!" : "Critical <24h remaining"}
                      </span>
                      <span>85% Decay Risk</span>
                    </div>
                    <div className="h-1.5 w-full bg-rose-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-rose-600 rounded-full transition-all duration-500"
                        style={{ width: "88%" }}
                      />
                    </div>
                  </div>

                  {/* Expandable Storage & Cooking Tip Drawer */}
                  {isExpanded && (
                    <div className="px-4 py-3 bg-stone-50 border-t border-stone-100 text-xs text-stone-700 space-y-1.5 animate-in fade-in-50 duration-200">
                      <div>
                        <strong className="text-stone-900 font-bold block text-[11px]">Preservation Science:</strong>
                        <p className="text-[11px] text-stone-600 leading-relaxed">{item.storageTip}</p>
                      </div>
                      <div className="pt-1">
                        <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                          Freezer Safe: Extends +60 Days
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tactile Action Button Deck */}
                <div className="p-3 bg-stone-50/80 border-t border-stone-100 flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1.5 flex-1">
                    {/* Mark as Eaten */}
                    <button
                      onClick={() => consumeItem(item.id)}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-[11px] font-bold transition-all cursor-pointer shadow-2xs hover:shadow-xs"
                      title="Mark as eaten & save money"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200" />
                      <span>Eaten</span>
                    </button>

                    {/* Freeze to save (+60d) */}
                    <button
                      onClick={() => freezeItem(item.id)}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 bg-sky-100 hover:bg-sky-200 text-sky-900 border border-sky-300 rounded-xl text-[11px] font-bold transition-colors cursor-pointer"
                      title="Move to freezer (+60 days extension)"
                    >
                      <Snowflake className="w-3.5 h-3.5 text-sky-700" />
                      <span>Freeze</span>
                    </button>

                    {/* Send to Rescue Chef */}
                    <button
                      onClick={() => handleRescueInChef(item.name)}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 rounded-xl text-[11px] font-bold transition-colors cursor-pointer"
                      title="Find zero-waste recipes using this ingredient"
                    >
                      <ChefHat className="w-3.5 h-3.5 text-amber-800" />
                      <span>Rescue</span>
                    </button>
                  </div>

                  {/* Expand / Collapse toggle */}
                  <button
                    onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                    className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
                    title={isExpanded ? "Collapse Details" : "Expand Preservation Tips"}
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Compact List View */
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden divide-y divide-stone-100">
          {criticalItems.map((item) => {
            const photoUrl = itemPhotoMap[item.name] || itemPhotoMap.default;

            return (
              <div
                key={item.id}
                className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50/70 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-stone-100 border border-stone-200">
                    <img src={photoUrl} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-stone-900 text-xs sm:text-sm">{item.name}</h4>
                      <span className="text-[10px] font-mono text-rose-700 font-bold bg-rose-50 px-2 py-0.2 rounded-full border border-rose-200">
                        {formatRelativeDate(item.expiryDate)}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 font-mono mt-0.5">
                      ₹{Number(item.costEst)} • {item.quantity} {item.unit} • {item.weightKg} kg
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => consumeItem(item.id)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200" />
                    <span>Eaten</span>
                  </button>
                  <button
                    onClick={() => freezeItem(item.id)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-sky-100 hover:bg-sky-200 text-sky-900 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    <Snowflake className="w-3.5 h-3.5 text-sky-700" />
                    <span>Freeze</span>
                  </button>
                  <button
                    onClick={() => handleRescueInChef(item.name)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    <ChefHat className="w-3.5 h-3.5 text-amber-800" />
                    <span>Recipe</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Batch Triage Actions Footer */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <span className="text-stone-500 font-mono text-[11px]">
          Batch actions accelerate daily triage and prevent cognitive friction.
        </span>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleBatchFreeze}
            className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 sm:py-2 bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 rounded-xl font-bold cursor-pointer transition-colors text-xs"
          >
            <Snowflake className="w-3.5 h-3.5 text-sky-700" />
            <span>Freeze All Freezables (+60d)</span>
          </button>

          <button
            onClick={() => setActiveTab("rescue")}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-2 bg-[#0a2e20] hover:bg-[#134533] text-white rounded-xl font-bold cursor-pointer transition-all shadow-xs text-xs"
          >
            <ChefHat className="w-3.5 h-3.5 text-emerald-300" />
            <span>Send All to Rescue Chef →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
