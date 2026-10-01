export const rescueRecipes = [
  {
    id: "recipe-roti-poha",
    title: "Tadka Roti Poha & Masala Churma",
    subtitle: "The timeless Indian household genius: transforms dry leftover chapatis into a hot, savory breakfast.",
    imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
    prepTime: "12 mins",
    difficulty: "Easy",
    servings: 2,
    category: "Quick Skillet",
    tags: ["Vegetarian", "Instant 12-Min", "Breakfast Classic", "Zero Roti Waste"],
    primaryTargetIngredients: ["Leftover Phulkas / Rotis (5 pcs)", "Green Shimla Mirch (Capsicum)", "Fresh Dhaniya / Coriander"],
    ingredients: [
      { name: "Day-Old Rotis / Chapatis", qty: "4-5 rotis, shredded into flakes", fromPantry: true },
      { name: "Mustard Seeds (Rai) & Cumin (Jeera)", qty: "1 tsp each" },
      { name: "Kadi Patta (Curry Leaves) & Green Chilli", qty: "6-8 leaves + 2 chillies slit" },
      { name: "Onion & Capsicum", qty: "1 onion finely diced + half capsicum", fromPantry: true },
      { name: "Haldi (Turmeric) & Hing (Asafoetida)", qty: "1/2 tsp haldi + pinch hing" },
      { name: "Roasted Peanuts (Mungfali)", qty: "2 tbsp for crunch" },
      { name: "Fresh Dhaniya & Lemon Juice", qty: "Finely chopped + half lemon", fromPantry: true }
    ],
    flexibleReplacements: "Works equally well with leftover parathas, theplas, or bread slices. Add boiled potatoes or peas if on hand.",
    zeroWasteSecret: "Sprinkle a few drops of warm water or buttermilk over the shredded roti flakes 2 minutes before tossing into the tadka. It restores pillow-soft moisture!",
    instructions: [
      "Tear leftover dry rotis by hand or pulse 3 times in a mixer jar into small bite-sized flakes.",
      "Heat 1.5 tbsp groundnut oil or desi ghee in a kadai. Add mustard seeds, cumin, hing, and roasted peanuts until fragrant and crackling.",
      "Add slit green chillies, curry leaves, and diced onions. Sauté until onions turn light pinkish translucent.",
      "Add diced capsicum, turmeric powder, and salt. Sauté on medium flame for 2 minutes.",
      "Toss in the shredded roti flakes. Sprinkle 2 tablespoons of water, cover with lid, and steam on low flame for 3 minutes.",
      "Turn off flame, squeeze fresh lemon juice, garnish lavishly with fresh dhaniya, and serve steaming hot with chai."
    ],
    co2SavedKg: 1.4,
    moneySavedEst: 140 // INR ₹140
  },
  {
    id: "recipe-tawa-pulao",
    title: "Mumbai Street-Style Tawa Pulao",
    subtitle: "Cold day-old rice holds its grains distinct and absorbs spicy Pav Bhaji masala better than fresh rice.",
    imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
    prepTime: "15 mins",
    difficulty: "Beginner",
    servings: 3,
    category: "Stir-Fry & Wok",
    tags: ["Mumbai Street Food", "Kid-Friendly", "15-Min Dinner", "Rice Rescue"],
    primaryTargetIngredients: ["Leftover Cooked Basmati Rice", "Green Shimla Mirch (Capsicum)", "Fresh Dhaniya / Coriander"],
    ingredients: [
      { name: "Cold Cooked Basmati Rice", qty: "3 cups cold refrigerated rice", fromPantry: true },
      { name: "Butter (Makhan) & Desi Ghee", qty: "2 tbsp butter + 1 tsp ghee" },
      { name: "Capsicum & Chopped Tomatoes", qty: "1 cup mixed diced", fromPantry: true },
      { name: "Pav Bhaji Masala", qty: "1.5 tbsp (the secret flavor builder)" },
      { name: "Ginger-Garlic Paste", qty: "1 tsp fresh paste" },
      { name: "Kashmiri Red Chilli Powder & Salt", qty: "1 tsp for glowing red color" },
      { name: "Fresh Dhaniya & Lemon", qty: "Finely chopped", fromPantry: true }
    ],
    flexibleReplacements: "Fold in diced paneer cubes, boiled green peas, or leftover scrambled eggs for rich protein.",
    zeroWasteSecret: "Rub a few drops of oil on your clean palms to gently separate cold rice grains before adding to the butter masala. Keeps grains unbroken!",
    instructions: [
      "Heat a large tawa or flat-bottomed pan over medium flame. Melt butter with a drop of ghee to prevent burning.",
      "Add cumin seeds and ginger-garlic paste; sauté for 30 seconds until raw smell dissipates.",
      "Add diced onions, capsicum, and tomatoes. Cook on high flame for 3 minutes until tomatoes soften but vegetables stay crunchy.",
      "Stir in pav bhaji masala, red chilli powder, and salt. Cook for 60 seconds until butter separates.",
      "Add the cold cooked rice. Using a flat spatula, gently fold the rice into the masala on high heat without crushing the grains.",
      "Toss for 3 minutes until steaming hot and aromatic. Finish with fresh dhaniya and lemon juice wedges."
    ],
    co2SavedKg: 1.8,
    moneySavedEst: 220 // INR ₹220
  },
  {
    id: "recipe-dahi-kadhi",
    title: "Sour Dahi Kadhi Pakoda / Tadka Kadhi",
    subtitle: "In Indian culinary science, sour curd past its 'Best Before' date is the crown jewel for authentic Kadhi.",
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    prepTime: "25 mins",
    difficulty: "Intermediate",
    servings: 4,
    category: "Soups & Broths",
    tags: ["Immunity Booster", "Probiotic Rich", "Comfort Food", "Curd Rescue"],
    primaryTargetIngredients: ["Fresh Desi Curd / Dahi", "Fresh Dhaniya / Coriander"],
    ingredients: [
      { name: "Sour Dahi / Curd", qty: "1.5 cups whisked sour curd", fromPantry: true },
      { name: "Besan (Gram Flour)", qty: "4 tablespoons" },
      { name: "Water", qty: "3.5 cups cold water" },
      { name: "Methi Dana (Fenugreek Seeds)", qty: "1/2 tsp" },
      { name: "Mustard, Cumin, Hing & Haldi", qty: "1 tsp each + generous hing" },
      { name: "Dry Red Chillies & Curry Leaves", qty: "2 whole chillies + 10 leaves" },
      { name: "Desi Ghee for Tadka", qty: "1.5 tbsp" }
    ],
    flexibleReplacements: "Can add onion pakodas, boiled potato cubes, or boondi right before serving.",
    zeroWasteSecret: "Sourness in aged curd is lactic acid accumulation, which coagulates besan proteins into a velvety smooth sauce that fresh curd cannot replicate.",
    instructions: [
      "In a bowl, whisk sour dahi, besan, haldi, salt, and 3.5 cups water until 100% lump-free.",
      "Pour into a heavy pot and bring to a continuous boil over medium flame, stirring in ONE direction until it begins simmering.",
      "Lower the flame and simmer gently for 15-20 minutes until the raw besan aroma cooks out and sauce thickens.",
      "In a small tadka pan, heat desi ghee. Crackle mustard seeds, cumin, methi dana, hing, whole red chillies, and curry leaves.",
      "Pour sizzling ghee tadka directly into the simmering kadhi with a loud sizzle! Cover with lid immediately for 2 minutes to trap aroma.",
      "Serve hot with steamed rice or khichdi."
    ],
    co2SavedKg: 2.2,
    moneySavedEst: 190 // INR ₹190
  },
  {
    id: "recipe-palak-paneer-bhurji",
    title: "Desi Palak & Paneer Bhurji Paratha",
    subtitle: "Rescues wilting spinach and fresh paneer within 15 minutes into a rich, restaurant-style bhurji.",
    imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    prepTime: "15 mins",
    difficulty: "Easy",
    servings: 3,
    category: "Quick Skillet",
    tags: ["High Protein", "Keto-Friendly", "15-Min Dinner", "Vegetarian Hero"],
    primaryTargetIngredients: ["Fresh Desi Palak (Spinach)", "Fresh Malai Paneer", "Green Shimla Mirch (Capsicum)"],
    ingredients: [
      { name: "Fresh / Wilted Palak", qty: "1 bunch, washed & roughly chopped", fromPantry: true },
      { name: "Fresh Malai Paneer", qty: "200g, crumbled with fingers", fromPantry: true },
      { name: "Onion & Tomato", qty: "1 medium each, finely chopped" },
      { name: "Green Chillies & Ginger", qty: "2 chillies + 1 inch ginger grated" },
      { name: "Garam Masala & Kasuri Methi", qty: "1/2 tsp garam masala + 1 tsp methi" },
      { name: "Ghee / Mustard Oil", qty: "1.5 tbsp" }
    ],
    flexibleReplacements: "Substitute paneer with scrambled farm eggs or crumbled firm tofu for a high-protein vegan bhurji.",
    zeroWasteSecret: "Do not discard palak stems! Finely dice tender stems and sauté them along with the onions—they contain maximum dietary fiber and crunch.",
    instructions: [
      "Heat ghee or oil in a kadai. Sauté cumin seeds, grated ginger, and green chillies for 1 minute.",
      "Add chopped onions and sauté until golden brown. Add tomatoes, haldi, coriander powder, and salt; cook until tomatoes turn mushy.",
      "Add the chopped palak. Sauté over medium-high heat for 2 minutes until just wilted and dark emerald green.",
      "Tumble in the crumbled paneer and garam masala. Toss gently for 2 minutes—do not overcook or paneer turns rubbery.",
      "Crush kasuri methi between palms and sprinkle on top.",
      "Enjoy with hot phulkas, parathas, or stuffed inside toasted bread as a grilled sandwich."
    ],
    co2SavedKg: 2.6,
    moneySavedEst: 280 // INR ₹280
  },
  {
    id: "recipe-dal-paratha",
    title: "Leftover Dal Missi Paratha",
    subtitle: "Never throw away leftover Dal Tadka or Sambhar: knead directly into whole wheat atta for protein parathas.",
    imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    prepTime: "20 mins",
    difficulty: "Beginner",
    servings: 4,
    category: "Bake & Casserole",
    tags: ["Traditional Dhaba Style", "High Fiber", "Breakfast Hero", "Zero Dal Waste"],
    primaryTargetIngredients: ["Leftover Dal Tadka (Yellow Dal)", "Fresh Dhaniya / Coriander"],
    ingredients: [
      { name: "Leftover Dal Tadka or Dal Makhani", qty: "1 cup cold dal", fromPantry: true },
      { name: "Chakki Fresh Atta (Whole Wheat)", qty: "2 cups" },
      { name: "Ajwain (Carom Seeds)", qty: "1 tsp crushed between palms" },
      { name: "Finely Chopped Onion & Dhaniya", qty: "Handful each", fromPantry: true },
      { name: "Kasuri Methi & Red Chilli Powder", qty: "1 tsp each" },
      { name: "Desi Ghee for roasting", qty: "2 tbsp" }
    ],
    flexibleReplacements: "Any cooked dal works (Toor dal, Moong dal, Chana dal, or Pachrangi dal).",
    zeroWasteSecret: "Use ZERO extra water when kneading! Let the dal supply all hydration. The cooked spices and ghee inside the dal make the parathas stay soft for 24 hours.",
    instructions: [
      "In a parat (large mixing bowl), combine atta, ajwain, chopped onion, dhaniya, kasuri methi, and a pinch of salt.",
      "Pour the cold leftover dal into the flour. Knead into a smooth, pliable dough without adding extra water.",
      "Rest dough covered for 10 minutes.",
      "Pinch medium balls, roll out into round parathas dusting with dry flour.",
      "Cook on a hot iron tawa, applying desi ghee on both sides until golden brown crisp spots appear.",
      "Serve hot with fresh dahi, mango pickle, and green chutney."
    ],
    co2SavedKg: 1.7,
    moneySavedEst: 160 // INR ₹160
  },
  {
    id: "recipe-dhaniya-chutney",
    title: "Zero-Waste Dhaniya Stem & Pudina Chutney",
    subtitle: "Rescue limp coriander bunches and stems into India's most versatile spicy green chutney.",
    imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
    prepTime: "8 mins",
    difficulty: "Beginner",
    servings: 6,
    category: "Quick Skillet",
    tags: ["No-Cook", "Condiment Hero", "Digestive Aid", "Herbal Rescue"],
    primaryTargetIngredients: ["Fresh Dhaniya / Coriander"],
    ingredients: [
      { name: "Fresh / Wilted Coriander (Leaves & Stems)", qty: "1 big bunch (100g)", fromPantry: true },
      { name: "Fresh Mint (Pudina) or Amla", qty: "1/2 cup leaves" },
      { name: "Spicy Green Chillies & Ginger", qty: "3 chillies + 1 inch ginger" },
      { name: "Roasted Chana Dal / Bhuna Jeera", qty: "1 tbsp for creamy binding" },
      { name: "Kala Namak (Black Salt) & Chaat Masala", qty: "1/2 tsp each" },
      { name: "Fresh Lemon Juice & 2 Ice Cubes", qty: "Juice of 1 lemon" }
    ],
    flexibleReplacements: "Toss in celery leaves, spinach leaves, or raw mango pieces if available.",
    zeroWasteSecret: "Blend with 2 ice cubes! Heat generated by blender blades oxidizes chlorophyll into brown color; ice cubes keep chutney electric fluorescent green!",
    instructions: [
      "Wash coriander thoroughly in cold water (keep all tender stems—they hold 70% of the aromatic essential oils).",
      "Add coriander, mint, green chillies, ginger, roasted chana dal, cumin, black salt, and ice cubes into blender jar.",
      "Blend on pulse until smoothly ground into a thick, vibrant green paste.",
      "Squeeze fresh lemon juice and stir with spoon.",
      "Store in a clean glass jar in fridge for up to 7 days, or freeze in ice cube trays for instant portions."
    ],
    co2SavedKg: 1.2,
    moneySavedEst: 95 // INR ₹95
  }
];
