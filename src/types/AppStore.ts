import type { Item } from "./Item";
import type { Order } from "./Order";

export interface AppStore {
  items: Record<string, Item>;
  editMode: boolean;
  editOrderId: number,
  addToCart: (item: Item) => void;
  removeFromCart: (item: Item) => void;
  emptyCart: () => void;
  replaceCart: (order: Order) => void;
}