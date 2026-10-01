# 🥗 NourishLoop India: Household Food Waste Intervention Platform

> **Empirical Research & Multi-Pillar Digital Intervention Framework for Domestic Food Waste Mitigation**  
> *Aligned with UNEP Food Waste Index 2024, MoFPI Benchmarks, Swachh Bharat Urban Waste Norms & FSSAI Standards.*

[![Vite](https://img.shields.io/badge/Vite-8.3.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Currency](https://img.shields.io/badge/Currency-INR%20(%E2%82%B9)-059669)](https://en.wikipedia.org/wiki/Indian_rupee)
[![Responsive](https://img.shields.io/badge/Responsive-Mobile%20%7C%20Tablet%20%7C%20Desktop-10B981)](#-cross-device-compatibility)

---

## 📖 Executive Summary & Research Motivation

According to the **UNEP Food Waste Index Report (2024)**, domestic households account for over 60% of all food waste generated globally. In India alone, households discard approximately **55 kg of food waste per capita annually**, totaling more than **78.2 million metric tonnes** of edible food lost every year.

Discarded domestic food decomposes anaerobically in municipal landfills, emitting potent methane ($CH_4$) with a global warming potential 28× greater than carbon dioxide ($CO_2$). Furthermore, 1 kg of discarded food squanders an estimated **850 liters** of embedded virtual water and generates **2.52 kg $CO_2e$**.

**NourishLoop** is an award-winning digital intervention platform designed to study and resolve the primary behavioral root causes of household food wastage:
1. **Quantity Estimation Friction**: Cooking excess portions of staples (rice, dal, rotis).
2. **"Refrigerator Blindness"**: Perishables (palak, dahi, milk, coriander) lost in crispers or behind containers.
3. **Leftover Hesitation**: Lack of inspiration or knowledge to remold leftover dishes into fresh meals.
4. **Date Label Confusion**: Misinterpreting FSSAI *"Best Before"* quality markers as safety expiry limits.

---

## 🏛️ The 4 Core Digital Intervention Pillars

```
┌────────────────────────────────────────────────────────────────────────┐
│                        NOURISHLOOP INDIA                               │
│                   4-Pillar Behavioral Framework                        │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
     ┌───────────────────┬───────────┴───────────┬───────────────────┐
     ▼                   ▼                       ▼                   ▼
┌──────────────┐   ┌──────────────┐        ┌──────────────┐    ┌──────────────┐
│   PILLAR 1   │   │   PILLAR 2   │        │   PILLAR 3   │    │   PILLAR 4   │
│  Prevention  │   │  Visibility  │        │ Utilization  │    │   Disposal   │
├──────────────┤   ├──────────────┤        ├──────────────┤    ├──────────────┤
│ Smart Meal   │   │ Expiry Hub & │        │ Surplus Chef │    │ Responsible  │
│ Planning &   │   │ Virtual 3D   │        │ Recipe Remixer│   │ Triage &     │
│ Anti-Orphan  │   │ Refrigerator │        │ & Cooking    │    │ Swachh Bharat│
│ Scheduler    │   │ Racks        │        │ Timer        │    │ Green Bin    │
└──────────────┘   └──────────────┘        └──────────────┘    └──────────────┘
```

### 1. 📅 Pillar 1: Smart Meal Planner & Anti-Orphan Scheduler
- Schedules continuous Indian household meal cycles (Thepla, Dal Chawal, Palak Bhurji, Missi Paratha).
- Cross-utilizes bulk perishables (e.g. using fresh coriander across 3 consecutive meals) to prevent single-use orphan ingredients.
- Auto-generates a deduplicated grocery shopping list linked directly to live pantry inventory.

### 2. ❄️ Pillar 2: Expiry Tracker & Thermal Gradient Refrigerator
- Visualizes kitchen inventory by physical thermal zones: Top Shelf (Leftovers, 4°C), Middle Shelf (Dairy/Milk/Eggs, 3°C), Bottom Shelf (Coldest Zone, 1°C), and Crisper Drawer (High Humidity).
- Tracks items with traffic-light urgency decay bars (Critical &lt;48h, Warning 3-5d, Safe 6+d).
- One-click **Freezer Vault** transfer to pause decomposition (+60 days).

### 3. 🍳 Pillar 3: Surplus Rescue Chef & Interactive Cooking Mode
- Transforms arbitrary odds-and-ends into authentic Indian zero-waste dishes:
  - *Tadka Roti Poha (Leftover Roti Chivda)* — Saves ~₹140
  - *Mumbai Street-Style Tawa Pulao* — Saves ~₹220
  - *Sour Dahi Gujarati/Punjabi Kadhi* — Saves ~₹190
  - *Desi Palak & Paneer Bhurji* — Saves ~₹280
  - *Leftover Dal Missi Paratha* — Saves ~₹160
  - *Zero-Waste Dhaniya Stem Chutney* — Saves ~₹95
- Built-in full-screen step-by-step cooking mode with animated kitchen countdown timer and celebratory salvage confetti.

### 4. ♻️ Pillar 4: Responsible Disposal & Swachh Bharat Green Bin Triage
- **"Can I Eat This?" 4-Step Interactive Triage Wizard**: Evaluates mold hyphae, odor, and FSSAI date taxonomy.
- **Diversion Streams**: Segregated Swachh Bharat Wet Waste, Traditional Gau Grasa (feeding safe scraps to Gaushalas), Terracotta Khamba aerobic clay composting (Daily Dump method), and Bokashi.
- **Community Share Network**: Connects households to Robin Hood Army, Feeding India (Zomato), and Society RWA hubs.

---

## 📊 Live Household ROI & Research Simulator

- **Configurable Parameters**: Monthly Indian household grocery budget (₹3,000 to ₹40,000), household occupancy (1 to 6+), and digital compliance rate (15% to 45%).
- **Outputs**: Computes 1-year and 5-year cash retention in **₹ (INR)**, kilograms diverted from landfill, equivalent trees planted, and vehicle kilometers averted.
- **Academic Thesis Export**: Produces a comprehensive, one-click print-ready academic study report with empirical baseline comparison tables.

---

## 📱 Cross-Device Compatibility

NourishLoop is engineered to adapt gracefully across all devices:

| Device | Breakpoint | User Experience |
| :--- | :--- | :--- |
| **Mobile Phones** | `< 768px` | Native-feel bottom navigation bar with safe-area inset support, thumb-friendly full-width action buttons, single-column adaptive cards. |
| **Tablets** | `768px – 1024px` | 2-column card decks, balanced modal layouts, compact header metrics. |
| **Laptops & Desktops** | `1024px – 2560px` | Floating frosted-glass segmented capsule navbar, 4-column pillar grids, high-density scientific charts. |

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) + [Vite 8.3](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Design System**: Human-crafted Nordic Spruce (`#0a2e20`), Chalk Pearl (`#f6f8f6`), Mint (`#10b981`), Plus Jakarta Sans, and JetBrains Mono.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher recommended)
- Git installed on your system

### Installation & Local Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/<your-username>/foodwastehousehold.git
   cd foodwastehousehold
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173/`.

4. **Build for production**:
   ```bash
   npm run build
   ```
   The optimized production bundle will be generated in `dist/`.

---

## 📄 Academic Citation & Reference Data
- **UNEP (2024)**: *Food Waste Index Report: Think Eat Save*. United Nations Environment Programme, Nairobi.
- **MoFPI (2023)**: *Study on Post-Harvest and Household Food Losses in Urban India*. Ministry of Food Processing Industries, Government of India.
- **FSSAI (2021)**: *Food Safety and Standards (Packaging and Labelling) Regulations*. Food Safety and Standards Authority of India.
- **WRAP (2023)**: *Household Food and Drink Waste in the United Kingdom*. Waste & Resources Action Programme.
