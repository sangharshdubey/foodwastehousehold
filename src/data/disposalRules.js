export const dateLabelTaxonomy = [
  {
    type: "Best Before / सर्वोत्तम उपयोग",
    badge: "Quality Marker (FSSAI Guideline)",
    color: "emerald",
    meaning: "Under FSSAI regulations, 'Best Before' means the food will remain fully marketable and retain its peak aroma, crunch, and nutritional quality until this date.",
    safetyVerdict: "SAFE TO EAT past this date if the sensory test passes (no visible mold, sour off-odor, or curdling).",
    examples: "Packaged Atta, Biscuits, Dal packets, Pickles, Dahi tubs, Ghee, Spices, Sauces.",
    legalStatus: "FSSAI Food Safety and Standards (Packaging and Labelling) Regulations."
  },
  {
    type: "Date of Expiry / समाप्ति तिथि",
    badge: "Strict Safety Cutoff",
    color: "rose",
    meaning: "The estimated date after which the product may not have the quality and biological safety attributes normally expected by the consumers.",
    safetyVerdict: "DO NOT CONSUME past this date. High biological bacterial risk.",
    examples: "Pasteurized Milk pouches past 48h, Fresh Paneer without water brine, Fresh Fish, Pouched Poultry.",
    legalStatus: "Strict health regulation; discarded items should be diverted to wet waste."
  },
  {
    type: "Date of Manufacture (Mfg Date)",
    badge: "Production Timestamp",
    color: "blue",
    meaning: "The date on which the food becomes the product as described. Used alongside 'Best Before 6 months from Mfg Date'.",
    safetyVerdict: "Use to calculate remaining freshness window according to label guidelines.",
    examples: "Oils, Ghee, Papad, Atta, Namkeen, Ready-to-cook mixes.",
    legalStatus: "Mandatory on all packaged foods across India under FSSAI."
  },
  {
    type: "Deep Freeze Preservation",
    badge: "Shelf-Life Extension (+60 Days)",
    color: "amber",
    meaning: "Freezing pauses biological activity completely. Indian foods like grated coconut, ginger-garlic cubes, green peas, and paneer freeze beautifully.",
    safetyVerdict: "Extends perishable life by 60 to 90 days with zero microbial growth.",
    examples: "Fresh green peas (matar), grated coconut, chopped coriander in oil, sliced bread, marinated paneer.",
    legalStatus: "Domestic preservation strategy."
  }
];

export const compostingStreams = [
  {
    stream: "Swachh Bharat Wet Waste (गीला कचरा - Green Bin)",
    icon: "Truck",
    color: "emerald",
    summary: "Segregated biodegradable kitchen waste collected by municipal authorities (BBMP, BMC, MCD) for biomethanation and city composting.",
    allowed: ["All sabzi and fruit peels", "Leftover cooked rice, dal, and rotis", "Tea leaves (chai patti)", "Eggshells", "Coffee grounds"],
    prohibited: ["Plastic milk pouches", "Aluminium foil", "Sanitary waste", "Dry packaging", "Medicines"],
    proTip: "Keep wet waste completely free of plastic liners; line dustbin with newspaper or use direct washable bin."
  },
  {
    stream: "Traditional Gau Grasa / Cow & Animal Feed (गौ ग्रास)",
    icon: "Heart",
    color: "amber",
    summary: "Ancient Indian cultural practice of feeding clean, wholesome vegetable trimmings and stale rotis to local cows or gaushalas.",
    allowed: ["Fresh vegetable trimmings (bottle gourd, pumpkin, cauliflower stems)", "Leftover clean chapatis / rotis (WITHOUT mold)", "Banana peels & fruit trimmings"],
    prohibited: ["Moldy or spoiled food", "Onion & garlic skins", "Spicy curries or oily fried leftovers", "Plastic contaminated scraps"],
    proTip: "Ensure scraps are 100% clean and unseasoned. Never feed food wrapped in plastic or polythene bags!"
  },
  {
    stream: "Terracotta Khamba / Home Aerobic Composting",
    icon: "Leaf",
    color: "teal",
    summary: "3-tier terracotta pots (like Daily Dump Khamba) designed for Indian balconies and apartment kitchens, using cocopeat (Remix powder).",
    allowed: ["Vegetable & fruit peels", "Spent chai patti (rinsed of milk & sugar)", "Crushed eggshells", "Dry leaves, shredded cardboard / brown paper"],
    prohibited: ["Excess cooked oily curries", "Meat bones or large dairy quantities", "Plastics and coated paper"],
    proTip: "Add 1 handful of dry remix powder (cocopeat) for every handful of wet kitchen waste to keep the pot smell-free and fly-free."
  },
  {
    stream: "Bokashi Anaerobic Fermentation",
    icon: "RotateCw",
    color: "violet",
    summary: "Airtight bin system using beneficial microbes to pickle and pre-compost even cooked and dairy scraps without smell.",
    allowed: ["ALL cooked Indian food including oily curries, dal, and rice", "Sour curd and cheese rinds", "Citrus peels (lemon / nimbu)"],
    prohibited: ["Excess liquids (drain watery gravies before adding)", "Spoiled moldy food"],
    proTip: "Compact the scraps tightly with a tamper to squeeze out oxygen. Drain liquid 'Bokashi Tea' weekly as potent fertilizer for potted plants."
  }
];

