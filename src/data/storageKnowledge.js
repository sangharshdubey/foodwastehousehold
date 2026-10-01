export const storageCategories = [
  { id: "all", label: "All Storage Zones" },
  { id: "fridge", label: "Refrigerator" },
  { id: "countertop", label: "Countertop" },
  { id: "pantry", label: "Dry Pantry" },
  { id: "freezer", label: "Freezer" }
];

export const ethyleneGuide = {
  emitters: [
    { name: "Apples", intensity: "Very High", notes: "Produces heavy gas. Keep in crisper drawer or separate bowl." },
    { name: "Bananas", intensity: "Very High", notes: "Wrap stems with foil/beeswax to slow down ripening." },
    { name: "Avocados", intensity: "High", notes: "Place in brown bag with banana to accelerate; refrigerate once ripe." },
    { name: "Tomatoes", intensity: "High", notes: "Never store in fridge (ruins texture). Keep away from leafy greens." },
    { name: "Melons (Cantaloupe)", intensity: "High", notes: "Keep separated on counter until cut, then seal in fridge." }
  ],
  sensitive: [
    { name: "Leafy Greens (Spinach, Lettuce)", reaction: "Quick yellowing and slime development within 48h." },
    { name: "Broccoli & Cauliflower", reaction: "Floret yellowing and bitter sulfur flavor accumulation." },
    { name: "Carrots & Root Veg", reaction: "Develops bitter terpene compounds and spongy texture." },
    { name: "Cucumbers", reaction: "Accelerated mushiness, pitting, and skin decay." },
    { name: "Herbs (Coriander, Basil)", reaction: "Rapid blackening of tender leaves." }
  ]
};

export const preservationGuides = [
  {
    id: "leafy-greens",
    title: "Leafy Greens & Bagged Salads",
    category: "Produce",
    idealZone: "fridge",
    shelfLifeDays: 8,
    proTip: "Insert a clean dry paper towel or unbleached cloth into the tub/bag. It absorbs condensation which is the #1 cause of bacterial slime.",
    ethylene: "Extremely Sensitive",
    canFreeze: "Blanch for 2 mins, shock in ice water, squeeze dry, then freeze flat."
  },
  {
    id: "fresh-herbs",
    title: "Fresh Tender Herbs (Cilantro, Basil, Parsley)",
    category: "Produce",
    idealZone: "fridge",
    shelfLifeDays: 14,
    proTip: "Trim 1/2 cm off stems and stand them upright in a jar with 2 inches of water, like fresh cut flowers. Cover loosely with a reusable bag. (Note: Keep Basil at room temp!).",
    ethylene: "Sensitive",
    canFreeze: "Chop fine, pack into ice cube trays with olive oil or butter, freeze for cooking drops."
  },
  {
    id: "berries",
    title: "Fresh Berries (Strawberries, Blueberries, Raspberries)",
    category: "Produce",
    idealZone: "fridge",
    shelfLifeDays: 7,
    proTip: "Do NOT wash upon grocery arrival! Moisture triggers rapid Botrytis mold. Wash right before eating, or do a 1:3 vinegar-water quick bath, pat 100% dry, and line container with paper towel.",
    ethylene: "Moderate",
    canFreeze: "Spread on baking tray to freeze individually, then bag up for smoothies."
  },
  {
    id: "bread-bakery",
    title: "Artisan & Sliced Bread",
    category: "Bakery",
    idealZone: "pantry",
    shelfLifeDays: 5,
    proTip: "NEVER refrigerate bread! Refrigerator temperatures accelerate retrogradation (starch recrystallization), making bread go stale 3x faster than room temp.",
    ethylene: "Neutral",
    canFreeze: "Slice before freezing. Toast slices directly from freezer without thawing."
  },
  {
    id: "potatoes-onions",
    title: "Potatoes & Dry Onions",
    category: "Produce",
    idealZone: "pantry",
    shelfLifeDays: 30,
    proTip: "Store in a cool, dark, well-ventilated basket, but KEEP POTATOES AND ONIONS SEPARATE! Onions release moisture and gases that make potatoes sprout quickly.",
    ethylene: "Onions Emit / Potatoes Sensitive",
    canFreeze: "Par-boil potato wedges or caramelize onions in bulk before freezing."
  },
  {
    id: "dairy-milk",
    title: "Cow's Milk & Plant Milks",
    category: "Dairy",
    idealZone: "fridge",
    shelfLifeDays: 10,
    proTip: "Stop storing milk in the refrigerator door! Door temperature fluctuates between 6°C-10°C with every open. Keep milk on the colder middle or bottom rear shelf (2°C-4°C).",
    ethylene: "Neutral",
    canFreeze: "Can be frozen in plastic jugs (leave 2 inches headspace for expansion). Shake well after thawing."
  },
  {
    id: "cheeses",
    title: "Hard & Semi-Hard Cheeses",
    category: "Dairy",
    idealZone: "fridge",
    shelfLifeDays: 28,
    proTip: "Do not suffocate in tight plastic wrap (traps ammonia). Wrap in wax or parchment paper, then loose in an open ziplock or reusable container.",
    ethylene: "Neutral",
    canFreeze: "Grate block first, freeze in airtight jar. Throw handfuls straight onto pastas or pizzas."
  },
  {
    id: "leftovers",
    title: "Cooked Meals & Prepared Leftovers",
    category: "Leftovers",
    idealZone: "fridge",
    shelfLifeDays: 4,
    proTip: "Follow the 2-Hour Rule: cool food within 2 hours of cooking, label with date in clear glass containers. Place at eye level (front row) so they are eaten first.",
    ethylene: "Neutral",
    canFreeze: "Freeze in single-portion containers for instant emergency lunches."
  }
];
