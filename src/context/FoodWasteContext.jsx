import React, { createContext, useContext, useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { defaultPantryItems } from "../data/initialPantry";
import { defaultWeeklyMealPlan } from "../data/initialMealPlan";
import { defaultWasteLogs } from "../data/initialWasteLogs";
import { calculateHouseholdImpact } from "../utils/impactCalculator";

const FoodWasteContext = createContext(null);

const STORAGE_KEY_PANTRY = "resq_pantry_v2_inr";
const STORAGE_KEY_MEALS = "resq_meals_v2_inr";
const STORAGE_KEY_LOGS = "resq_waste_logs_v2_inr";
const STORAGE_KEY_PROFILE = "resq_profile_v2_inr";

const defaultProfile = {
  householdName: "The Sharma Household",
  householdSize: 4,
  dietType: "Vegetarian",
  shoppingCadence: "Sabzi Mandi & Kirana (Weekly)",
  baselineWeeklyWasteKg: 4.2,
  baselineWeeklySpendLost: 294,
  currency: "₹"
};

export const FoodWasteProvider = ({ children }) => {
  // Load state from localStorage with fallback to default seed data
  const [pantryItems, setPantryItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PANTRY);
      return saved ? JSON.parse(saved) : defaultPantryItems;
    } catch {
      return defaultPantryItems;
    }
  });

  const [mealPlan, setMealPlan] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MEALS);
      return saved ? JSON.parse(saved) : defaultWeeklyMealPlan;
    } catch {
      return defaultWeeklyMealPlan;
    }
  });

  const [wasteLogs, setWasteLogs] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LOGS);
      return saved ? JSON.parse(saved) : defaultWasteLogs;
    } catch {
      return defaultWasteLogs;
    }
  });

  const [householdProfile, setHouseholdProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      return saved ? JSON.parse(saved) : defaultProfile;
    } catch {
      return defaultProfile;
    }
  });

  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedRescueIngredients, setSelectedRescueIngredients] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PANTRY, JSON.stringify(pantryItems));
  }, [pantryItems]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_MEALS, JSON.stringify(mealPlan));
  }, [mealPlan]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(wasteLogs));
  }, [wasteLogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(householdProfile));
  }, [householdProfile]);

  const showToast = (title, message, type = "success") => {
    setToastMessage({ title, message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Trigger celebration confetti
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#4a7c59", "#689f78", "#e59866", "#f4a261"]
      });
    } catch {
      // safe fallback if canvas is not ready
    }
  };

  // Consume / Rescue an item
  const consumeItem = (id) => {
    const item = pantryItems.find(i => i.id === id);
    if (!item) return;

    setPantryItems(prev => prev.map(i => i.id === id ? { ...i, consumed: true } : i));
    triggerConfetti();
    showToast(
      "Ingredient Rescued! 🎉",
      `Saved ${item.name} (₹${item.costEst} and ${(item.weightKg * 2.52).toFixed(1)}kg CO2e avoided!)`
    );
  };

  // Freeze item (+60 days shelf life)
  const freezeItem = (id) => {
    const item = pantryItems.find(i => i.id === id);
    if (!item) return;

    const currentExpiry = new Date(item.expiryDate);
    currentExpiry.setDate(currentExpiry.getDate() + 60);
    const newExpiry = currentExpiry.toISOString().split("T")[0];

    setPantryItems(prev => prev.map(i => {
      if (i.id === id) {
        return {
          ...i,
          location: "freezer",
          isFrozen: true,
          expiryDate: newExpiry,
          storageTip: "Frozen safe! Defrost slowly in refrigerator or cook directly."
        };
      }
      return i;
    }));

    showToast("Transferred to Freezer ❄️", `Extended ${item.name} shelf-life by +60 days!`);
  };

  // Log waste incident
  const logWasteItem = (item, rootCause, disposalMethod, reflection = "") => {
    const newLog = {
      id: "log-" + Date.now(),
      itemName: item.name,
      category: item.category || "Produce",
      weightKg: Number(item.weightKg) || 0.25,
      costLost: Number(item.costEst) || 3.0,
      disposalMethod: disposalMethod || "Landfill",
      rootCause: rootCause || "Forgotten in fridge",
      dateLogged: new Date().toISOString().split("T")[0],
      avoidable: true,
      reflection: reflection || "Identified for behavioral improvement."
    };

    setWasteLogs(prev => [newLog, ...prev]);
    // remove from active pantry
    setPantryItems(prev => prev.filter(i => i.id !== item.id));

    showToast("Incident Logged to Audit", `Logged ${item.name} for research reflection.`, "info");
  };

  // Add new pantry item
  const addItem = (item) => {
    const newItem = {
      id: "item-" + Date.now(),
      consumed: false,
      isFrozen: item.location === "freezer",
      ...item
    };
    setPantryItems(prev => [newItem, ...prev]);
    showToast("Item Added 📦", `Added ${item.name} to ${item.location}.`);
  };

  // Update existing pantry item
  const updateItem = (id, updates) => {
    setPantryItems(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
  };

  // Delete item
  const deleteItem = (id) => {
    setPantryItems(prev => prev.filter(i => i.id !== id));
  };

  // Update a meal in weekly schedule
  const updateMeal = (day, slot, mealData) => {
    setMealPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [slot]: {
          ...prev[day]?.[slot],
          ...mealData
        }
      }
    }));
    showToast("Meal Plan Updated 🍽️", `Scheduled ${mealData.title || "meal"} for ${day} ${slot}.`);
  };

  // Toggle ingredient selection in Rescue Chef
  const toggleRescueIngredient = (ingredientName) => {
    setSelectedRescueIngredients(prev => {
      if (prev.includes(ingredientName)) {
        return prev.filter(name => name !== ingredientName);
      } else {
        return [...prev, ingredientName];
      }
    });
  };

  // Reset demo data
  const resetToDemo = () => {
    localStorage.removeItem(STORAGE_KEY_PANTRY);
    localStorage.removeItem(STORAGE_KEY_MEALS);
    localStorage.removeItem(STORAGE_KEY_LOGS);
    localStorage.removeItem(STORAGE_KEY_PROFILE);
    setPantryItems(defaultPantryItems);
    setMealPlan(defaultWeeklyMealPlan);
    setWasteLogs(defaultWasteLogs);
    setHouseholdProfile(defaultProfile);
    setSelectedRescueIngredients([]);
    showToast("Reset Complete", "Demo dataset restored to initial state.", "info");
  };

  // Dynamic impact calculations
  const impact = calculateHouseholdImpact(pantryItems, wasteLogs, householdProfile);

  return (
    <FoodWasteContext.Provider
      value={{
        pantryItems,
        wasteLogs,
        mealPlan,
        householdProfile,
        activeTab,
        setActiveTab,
        selectedRescueIngredients,
        setSelectedRescueIngredients,
        toggleRescueIngredient,
        consumeItem,
        freezeItem,
        logWasteItem,
        addItem,
        updateItem,
        deleteItem,
        updateMeal,
        setHouseholdProfile,
        resetToDemo,
        impact,
        toastMessage,
        setToastMessage
      }}
    >
      {children}
    </FoodWasteContext.Provider>
  );
};

export const useFoodWaste = () => {
  const context = useContext(FoodWasteContext);
  if (!context) {
    throw new Error("useFoodWaste must be used within a FoodWasteProvider");
  }
  return context;
};
