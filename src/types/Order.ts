import type { Item } from "./Item";

export type OrderType = "Dining" | "Takeaway" | "Zomato";

export interface Order {
    orderId: number,
    type: OrderType,
    items: Record<string, Item>,
    quantity: number,
    totalPrice: number,
    createdAt: Date;
    updatedAt: Date;
}