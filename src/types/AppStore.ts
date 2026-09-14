import type { Item } from "./Item";
import type { Menu } from "./Menu";
import type { Order, OrderType } from "./Order";

export interface AppStore {
  items: Record<string, Item>;
  editMode: boolean;
  editOrderId: number,
  orderType: OrderType;
  addToCart: (item: Item) => void;
  removeFromCart: (item: Item) => void;
  emptyCart: () => void;
  replaceCart: (order: Order) => void;
  setOrderType: (type: OrderType) => void;
}

export interface MenuStore {
  menu: Partial<Menu> | undefined;
  openDialog: boolean;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  deleteMode: boolean;
  setDeleteMode: (deleteMode: boolean) => void;
  addMenu: (menu: Menu) => void;
  setOpenDialog: (open: boolean) => void;
  updateMenu: (newMenu: Partial<Menu>) => void;
  emptyMenu: () => void;
}