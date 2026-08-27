import type { Item } from "@/types"
import { db } from "./db"
import { fallbackToZero } from "@/utils"
import { toast } from "sonner"

export const saveOrder = async (items: Record<string, Item>) => {
  try {
    const quantity = Object.values(items).reduce(
      (acc, item) => acc + fallbackToZero(item.quantity),
      0
    )
    const totalPrice = Object.values(items).reduce(
      (acc, item) => acc + item.price * fallbackToZero(item.quantity),
      0
    )
    const orderId = await db.order.add({
      items: items,
      totalPrice,
      quantity,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    toast(`Order ${orderId} saved successfully`, { position: "top-right" })
  } catch (error) {
    toast("Something went wrong, Order failed", { position: "top-right" })
    console.error(error)
  }
}

export const editOrder = async (
  orderId: number,
  items: Record<string, Item>
) => {
  try {
    const quantity = Object.values(items).reduce(
      (acc, item) => acc + fallbackToZero(item.quantity),
      0
    )
    const totalPrice = Object.values(items).reduce(
      (acc, item) => acc + item.price * fallbackToZero(item.quantity),
      0
    )
    await db.order.update(orderId, {
      items: items,
      totalPrice,
      quantity,
      updatedAt: new Date(),
    })

    toast(`Order ${orderId} updated successfully `, { position: "top-right" })
  } catch (error) {
    toast("Something went wrong, Order update failed", {
      position: "top-right",
    })
    console.error(error)
  }
}

export const deleteOrder = async (orderId: number) => {
  try {
    await db.order.delete(orderId)
    toast(`Order ${orderId} deleted successfully `, { position: "top-right" })
  } catch (error) {
    toast("Something went wrong, Order delete failed ", {
      position: "top-right",
    })
    console.error(error)
  }
}
