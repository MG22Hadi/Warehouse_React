// بيانات المنتجات الثابتة
export const warehouses = [
  { id: "1", name: "مستودع دمشق" },
  { id: "2", name: "مستودع حلب" },
  { id: "3", name: "مستودع حمص" },
];

export const allProducts = [
  {
    id: 1,
    warehouseId: "1",
    name: "منتج مستودع A",
    code: 101,
    description: "وصف منتج A.",
    price: "120.00$",
    date: "2025-05-15",
  },
  {
    id: 2,
    warehouseId: "2",
    name: "منتج مستودع B",
    code: 102,
    description: "وصف منتج B.",
    price: "150.00$",
    date: "2025-05-15",
  },
  {
    id: 3,
    warehouseId: "3",
    name: "منتج من مستودع A",
    code: 103,
    description: "وصف آخر.",
    price: "95.00$",
    date: "2025-05-16",
  },
  {
    id: 4,
    warehouseId: "3",
    name: "منتج من مستودع A",
    code: 103,
    description: "وصف آخر.",
    price: "95.00$",
    date: "2025-05-16",
  },
];
