import { studyBenchmarks } from "../data/studyBenchmarks";

export const calculateHouseholdImpact = (pantryItems = [], wasteLogs = [], householdProfile = {}) => {
  // Consumed/Rescued items
  const consumedItems = pantryItems.filter(item => item.consumed);
  
  // Total weight rescued in kg
  const kgRescued = consumedItems.reduce((acc, curr) => acc + (Number(curr.weightKg) || 0.25), 0);
  
  // Total money saved in INR (₹)
  const moneySaved = consumedItems.reduce((acc, curr) => acc + (Number(curr.costEst) || 50), 0);
  
  // CO2e avoided (kg CO2e)
  const co2eSavedKg = kgRescued * studyBenchmarks.impactFactors.co2ePerKgFood;
  
  // Virtual water conserved (liters)
  const waterSavedLiters = Math.round(kgRescued * studyBenchmarks.impactFactors.waterLitersPerKgFood);
  
  // Equivalent vehicle km averted (avg passenger car produces ~0.17 kg CO2/km)
  const carKmEquivalent = Math.round(co2eSavedKg / 0.17);

  // Wasted items analytics
  const totalWastedKg = wasteLogs.reduce((acc, curr) => acc + (Number(curr.weightKg) || 0.25), 0);
  const totalCostLost = wasteLogs.reduce((acc, curr) => acc + (Number(curr.costLost) || 45), 0);
  
  // Waste diversion rate: rescued / (rescued + wasted)
  const totalHandledKg = kgRescued + totalWastedKg;
  const diversionRatePct = totalHandledKg > 0 ? Math.round((kgRescued / totalHandledKg) * 100) : 88;

  // Comparison against Indian household baseline (UNEP: ~1.05 kg per capita per week)
  const baselineKgPerWeek = (householdProfile.householdSize || 4) * 1.05;
  const baselineCostPerWeek = Math.round(baselineKgPerWeek * 70); // ₹70/kg
  
  // Waste reduction estimate
  const currentWeeklyProratedKg = totalWastedKg > 0 ? totalWastedKg : 0.6;
  const reductionVsBaselinePct = Math.max(0, Math.min(85, Math.round(((baselineKgPerWeek - currentWeeklyProratedKg) / baselineKgPerWeek) * 100)));

  return {
    kgRescued: Number(kgRescued.toFixed(2)),
    moneySaved: Math.round(moneySaved),
    co2eSavedKg: Number(co2eSavedKg.toFixed(2)),
    waterSavedLiters,
    carKmEquivalent,
    totalWastedKg: Number(totalWastedKg.toFixed(2)),
    totalCostLost: Math.round(totalCostLost),
    diversionRatePct,
    baselineKgPerWeek: Number(baselineKgPerWeek.toFixed(1)),
    baselineCostPerWeek,
    reductionVsBaselinePct,
    currencySymbol: "₹"
  };
};
