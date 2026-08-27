import type { Menu } from "@/types"
import { db } from "./db"
import { toast } from "sonner"

export const saveMenu = async (menu: Partial<Menu>) => {
  try {
    if (!menu.id || !menu.name || !menu.price) {
      throw new Error("Missing required fields for menu")
    }
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
    toast("Menu saved successfully", { position: "top-right" })
  } catch (error) {
    toast("Menu failed successfully", { position: "top-right" })
    console.error(error)
  }
}

export const editMenu = async (menuId: string, updatedMenu: Partial<Menu>) => {
  try {
    if (!updatedMenu.id || !updatedMenu.name || !updatedMenu.price) {
      throw new Error("Missing required fields for menu")
    }
    const existingMenu = await db.menu.get(menuId)
    if (!existingMenu) {
      throw new Error(`Menu with ID ${menuId} not found`)
    }

    await db.menu.put({
      ...existingMenu,
      ...updatedMenu,
      updatedAt: new Date(),
    })
    toast("Menu updated successfully", { position: "top-right" })
  } catch (error) {
    toast("Menu updated failed", { position: "top-right" })
    console.error(error)
  }
}

export const deleteMenu = async (menuId: string) => {
  try {
    await db.menu.delete(menuId)
    toast("Menu deleted successfully", { position: "top-right" })
  } catch (error) {
    toast("Menu deleted failed", { position: "top-right" })
    console.error(error)
  }
}
