import React, { useState, useEffect } from "react";
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  Timer, 
  Clock, 
  Award, 
  Flame 
} from "lucide-react";
import { useFoodWaste } from "../../context/FoodWasteContext";

export const CookingModeModal = ({ isOpen, onClose, recipe }) => {
  const { consumeItem, pantryItems } = useFoodWaste();

  const [completedSteps, setCompletedSteps] = useState({});
  const [timerSeconds, setTimerSeconds] = useState(15 * 60); // default 15 mins
  const [initialSeconds, setInitialSeconds] = useState(15 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Timer countdown hook
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  if (!isOpen || !recipe) return null;

  const totalSteps = recipe.instructions.length;
  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPct = Math.round((completedCount / totalSteps) * 100);

  const toggleStep = (idx) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleFinishCooking = () => {
    const targets = recipe.primaryTargetIngredients.map((t) => t.toLowerCase());
    pantryItems
      .filter((i) => !i.consumed)
      .forEach((item) => {
        const iName = item.name.toLowerCase();
        if (targets.some((t) => t.includes(iName) || iName.includes(t))) {
          consumeItem(item.id);
        }
      });
    onClose();
  };

  const setTimerPreset = (mins) => {
    setIsTimerRunning(false);
    setInitialSeconds(mins * 60);
    setTimerSeconds(mins * 60);
  };

  const timerRadius = 38;
  const timerCircumference = 2 * Math.PI * timerRadius;
  const timerDashoffset = timerCircumference - (timerSeconds / initialSeconds) * timerCircumference;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-stone-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header with Recipe Photo Backdrop */}
        <div className="relative bg-gradient-to-r from-[#061710] to-[#0a2e20] text-white p-6 shrink-0 overflow-hidden">
          {recipe.imageUrl && (
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061710] via-transparent to-transparent" />
            </div>
          )}

          <div className="relative z-10 flex items-start justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 font-bold bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
                Interactive Cooking Mode
              </span>
              <h3 className="font-extrabold text-lg sm:text-2xl text-white mt-1">{recipe.title}</h3>
              <p className="text-xs text-emerald-200/90 mt-0.5">{recipe.prepTime} • {recipe.servings} Servings • {recipe.difficulty}</p>
            </div>
            <button onClick={onClose} className="text-emerald-200 hover:text-white p-1 rounded-xl bg-black/30 hover:bg-black/50 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Animated Progress Bar */}
        <div className="h-1.5 w-full bg-stone-100 shrink-0">
          <div
            className="h-full bg-emerald-500 transition-all duration-300 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-stone-800">
          {/* Interactive Timer & Status Card */}
          <div className="bg-gradient-to-br from-stone-900 to-stone-950 text-white rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-inner">
            {/* SVG Countdown Ring */}
            <div className="relative flex items-center justify-center w-24 h-24 shrink-0">
              <svg className="w-24 h-24 -rotate-90 transform" viewBox="0 0 96 96">
                <circle
                  cx="48"
                  cy="48"
                  r={timerRadius}
                  className="text-stone-800"
                  strokeWidth="6"
                  stroke="currentColor"
                  fill="transparent"
                />
                <circle
                  cx="48"
                  cy="48"
                  r={timerRadius}
                  className={`${timerSeconds === 0 ? "text-red-500 animate-pulse" : "text-emerald-400"} transition-all duration-500`}
                  strokeWidth="6"
                  strokeDasharray={timerCircumference}
                  strokeDashoffset={timerDashoffset}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-xl font-bold font-mono text-white tracking-tight">
                  {formatTimer(timerSeconds)}
                </span>
                <span className="text-[9px] text-stone-400 uppercase tracking-widest font-mono">
                  {isTimerRunning ? "Cooking" : timerSeconds === 0 ? "Done!" : "Timer"}
                </span>
              </div>
            </div>

            {/* Timer Controls & Presets */}
            <div className="flex-1 space-y-2 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isTimerRunning
                      ? "bg-amber-500 hover:bg-amber-400 text-stone-950"
                      : "bg-emerald-500 hover:bg-emerald-400 text-stone-950"
                  }`}
                >
                  {isTimerRunning ? <Pause className="w-4 h-4 fill-stone-950" /> : <Play className="w-4 h-4 fill-stone-950" />}
                  <span>{isTimerRunning ? "Pause Timer" : "Start Timer"}</span>
                </button>

                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerSeconds(initialSeconds);
                  }}
                  className="p-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl cursor-pointer"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Presets */}
              <div className="flex items-center justify-center sm:justify-start gap-1.5 pt-1 text-[11px] text-stone-400">
                <span className="text-[10px] uppercase font-mono mr-1">Presets:</span>
                {[5, 10, 15, 20].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => setTimerPreset(mins)}
                    className="px-2 py-0.5 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-200 cursor-pointer font-mono font-bold"
                  >
                    {mins}m
                  </button>
                ))}
              </div>
            </div>

            {/* Steps completion counter */}
            <div className="text-center sm:text-right shrink-0">
              <span className="text-2xl font-bold font-mono text-emerald-400">
                {completedCount}/{totalSteps}
              </span>
              <p className="text-[11px] text-stone-400">Steps Finished</p>
            </div>
          </div>

          {/* Interactive Steps Checklist */}
          <div className="space-y-3">
            <h4 className="font-bold text-stone-900 text-sm uppercase tracking-wider flex items-center justify-between">
              <span>Step-by-Step Culinary Guide</span>
              <span className="text-xs text-stone-500 font-normal font-mono">
                Click step as completed
              </span>
            </h4>

            <div className="space-y-2">
              {recipe.instructions.map((step, idx) => {
                const isDone = !!completedSteps[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isDone
                        ? "bg-emerald-50/50 border-emerald-200 text-stone-400"
                        : "bg-white border-stone-200 hover:border-emerald-300 shadow-2xs"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => {}}
                      className="mt-0.5 h-4 w-4 rounded border-stone-300 text-emerald-700 focus:ring-emerald-700 cursor-pointer shrink-0"
                    />
                    <div className="flex-1">
                      <span className="text-[11px] font-bold text-emerald-800 uppercase block mb-0.5">
                        Step {idx + 1}
                      </span>
                      <p className={`text-xs md:text-sm leading-relaxed ${isDone ? "line-through text-stone-500" : "text-stone-800"}`}>
                        {step}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Zero Waste Pro Tip Reminder */}
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-amber-900 block mb-0.5">Scrap Salvage Secret:</strong>
              <p className="leading-relaxed">{recipe.zeroWasteSecret}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-stone-50 px-6 py-4 border-t border-stone-200 flex items-center justify-between shrink-0">
          <div className="text-xs text-stone-500 hidden sm:block">
            <span>Progress: </span>
            <strong className="text-stone-800 font-mono">{progressPct}% Complete</strong>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-stone-600 hover:text-stone-800 text-xs font-semibold cursor-pointer"
            >
              Exit Cooking Mode
            </button>
            <button
              onClick={handleFinishCooking}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-200" />
              <span>Finished Meal — Rescue Ingredients!</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
