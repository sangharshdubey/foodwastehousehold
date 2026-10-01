export const defaultWeeklyMealPlan = {
  Monday: {
    Breakfast: {
      title: "Methi Thepla with Fresh Curd & Pickle",
      recipeId: null,
      servings: 4,
      usesPantryIds: ["item-8"], // Dahi
      status: "completed",
      notes: "Traditional Gujarati whole wheat flatbread."
    },
    Lunch: {
      title: "Dal Tadka with Steamed Basmati Rice & Bhindi Sabzi",
      recipeId: null,
      servings: 4,
      usesPantryIds: ["item-7", "item-10"],
      status: "completed",
      notes: "Classic Indian comfort meal."
    },
    Dinner: {
      title: "Desi Palak & Paneer Bhurji with Phulkas",
      recipeId: "recipe-palak-paneer-bhurji",
      servings: 4,
      usesPantryIds: ["item-1", "item-2", "item-9"], // Palak, Paneer, Capsicum
      status: "completed",
      notes: "Saved 250g Palak and fresh paneer from spoiling!"
    }
  },
  Tuesday: {
    Breakfast: {
      title: "Tadka Roti Poha & Masala Churma",
      recipeId: "recipe-roti-poha",
      servings: 2,
      usesPantryIds: ["item-3", "item-5", "item-9"], // Rotis, Dhaniya, Capsicum
      status: "planned",
      notes: "Rescues 5 leftover Monday night rotis into hot savory breakfast."
    },
    Lunch: {
      title: "Mumbai Street-Style Tawa Pulao with Boondi Raita",
      recipeId: "recipe-tawa-pulao",
      servings: 3,
      usesPantryIds: ["item-5", "item-7", "item-8", "item-9"], // Rice, Dhaniya, Dahi, Capsicum
      status: "planned",
      notes: "Utilizes day-old refrigerated basmati rice."
    },
    Dinner: {
      title: "Sour Dahi Kadhi Pakoda with Jeera Rice",
      recipeId: "recipe-dahi-kadhi",
      servings: 4,
      usesPantryIds: ["item-5", "item-8"], // Curd, Dhaniya
      status: "planned",
      notes: "Puts aged curd to its most delicious traditional use."
    }
  },
  Wednesday: {
    Breakfast: {
      title: "Leftover Dal Missi Parathas with Butter",
      recipeId: "recipe-dal-paratha",
      servings: 4,
      usesPantryIds: ["item-5", "item-10"], // Dal, Dhaniya
      status: "planned",
      notes: "Kneads Monday leftover dal into flour for crisp breakfast parathas."
    },
    Lunch: {
      title: "Kabuli Chana Masala with Jeera Pulao",
      recipeId: null,
      servings: 4,
      usesPantryIds: ["item-12"], // Chana
      status: "planned",
      notes: "Protein-packed chickpea curry."
    },
    Dinner: {
      title: "Aloo Shimla Mirch Sabzi with Phulkas & Dhaniya Chutney",
      recipeId: "recipe-dhaniya-chutney",
      servings: 4,
      usesPantryIds: ["item-5", "item-9"], // Dhaniya, Capsicum
      status: "planned",
      notes: "Light comforting weekday dinner."
    }
  },
  Thursday: {
    Breakfast: {
      title: "Poha with Roasted Peanuts & Kadi Patta",
      recipeId: null,
      servings: 3,
      usesPantryIds: ["item-5"],
      status: "planned",
      notes: "Light flaked rice breakfast."
    },
    Lunch: {
      title: "Dal Palak Khichdi with Roasted Papad & Ghee",
      recipeId: null,
      servings: 3,
      usesPantryIds: ["item-1"],
      status: "planned",
      notes: "Detox khichdi bowl."
    },
    Dinner: {
      title: "Paneer Tikka Masala with Garlic Naan",
      recipeId: null,
      servings: 4,
      usesPantryIds: ["item-2", "item-8"],
      status: "planned",
      notes: "Family feast."
    }
  },
  Friday: {
    Breakfast: {
      title: "Besan Chilla with Mint Chutney",
      recipeId: null,
      servings: 3,
      usesPantryIds: ["item-5"],
      status: "planned",
      notes: "Savory chickpea flour crepes."
    },
    Lunch: {
      title: "Rajma Masala with Steamed Rice",
      recipeId: null,
      servings: 4,
      usesPantryIds: [],
      status: "planned",
      notes: "Friday Punjabi special."
    },
    Dinner: {
      title: "Mix Veggie Uttapam with Coconut Chutney",
      recipeId: null,
      servings: 4,
      usesPantryIds: ["item-9"],
      status: "planned",
      notes: "South Indian dinner."
    }
  },
  Saturday: {
    Breakfast: {
      title: "Masala Dosa with Sambar & Chutney",
      recipeId: null,
      servings: 4,
      usesPantryIds: [],
      status: "planned",
      notes: "Weekend South Indian breakfast."
    },
    Lunch: {
      title: "Kadhi Khichdi with Batata Nu Shaak",
      recipeId: "recipe-dahi-kadhi",
      servings: 4,
      usesPantryIds: ["item-8"],
      status: "planned",
      notes: "Comforting Gujarati lunch."
    },
    Dinner: {
      title: "Dum Biryani with Cucumber Raita",
      recipeId: null,
      servings: 5,
      usesPantryIds: ["item-8"],
      status: "planned",
      notes: "Weekend biryani feast."
    }
  },
  Sunday: {
    Breakfast: {
      title: "Aloo Parathas with White Butter & Dahi",
      recipeId: null,
      servings: 4,
      usesPantryIds: ["item-8"],
      status: "planned",
      notes: "Sunday brunch classic."
    },
    Lunch: {
      title: "Fridge Cleanout Thali (Assorted Remixed Curries)",
      recipeId: null,
      servings: 4,
      usesPantryIds: [],
      status: "planned",
      notes: "Clear all small dabbas before new weekly sabzi mandi shopping."
    },
    Dinner: {
      title: "Moong Dal Khichdi with Kadhi & Achaar",
      recipeId: null,
      servings: 4,
      usesPantryIds: [],
      status: "planned",
      notes: "Light Sunday night reset meal."
    }
  }
};
