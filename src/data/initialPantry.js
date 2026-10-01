// Helper to generate dynamic dates relative to today
const getRelativeDate = (daysOffset) => {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return d.toISOString().split("T")[0];
};

export const defaultPantryItems = [
  {
    id: "item-1",
    name: "Fresh Desi Palak (Spinach)",
    category: "Produce",
    location: "fridge",
    quantity: 1,
    unit: "bunch (250g)",
    expiryDate: getRelativeDate(1), // Expires tomorrow (Critical)
    purchaseDate: getRelativeDate(-3),
    costEst: 35, // INR ₹35
    weightKg: 0.25,
    storageTip: "Wrap in a dry cotton cloth or paper towel to prevent moisture rot. Never wash before storing.",
    isFrozen: false,
    consumed: false
  },
  {
    id: "item-2",
    name: "Fresh Malai Paneer",
    category: "Dairy",
    location: "fridge",
    quantity: 1,
    unit: "pack (200g)",
    expiryDate: getRelativeDate(2), // Critical
    purchaseDate: getRelativeDate(-4),
    costEst: 110, // INR ₹110
    weightKg: 0.20,
    storageTip: "Submerge in fresh water inside an airtight container; change water daily to keep soft for 7 days.",
    isFrozen: false,
    consumed: false
  },
  {
    id: "item-3",
    name: "Leftover Phulkas / Rotis (5 pcs)",
    category: "Bakery",
    location: "countertop",
    quantity: 5,
    unit: "rotis",
    expiryDate: getRelativeDate(1), // Critical
    purchaseDate: getRelativeDate(-1),
    costEst: 40, // INR ₹40
    weightKg: 0.20,
    storageTip: "Reheat on hot tawa with a drop of ghee, or tear into Tadka Roti Poha or Khakra!",
    isFrozen: false,
    consumed: false
  },
  {
    id: "item-4",
    name: "Full Cream Milk (Amul / Nandini)",
    category: "Dairy",
    location: "fridge",
    quantity: 1,
    unit: "pouch (1 Litre)",
    expiryDate: getRelativeDate(2), // Critical
    purchaseDate: getRelativeDate(-1),
    costEst: 66, // INR ₹66
    weightKg: 1.0,
    storageTip: "Boil thoroughly upon arrival, cool, and store on the coldest middle shelf, not on the door.",
    isFrozen: false,
    consumed: false
  },
  {
    id: "item-5",
    name: "Fresh Dhaniya / Coriander",
    category: "Produce",
    location: "fridge",
    quantity: 1,
    unit: "gaddi (100g)",
    expiryDate: getRelativeDate(2), // Critical
    purchaseDate: getRelativeDate(-4),
    costEst: 25, // INR ₹25
    weightKg: 0.10,
    storageTip: "Trim roots, wrap stems in dry tissue, and store in an airtight container or steel dabba.",
    isFrozen: false,
    consumed: false
  },
  {
    id: "item-6",
    name: "Ripe Yellow Robusta Bananas",
    category: "Produce",
    location: "countertop",
    quantity: 4,
    unit: "bananas",
    expiryDate: getRelativeDate(1), // Critical
    purchaseDate: getRelativeDate(-4),
    costEst: 40, // INR ₹40
    weightKg: 0.45,
    storageTip: "Wrap crown stems in foil. If overripening, freeze peeled slices for Sheera or Banana Lassi.",
    isFrozen: false,
    consumed: false
  },
  {
    id: "item-7",
    name: "Leftover Cooked Basmati Rice",
    category: "Leftovers",
    location: "fridge",
    quantity: 1,
    unit: "bowl (300g)",
    expiryDate: getRelativeDate(1), // Critical
    purchaseDate: getRelativeDate(-1),
    costEst: 50, // INR ₹50
    weightKg: 0.30,
    storageTip: "Cool within 2 hours of cooking. Ideal for Mumbai street-style Tawa Pulao or Lemon Rice!",
    isFrozen: false,
    consumed: false
  },
  {
    id: "item-8",
    name: "Fresh Desi Curd / Dahi",
    category: "Dairy",
    location: "fridge",
    quantity: 1,
    unit: "matka tub (400g)",
    expiryDate: getRelativeDate(4), // Warning
    purchaseDate: getRelativeDate(-4),
    costEst: 55, // INR ₹55
    weightKg: 0.40,
    storageTip: "If curd turns slightly sour past date, don't discard! It makes the best Punjabi Kadhi or Dahi Vada batter.",
    isFrozen: false,
    consumed: false
  },
  {
    id: "item-9",
    name: "Green Shimla Mirch (Capsicum)",
    category: "Produce",
    location: "fridge",
    quantity: 2,
    unit: "peppers (250g)",
    expiryDate: getRelativeDate(4), // Warning
    purchaseDate: getRelativeDate(-3),
    costEst: 35, // INR ₹35
    weightKg: 0.25,
    storageTip: "Keep completely dry in vegetable crisper drawer. Wipe off any condensation drops.",
    isFrozen: false,
    consumed: false
  },
  {
    id: "item-10",
    name: "Leftover Dal Tadka (Yellow Dal)",
    category: "Leftovers",
    location: "fridge",
    quantity: 1,
    unit: "dabba (350g)",
    expiryDate: getRelativeDate(2), // Critical
    purchaseDate: getRelativeDate(-1),
    costEst: 60, // INR ₹60
    weightKg: 0.35,
    storageTip: "Knead into whole wheat atta with ajwain to make crisp, delicious Dal Missi Parathas!",
    isFrozen: false,
    consumed: false
  },
  {
    id: "item-11",
    name: "Farm Eggs (Tray)",
    category: "Dairy",
    location: "fridge",
    quantity: 6,
    unit: "eggs",
    expiryDate: getRelativeDate(14), // Safe
    purchaseDate: getRelativeDate(-4),
    costEst: 54, // INR ₹54 (₹9/egg)
    weightKg: 0.35,
    storageTip: "Keep in carton on middle shelf. Test freshness with water bowl float test.",
    isFrozen: false,
    consumed: false
  },
  {
    id: "item-12",
    name: "Kabuli Chana (Chickpeas)",
    category: "Pantry",
    location: "pantry",
    quantity: 1,
    unit: "kg",
    expiryDate: getRelativeDate(180), // Safe
    purchaseDate: getRelativeDate(-30),
    costEst: 140, // INR ₹140
    weightKg: 1.0,
    storageTip: "Store in dry airtight container with 1-2 bay leaves to deter pantry weevils.",
    isFrozen: false,
    consumed: false
  }
];
