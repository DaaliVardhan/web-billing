import type { Item } from "@/types";

export const items: Omit<Item, 'quantity'>[] = [
  {
    id: 'REGSHA',
    name: "Chicken Regular Shawarma",
    category: "Shawarma",
    price: 110,
  },
  {
    id: 'SPLSHA',
    name: "Chicken Special Shawarma",
    category: "Shawarma",
    price: 130,
  },
  {
    id: 'PPSHA',
    name: "Chicken Peri-Peri Shawarma",
    category: "Shawarma",
    price: 140,
  },
  {
    id: "CHSSHA",
    name: "Chicken Cheese Shawarma",
    category: "Shawarma",
    price: 150,
  },
  {
    id: "CHPSHA",
    name: "Chicken Chips Shawarma",
    category: "Shawarma",
    price: 150,
  },
  {
    id: "LAVSHA",
    name: "Lavish Shawarma",
    category: "Shawarma",
    price: 200,
  },
  {
    id: "LOADBOWL",
    name: "Chicken Loaded Bowl",
    category: "Bowls",
    price: 200,
  },
  {
    id: "FFRIES",
    name: "French Fries",
    category: "Fries",
    price: 90,
  },
  {
    id: "WB",
    name: "Water bottle",
    category: "Drinks",
    price: 10,
  },
];
