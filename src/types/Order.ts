import type { Item } from "./Item";

export type OrderType = "Dining" | "Takeaway" | "Delivery";

export interface Order {
    orderId: number,
    type: OrderType,
    items: Record<string, Item>,
    quantity: number,
    totalPrice: number,
    createdAt: Date;
    updatedAt: Date;
}