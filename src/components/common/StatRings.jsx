import React from "react";
import { Flame, Sparkles, TrendingUp } from "lucide-react";
import { useFoodWaste } from "../../context/FoodWasteContext";

export const StatRings = () => {
  const { impact, pantryItems } = useFoodWaste();

  const diversionPct = Math.min(100, Math.max(0, impact.diversionRatePct || 85));
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (diversionPct / 100) * circumference;

  return (
    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15">
      {/* Circular SVG Ring */}
      <div className="relative flex items-center justify-center w-11 h-11 shrink-0" title={`Weekly Landfill Diversion Rate: ${diversionPct}%`}>
        <svg className="w-11 h-11 -rotate-90 transform" viewBox="0 0 48 48">
          {/* Background circle */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            className="text-emerald-950/60"
            strokeWidth="4"
            stroke="currentColor"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            className="text-emerald-400 transition-all duration-1000 ease-out"
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
          />
        </svg>
        <span className="absolute text-[10px] font-mono font-bold text-white">
          {diversionPct}%
        </span>
      </div>

      {/* Streak & Label */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span className="text-[11px] font-semibold text-emerald-200">Landfill Diverted</span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/30">
            <Flame className="w-3 h-3 text-amber-400 fill-amber-400 animate-bounce" />
            <span>5-Day Streak</span>
          </span>
        </div>
      </div>
    </div>
  );
};
