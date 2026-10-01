import React from "react";
import { 
  LayoutDashboard, 
  Clock, 
  CalendarDays, 
  ChefHat, 
  Recycle, 
  BarChart3 
} from "lucide-react";
import { useFoodWaste } from "../../context/FoodWasteContext";

export const MobileBottomBar = () => {
  const { activeTab, setActiveTab } = useFoodWaste();

  const navItems = [
    { id: "dashboard", label: "Overview", icon: LayoutDashboard },
    { id: "tracker", label: "Fridge", icon: Clock },
    { id: "mealplanner", label: "Meals", icon: CalendarDays },
    { id: "rescue", label: "Rescue", icon: ChefHat },
    { id: "disposal", label: "Disposal", icon: Recycle },
    { id: "study", label: "Study", icon: BarChart3 }
  ];

  return (
    <nav 
      aria-label="Mobile Bottom Navigation" 
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-stone-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.07)] px-2 py-1.5 no-print"
      style={{ paddingBottom: "max(0.375rem, env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-200 relative cursor-pointer ${
                isActive 
                  ? "text-emerald-900 font-extrabold scale-105" 
                  : "text-stone-400 hover:text-stone-700 font-medium"
              }`}
            >
              {isActive && (
                <span className="absolute -top-1 w-5 h-1 rounded-full bg-emerald-700 animate-in fade-in zoom-in-50 duration-200" />
              )}
              <div className={`p-1 rounded-lg transition-colors ${isActive ? "bg-emerald-50" : ""}`}>
                <Icon className={`w-4 h-4 ${isActive ? "text-emerald-700" : "currentColor"}`} />
              </div>
              <span className="text-[10px] tracking-tight leading-none mt-0.5">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