export const foodItemDisposalDirectory = [
  {
    name: "Spent Chai Patti (Used Tea Leaves)",
    edibleSafety: "Inedible as-is",
    bestDivert: "Home Composting / Potted Rose Plants",
    action: "Rinse thoroughly to wash away milk and sugar residues. Sprinkle directly around rose bushes or add to compost as a potent nitrogen booster."
  },
  {
    name: "Nimbu Peels (Lemon / Lime)",
    edibleSafety: "Zest is edible; squeezed halves inedible",
    bestDivert: "Homemade Bio-Enzyme / Pitambari Cleaner",
    action: "Steep squeezed lemon halves with jaggery and water for 3 months to make non-toxic natural floor cleaner, or use with salt to shine brass and copper puja utensils!"
  },
  {
    name: "Stale Rotis / Phulkas (NO Mold)",
    edibleSafety: "100% Edible & Wholesome",
    bestDivert: "Culinary Rescue (Tadka Roti Poha) or Cow Feed",
    action: "DO NOT DISCARD! Shred and make Tadka Roti Poha, toast into crispy Khakra on a tawa, or feed to local cows (Gau Grasa)."
  },
  {
    name: "Rotis with Visible Green/Black Fuzzy Mold",
    edibleSafety: "UNSAFE — Mycotoxin Risk",
    bestDivert: "Wet Waste / Composting",
    action: "Discard in wet waste. Fungal mycelium penetrates deep through the soft dough layers; never scrape off mold to eat the rest."
  },
  {
    name: "Sour Dahi / Curd Past 'Best Before'",
    edibleSafety: "100% Safe for High-Heat Cooking",
    bestDivert: "Culinary Rescue (Punjabi Kadhi / Dahi Tadka)",
    action: "Do not discard down the sink! Sour curd makes the most authentic Punjabi Kadhi, Dahi Bhalla batter, or Bhatura fermentation dough."
  },
  {
    name: "Banana Peels (Kele ke Chhilke)",
    edibleSafety: "Inedible raw",
    bestDivert: "Plant Fertilizer or Cow Feed",
    action: "Soak peels in water for 48 hours to make potassium-rich organic water for flowering plants, or feed directly to cows."
  },
  {
    name: "Eggshells (Ande ke Chhilke)",
    edibleSafety: "Inedible outer shell",
    bestDivert: "Home Composting or Garden Soil",
    action: "Rinse, crush finely with hands, and sprinkle around tomato and chilli plants. Calcium carbonate prevents blossom end rot."
  },
  {
    name: "Sabzi Trimmings (Lauki, Turai, Bhindi ends)",
    edibleSafety: "Tender skins edible; ends fibrous",
    bestDivert: "Scrap Rasam / Sambhar or Cow Feed",
    action: "Tender peels can be made into traditional South Indian Thogayal / Chutney, or boiled for vegetable broth, or fed to cattle."
  }
];
