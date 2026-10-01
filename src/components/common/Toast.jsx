import React from "react";
import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";
import { useFoodWaste } from "../../context/FoodWasteContext";

export const Toast = () => {
  const { toastMessage, setToastMessage } = useFoodWaste();

  if (!toastMessage) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-600 shrink-0" />
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full bg-white rounded-xl shadow-xl border border-stone-200/90 p-4 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
      <div className="flex items-start gap-3">
        {icons[toastMessage.type] || icons.success}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-stone-900">{toastMessage.title}</p>
          <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">{toastMessage.message}</p>
        </div>
        <button
          onClick={() => setToastMessage(null)}
          className="text-stone-400 hover:text-stone-600 p-0.5 rounded cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
