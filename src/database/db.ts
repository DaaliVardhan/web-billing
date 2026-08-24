// db.js
import { Dexie, type EntityTable } from "dexie";
import type { Order } from "../types";



const db = new Dexie("OrderDB") as Dexie & {
  order: EntityTable<
    Order,
    "orderId" // primary key "id" (for the typings only)
  >
}

// Schema declaration:
db.version(1).stores({
  order: "++orderId, items, quantity, totalPrice, createdAt", // primary key "id" (for the runtime!)
})

export type { Order }
export { db };
