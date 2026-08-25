import type { Item } from "@/types"
import { Button } from "./ui/button"
import { fallbackToZero } from "@/utils"
import { useStore } from "@/zustand/state"
import { Minus, Plus, SquareDot } from "lucide-react"
import { cn } from "@/lib/utils"

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
      id={item.id}
      className="flex w-full rounded border border-gray-500 text-primary"
    >
      <div className="flex flex-4/5 flex-col justify-start">
        <h2 className="text-bold pt-1 pl-1 text-lg text-secondary-foreground sm:pt-2 sm:pl-2">
          {item.name}
        </h2>
        <div className="flex flex-row items-center justify-start gap-1">
          <span
            className={cn(
              "pb-1 pl-1 text-sm sm:pb-2 sm:pl-2",
              item.type === "Veg" ? "text-green-500" : "text-red-400"
            )}
          >
            <SquareDot />
          </span>
          <span className="pb-1 pl-1 text-sm text-primary sm:pb-2 sm:pl-2">
            {item.price.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
          </span>
        </div>
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
