import type { AppStore, MenuStore, Order, OrderType } from "@/types"
import { fallbackToZero } from "@/utils"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useStore = create(
  persist<AppStore>(
    (set) => ({
      items: {},
      orderType: "Dining",
      editMode: false,
      editOrderId: NaN,
      addToCart: (item) =>
        set((state) => {
          if (state.items[item.id]) {
            const oldItem = state.items[item.id]!
            return {
              items: {
                ...state.items,
                [oldItem.id]: {
                  ...oldItem,
                  quantity: fallbackToZero(oldItem.quantity) + 1,
                },
              },
            }
          }
          return {
            items: { ...state.items, [item.id]: { ...item, quantity: 1 } },
          }
        }),
      removeFromCart: (item) =>
        set((state) => {
          if (!state.items[item.id]) return state
          const oldItem = state.items[item.id]!
          if (fallbackToZero(oldItem.quantity) <= 1) {
            const temp = { ...state.items }
            delete temp[item.id]
            return { items: { ...temp } }
          }
          return {
            items: {
              ...state.items,
              [item.id]: {
                ...oldItem,
                quantity: fallbackToZero(oldItem.quantity) - 1,
              },
            },
          }
        }),
      emptyCart: () =>
        set(() => ({
          items: {},
          editMode: false,
          editOrderId: NaN,
          orderType: "Dining",
        })),
      replaceCart: (order: Order) =>
        set(() => ({
          items: { ...order.items },
          orderType: order.type || "Dining",
          editMode: true,
          editOrderId: order.orderId,
        })),
      setOrderType: (type: OrderType) =>
        set(() => ({
          orderType: type,
        })),
    }),
    { name: "cart-state" }
  )
)

export const useMenuStore = create<MenuStore>((set) => ({
  menu: undefined,
  editMode: false,
  deleteMode: false,
  openDialog: false,
  setOpenDialog: (open) =>
    set(() => ({
      openDialog: open,
    })),
  setDeleteMode: (deleteMode) =>
    set(() => ({
      editMode: false,
      deleteMode,
    })),
  setEditMode: (editMode) =>
    set(() => ({
      editMode,
      deleteMode: false,
    })),
  addMenu: (menu) =>
    set(() => ({
      menu,
    })),
  updateMenu: (newMenu) =>
    set((state) => ({
      menu: { ...state.menu, ...newMenu },
    })),
  emptyMenu: () =>
    set(() => ({
      menu: undefined,
      editMode: false,
      deleteMode: false,
      openDialog: false,
    })),
}))
