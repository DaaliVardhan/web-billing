import type { Menu } from "@/types"
import { db } from "./db"

export const saveMenu = async (menu: Partial<Menu>) => {
  if (!menu.id || !menu.name || !menu.price) {
    throw new Error("Missing required fields for menu")
  }
  try {
    await db.menu.put({
      id: menu.id,
      name: menu.name,
      price: menu.price,
      order: menu?.order || 1000,
      category: menu?.category || "Shawarma",
      type: menu?.type || "Non-Veg",
      status: menu?.status || "Available",
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  } catch (error) {
    console.error(error)
  }
}

export const editMenu = async (menuId: string, updatedMenu: Partial<Menu>) => {
  if (!updatedMenu.id || !updatedMenu.name || !updatedMenu.price) {
    throw new Error("Missing required fields for menu")
  }
  try {
    const existingMenu = await db.menu.get(menuId)
    if (!existingMenu) {
      throw new Error(`Menu with ID ${menuId} not found`)
    }

    await db.menu.put({
      ...existingMenu,
      ...updatedMenu,
      updatedAt: new Date(),
    })
  } catch (error) {
    console.error(error)
  }
}

export const deleteMenu = async (menuId: string) => {
  try {
    await db.menu.delete(menuId)
  } catch (error) {
    console.error(error)
  }
}
