import type { Item } from "@/types"
import { Button } from "./ui/button"
import { fallbackToZero } from "@/utils"
import { useStore } from "@/zustand/state"
import { Minus, Plus } from "lucide-react"

interface CardProps {
  item: Item
}

export const Card = ({ item }: CardProps) => {
  const cartItems = useStore((state) => state.items)
  const addToCart = useStore((state) => state.addToCart)
  const removeFromCart = useStore((state) => state.removeFromCart)
  const quantity = cartItems[item.id]?.quantity
  return (
    <li
      id={item.category}
      className="flex w-full rounded border border-gray-500 text-primary"
    >
      <div className="flex flex-4/5 flex-col justify-start">
        <h2 className="pl-1 pt-1  sm:pl-2 sm:pt-2 text-lg text-bold text-secondary-foreground">{item.name}</h2>
        <span className="pl-1 pb-1 sm:pl-2 sm:pb-2 text-sm text-primary">{item.price.toLocaleString("en-US", {style:"currency", currency:"INR"})}</span>
      </div>
      <div className="flex flex-1/5 items-center justify-center gap-1">
        {fallbackToZero(quantity) === 0 ? (
          <Button
            size="lg"
            variant="outline"
            className="border-border"
            onClick={() => addToCart(item)}
          >
            <Plus />
          </Button>
        ) : (
          <>
            <Button
              size="icon"
              className=""
              disabled={fallbackToZero(quantity) <= 0}
              onClick={() => removeFromCart(item)}
            >
              <Minus />
            </Button>

            <Button size="icon" variant="outline">
              {fallbackToZero(quantity)}
            </Button>
            <Button
              size="icon"
              disabled={fallbackToZero(quantity) >= 10}
              onClick={() => addToCart(item)}
            >
              <Plus />
            </Button>
          </>
        )}
      </div>
    </li>
  )
}
