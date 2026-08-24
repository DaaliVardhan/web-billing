import type { Item } from "@/types"
import { db } from "./db"
import { fallbackToZero } from "@/utils"

export const saveOrder = async (items: Record<string, Item>) => {
  const quantity = Object.values(items).reduce(
    (acc, item) => acc + fallbackToZero(item.quantity),
    0
  )
  const totalPrice = Object.values(items).reduce(
    (acc, item) => acc + item.price * fallbackToZero(item.quantity),
    0
  )
  try {
    const orderId = await db.order.add({
      items: items,
      totalPrice,
      quantity,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    })

    alert("Order saved " + orderId)
  } catch (error) {
    console.error(error)
  }
}

export const editOrder = async (
  orderId: number,
  items: Record<string, Item>
) => {
  const quantity = Object.values(items).reduce(
    (acc, item) => acc + fallbackToZero(item.quantity),
    0
  )
  const totalPrice = Object.values(items).reduce(
    (acc, item) => acc + item.price * fallbackToZero(item.quantity),
    0
  )
  try {
    await db.order.update(orderId, {
      items: items,
      totalPrice,
      quantity,
      updatedAt: Date.now().toString(),
    })

    alert("Order updated " + orderId)
  } catch (error) {
    console.error(error)
  }
}

export const deleteOrder = async (orderId: number) => {
  try {
    await db.order.delete(orderId)
  } catch (error) {
    console.error(error)
  }
}
