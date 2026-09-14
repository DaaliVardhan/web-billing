// db.js
import { Dexie, type EntityTable } from "dexie"
import type { Menu, Order } from "../types"
import { items } from "../seed"

const db = new Dexie("OrderDB") as Dexie & {
  order: EntityTable<Order, "orderId">
  menu: EntityTable<Menu, "id">
}

// Schema declaration:
db.version(1).stores({
  order: "++orderId, items, quantity, totalPrice, type, createdAt, updatedAt",
  menu: "id, name, order, category, type, price, status, createdAt, updatedAt",
})

// Seed the menu table with initial data
db.on("populate", async () => {
  await db.menu.count().then(async (count) => {
    if (count === 0 || items.length !== count) {
      await db.menu.bulkPut(
        items.map((item) => ({
          ...item,
          status: "Available",
          createdAt: new Date(),
          updatedAt: new Date(),
        }))
      )
    }
  })
})

export type { Order }
export { db }
