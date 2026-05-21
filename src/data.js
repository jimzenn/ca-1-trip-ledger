export const participants = ["jim", "zxc", "yuki", "pp", "小美", "ZC"];

export const transactions = [
  // ── 5/12 ──────────────────────────────────────────────
  {
    id: "A1",
    date: "5/12",
    dateRange: ["5/12", "5/14"],
    category: "transport",
    subcategory: "gas-parking",
    venue: "Road trip — gas + parking",
    total: 254.00,
    payer: "zxc",
    participants: ["jim", "zxc", "yuki", "pp"],
    split: {
      method: "even",
      shares: { jim: 63.50, zxc: 63.50, yuki: 63.50, pp: 63.50 }
    },
    notes: "Gas $87 + $82 + $65 = $234, parking $20"
  },
  {
    id: "C1",
    date: "5/12",
    category: "meal",
    subcategory: "lunch",
    venue: "Pizza Heaven (Carmel)",
    total: 81.00,
    payer: "zxc",
    participants: ["jim", "zxc", "yuki", "pp"],
    split: {
      method: "even",
      shares: { jim: 20.25, zxc: 20.25, yuki: 20.25, pp: 20.25 }
    }
  },
  {
    id: "B1",
    date: "5/12",
    category: "lodging",
    venue: "Ragged Point Inn",
    total: 538.00,
    payer: "zxc",
    participants: ["jim", "zxc", "yuki", "pp"],
    split: {
      method: "even",
      shares: { jim: 134.50, zxc: 134.50, yuki: 134.50, pp: 134.50 }
    }
  },
  {
    id: "C2",
    date: "5/12",
    category: "meal",
    subcategory: "dinner",
    venue: "Ragged Point Restaurant",
    total: 255.50,
    payer: "jim",
    participants: ["jim", "zxc", "yuki", "pp"],
    split: {
      method: "custom",
      shares: { jim: 67.01, zxc: 67.01, pp: 67.01, yuki: 54.48 }
    },
    notes: "yuki ate less. Food subtotal $174 + drinks + tax + tip."
  },

  // ── 5/13 ──────────────────────────────────────────────
  {
    id: "C9",
    date: "5/13",
    category: "meal",
    subcategory: "breakfast",
    venue: "Ragged Point Inn breakfast",
    total: 96.00,
    payer: "zxc",
    participants: ["zxc", "yuki", "pp"],
    split: {
      method: "even",
      shares: { zxc: 32.00, yuki: 32.00, pp: 32.00 }
    },
    notes: "jim not included."
  },
  {
    id: "B2",
    date: "5/13",
    category: "lodging",
    venue: "Arroyo Grande Airbnb",
    total: 298.00,
    payer: "zxc",
    participants: ["jim", "zxc", "yuki", "pp"],
    split: {
      method: "even",
      shares: { jim: 74.50, zxc: 74.50, yuki: 74.50, pp: 74.50 }
    }
  },
  {
    id: "C3",
    date: "5/13",
    category: "meal",
    subcategory: "lunch",
    venue: "The Galley Seafood Grill & Bar (Morro Bay)",
    total: 174.00,
    payer: "zxc",
    participants: ["jim", "zxc", "yuki", "pp"],
    split: {
      method: "custom",
      shares: { jim: 55.77, zxc: 39.41, yuki: 39.41, pp: 39.41 }
    },
    notes: "jim's Grenache Blanc + share of tax/tip ≈ $16.36 self-paid; food $157.64 / 4 = $39.41."
  },
  {
    id: "C4",
    date: "5/13",
    category: "meal",
    subcategory: "dinner",
    venue: "Wooly's / Oyster Loft (Pismo Beach)",
    total: 83.33,
    payer: "jim",
    participants: ["jim", "zxc", "yuki", "pp"],
    split: {
      method: "even",
      shares: { jim: 20.83, zxc: 20.83, yuki: 20.83, pp: 20.83 }
    }
  },

  // ── 5/14 ──────────────────────────────────────────────
  {
    id: "B3",
    date: "5/14",
    category: "lodging",
    venue: "Ayres Hotel Morro Bay — Night 1 (2 rooms)",
    total: 444.00,
    payer: "zxc",
    participants: ["jim", "zxc", "yuki", "pp"],
    split: {
      method: "even",
      shares: { jim: 111.00, zxc: 111.00, yuki: 111.00, pp: 111.00 }
    }
  },
  {
    id: "B-COUPON",
    date: "5/14",
    dateRange: ["5/14", "5/16"],
    category: "credit",
    venue: "Airbnb $259 Coupon",
    total: -259.00,
    payer: "jim",
    participants: ["jim", "zxc", "yuki", "pp", "ZC"],
    split: {
      method: "custom",
      shares: { jim: -64.75, zxc: -21.58, yuki: -64.75, pp: -64.75, ZC: -43.17 }
    },
    notes: "LA Airbnb 全额退款 + $259 抵扣券，jim 以现金形式持有。按 Ayres 三晚的人·夜分摊（$259 / 12 = $21.58／人·夜）：jim/pp/yuki 各 3 晚，ZC 2 晚，zxc 1 晚。"
  },
  {
    id: "C8",
    date: "5/14",
    category: "meal",
    venue: "Santo Mezcal (LA)",
    total: 188.00,
    payer: "zxc",
    participants: ["jim", "zxc"],
    split: {
      method: "even",
      shares: { jim: 94.00, zxc: 94.00 }
    },
    notes: "jim + zxc treated yuki/pp; the two of them split the bill 2-way."
  },
  {
    id: "C5",
    date: "5/14",
    category: "meal",
    subcategory: "dinner",
    venue: "Hinodeya Ramen (LA)",
    total: 83.04,
    payer: "jim",
    participants: ["jim", "zxc", "yuki", "pp"],
    split: {
      method: "even",
      shares: { jim: 20.76, zxc: 20.76, yuki: 20.76, pp: 20.76 }
    }
  },

  // ── 5/15 ──────────────────────────────────────────────
  {
    id: "A2-D1",
    date: "5/15",
    category: "transport",
    subcategory: "rental",
    venue: "Hertz LA — Day 1",
    total: 107.035,
    payer: "jim",
    participants: ["jim", "pp", "yuki", "ZC"],
    split: {
      method: "even",
      shares: { jim: 26.76, pp: 26.76, yuki: 26.76, ZC: 26.76 }
    }
  },
  {
    id: "B4",
    date: "5/15",
    category: "lodging",
    venue: "Ayres Hotel Morro Bay — Night 2 (2 rooms)",
    total: 556.38,
    payer: "jim",
    participants: ["jim", "yuki", "pp", "ZC"],
    split: {
      method: "even",
      shares: { jim: 139.10, yuki: 139.10, pp: 139.10, ZC: 139.10 }
    }
  },
  {
    id: "C6",
    date: "5/15",
    category: "meal",
    subcategory: "lunch",
    venue: "Tsujita LA Sawtelle",
    total: 148.00,
    payer: "zxc",
    participants: ["zxc", "jim", "yuki", "pp", "小美"],
    split: {
      method: "even",
      shares: { zxc: 29.60, jim: 29.60, yuki: 29.60, pp: 29.60, "小美": 29.60 }
    }
  },
  {
    id: "C7",
    date: "5/15",
    category: "meal",
    subcategory: "dinner",
    venue: "Thunderbolt (LA)",
    total: 134.64,
    payer: "jim",
    participants: ["jim", "pp", "yuki", "小美"],
    split: {
      method: "custom",
      shares: { jim: 40.46, pp: 46.93, yuki: 23.63, "小美": 23.63 }
    },
    notes: "Food $73 (4-way) + Lychee Daiquiri + Rum $18 (pp) + School Night $13 (jim) + tax/tip $30.64."
  },

  // ── 5/16 ──────────────────────────────────────────────
  {
    id: "A2-D2",
    date: "5/16",
    category: "transport",
    subcategory: "rental",
    venue: "Hertz LA — Day 2",
    total: 107.035,
    payer: "jim",
    participants: ["jim", "pp", "yuki"],
    split: {
      method: "even",
      shares: { jim: 35.68, pp: 35.68, yuki: 35.68 }
    }
  },
  {
    id: "B5",
    date: "5/16",
    category: "lodging",
    venue: "Ayres Hotel Morro Bay — Night 3 (2 rooms)",
    total: 556.38,
    payer: "jim",
    participants: ["jim", "yuki", "pp", "ZC"],
    split: {
      method: "even",
      shares: { jim: 139.10, yuki: 139.10, pp: 139.10, ZC: 139.10 }
    }
  }
];
