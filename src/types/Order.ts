import type { Item } from "./Item";

export interface Order {
    orderId: number,
    items: Record<string, Item>,
    quantity: number,
    totalPrice: number,
    createdAt: string;
    updatedAt: string;
}