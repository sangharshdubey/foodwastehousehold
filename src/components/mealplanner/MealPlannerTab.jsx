import React, { useState } from "react";
import { 
  CalendarDays, 
  ShoppingCart, 
  ChefHat, 
  CheckCircle2, 
  Plus, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Edit3 
} from "lucide-react";
import { useFoodWaste } from "../../context/FoodWasteContext";
import { EditMealModal } from "./EditMealModal";
import { SmartGroceryModal } from "./SmartGroceryModal";

export const MealPlannerTab = () => {
  const { mealPlan, updateMeal, pantryItems, consumeItem, setActiveTab } = useFoodWaste();
  
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [activeSlotModal, setActiveSlotModal] = useState(null); // { day, slot, currentMeal }
  const [isGroceryOpen, setIsGroceryOpen] = useState(false);

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const slots = ["Breakfast", "Lunch", "Dinner"];

  const handleMarkMealCooked = (day, slot, meal) => {
    // If meal uses pantry items, mark them consumed
    if (meal?.usesPantryIds && meal.usesPantryIds.length > 0) {
      meal.usesPantryIds.forEach(id => consumeItem(id));
    }
    updateMeal(day, slot, { ...meal, status: "completed" });
  };

  const currentDayMeals = mealPlan[selectedDay] || {};

  return (
    <div className="space-y-6">
      {/* Top Banner: Anti-Orphan Ingredient Behavioral Strategy */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-stone-900 text-base">Anti-Orphan Ingredient Scheduler</h3>
                <span className="text-[11px] bg-emerald-100 text-emerald-900 font-semibold px-2 py-0.5 rounded-full">
                  Pillar 1 Active
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-1 max-w-2xl leading-relaxed">
                Single-use perishables (like fresh dhaniya bunches, malai paneer, or desi palak) cause 32% of home waste. 
                Our meal planner coordinates recipes across consecutive days to consume 100% of open packages before decay.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto shrink-0">
            <button
              onClick={() => setIsGroceryOpen(true)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 bg-[#0e382b] hover:bg-[#16533f] text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4 text-emerald-300" />
              <span>Smart Grocery List</span>
            </button>

            <button
              onClick={() => setActiveTab("rescue")}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 border border-stone-200 hover:border-stone-300 bg-stone-50 text-stone-700 rounded-lg text-xs font-semibold cursor-pointer"
            >
              <ChefHat className="w-4 h-4 text-emerald-700" />
              <span>Recipe Matcher</span>
            </button>
          </div>
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1.5 no-scrollbar">
        {daysOfWeek.map((day) => {
          const isSelected = selectedDay === day;
          const daySlots = mealPlan[day] || {};
          const completedCount = Object.values(daySlots).filter(m => m?.status === "completed").length;

          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-medium text-xs md:text-sm transition-all duration-150 flex items-center gap-1.5 sm:gap-2 shrink-0 cursor-pointer ${
                isSelected
                  ? "bg-[#0e382b] text-white shadow-xs"
                  : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-100"
              }`}
            >
              <span>{day}</span>
              {completedCount > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected ? "bg-emerald-900 text-emerald-200" : "bg-emerald-100 text-emerald-800"
                }`}>
                  {completedCount}/3 Cooked
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Day Slots Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
        {slots.map((slot) => {
          const meal = currentDayMeals[slot];
          const isCompleted = meal?.status === "completed";

          // Find names of used pantry items
          const usedPantryNames = (meal?.usesPantryIds || [])
            .map(id => pantryItems.find(p => p.id === id)?.name)
            .filter(Boolean);

          return (
            <div
              key={slot}
              className={`bg-white rounded-2xl border p-5 transition-all shadow-2xs flex flex-col justify-between ${
                isCompleted 
                  ? "border-emerald-200 bg-emerald-50/20" 
                  : "border-stone-200 hover:border-stone-300"
              }`}
            >
              <div>
                {/* Slot Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    {slot}
                  </span>
                  {isCompleted ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Cooked & Rescued
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                      Planned
                    </span>
                  )}
                </div>

                {/* Meal Title & Info */}
                <h4 className="font-bold text-stone-900 text-base leading-snug">
                  {meal?.title || "No meal scheduled"}
                </h4>

                {meal?.notes && (
                  <p className="text-xs text-stone-600 mt-1.5 leading-relaxed bg-stone-50 p-2 rounded-lg border border-stone-100">
                    {meal.notes}
                  </p>
                )}

                {/* Connected Pantry Items */}
                {usedPantryNames.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-stone-100">
                    <span className="text-[11px] font-semibold text-emerald-900 block mb-1.5 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      Pantry Perishables Rescued:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {usedPantryNames.map(name => (
                        <span key={name} className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Slot Actions */}
              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveSlotModal({ day: selectedDay, slot, currentMeal: meal })}
                  className="flex items-center gap-1 text-xs text-stone-600 hover:text-stone-900 font-semibold px-2 py-1 rounded hover:bg-stone-100 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Meal</span>
                </button>

                {!isCompleted && meal?.title && (
                  <button
                    onClick={() => handleMarkMealCooked(selectedDay, slot, meal)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                    title="Marks linked pantry ingredients as eaten"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200" />
                    <span>Cooked</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modals */}
      <EditMealModal
        isOpen={!!activeSlotModal}
        onClose={() => setActiveSlotModal(null)}
        day={activeSlotModal?.day}
        slot={activeSlotModal?.slot}
        currentMeal={activeSlotModal?.currentMeal}
      />

      <SmartGroceryModal
        isOpen={isGroceryOpen}
        onClose={() => setIsGroceryOpen(false)}
      />
    </div>
  );
};
