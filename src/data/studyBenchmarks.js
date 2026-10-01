export const studyBenchmarks = {
  sources: [
    { title: "UNEP Food Waste Index Report 2024 (India Chapter)", citation: "United Nations Environment Programme" },
    { title: "FSSAI 'Save Food, Share Food' Initiative", citation: "Food Safety and Standards Authority of India" },
    { title: "ICAR & Ministry of Consumer Affairs Household Waste Synthesis", citation: "Govt. of India Research Synthesis" },
    { title: "FAO India Urban Household Food Loss Studies", citation: "Food and Agriculture Organization of the UN" }
  ],
  globalAverages: {
    wastePerCapitaKgYear: 55, // 55 kg per capita in Indian urban households
    householdShareOfTotalFoodWastePct: 62,
    dailyMealsWastedGlobal: "68 Million Tonnes in India annually",
    globalEmissionsPct: 8.2 // % of global GHG emissions from food waste
  },
  impactFactors: {
    co2ePerKgFood: 2.52, // kg of CO2 equivalent per 1 kg of household food waste
    waterLitersPerKgFood: 850, // liters of virtual embedded water per kg of food
    avgCostPerKgUSD: 70 // average estimated cost in INR (₹70/kg)
  },
  wasteByCategory: [
    { category: "Fresh Sabzi & Fruits (Produce)", sharePct: 44, color: "#4a7c59", note: "Rapid wilting of palak, dhaniya, tomatoes due to tropical heat" },
    { category: "Prepared Leftovers (Dal, Rice, Curries)", sharePct: 24, color: "#e76f51", note: "Excess dinner portions forgotten in refrigerator" },
    { category: "Rotis & Bakery (Chapatis, Bread)", sharePct: 16, color: "#c2b69d", note: "Extra rotis dried out; stale pav & bread loaves" },
    { category: "Dairy & Dahi (Milk, Paneer, Curd)", sharePct: 12, color: "#f4a261", note: "Souring milk pouch & confusion over 'Best Before'" },
    { category: "Pantry Staples & Grains", sharePct: 4, color: "#9a031e", note: "Pantry weevils in dal or moisture in flours" }
  ],
  behavioralDrivers: [
    {
      driver: "Excess Daily Cooking & Generous Hospitality",
      prevalencePct: 35,
      description: "Cooking large extra portions of rotis, dal, and rice as a cultural habit of abundance, leaving unconsumed leftovers.",
      targetedIntervention: "Pillar 1: Smart Meal Planner & Anti-Orphan Portion Optimizer"
    },
    {
      driver: "FSSAI Date Label Confusion ('Best Before' vs 'Expiry')",
      prevalencePct: 25,
      description: "Throwing away safe packaged dahi, bread, or paneer on its 'Best Before' date due to safety anxiety.",
      targetedIntervention: "Pillar 4: FSSAI Date Label Decoder & 3-Step Triage Wizard"
    },
    {
      driver: "Vegetable Mandi Bulk Impulse Buying",
      prevalencePct: 22,
      description: "Buying large polybags of perishable greens, tomatoes, or chillies from local mandis without checking fridge stock.",
      targetedIntervention: "Pillar 1: Consolidated Smart Grocery Checklist"
    },
    {
      driver: "Lack of Leftover Remixing Knowledge",
      prevalencePct: 18,
      description: "Hesitation on how to transform cold chawal into Tawa Pulao or dry rotis into Tadka Poha.",
      targetedIntervention: "Pillar 3: Desi Surplus Rescue Chef"
    }
  ],
  interventionEfficacy: [
    {
      intervention: "Smart Indian Meal Planning & Portion Sync",
      projectedReductionPct: 35,
      mechanism: "Pre-cooking portion alignment prevents excess chapatis and dal from going to waste."
    },
    {
      intervention: "Visual Fridge Shelf-Life & Freezing Prompts",
      projectedReductionPct: 30,
      mechanism: "Timely reminders to freeze bread or paneer before fungal spores multiply."
    },
    {
      intervention: "Desi Leftover Rescue Chef",
      projectedReductionPct: 25,
      mechanism: "Provides instant recipes to turn cold rice, rotis, and dal into appetizing meals."
    },
    {
      intervention: "Wet Waste Composting & Cow Feeding (Gau Seva)",
      projectedReductionPct: 15,
      mechanism: "Diverts inevitable vegetable skins and scraps from municipal landfills into soil nutrients."
    }
  ]
};
