import { Button } from "./ui/button"
import { useStore } from "@/zustand/state"
import { fallbackToZero } from "@/utils"
import { RotateCcw } from "lucide-react"
import { editOrder, saveOrder } from "@/database/OrderService"

const Footer = () => {
  const emptyCart = useStore((state) => state.emptyCart)
  const editOrderId = useStore((state) => state.editOrderId)
  const editMode = useStore((state) => state.editMode)
  const cartItems = useStore((state) => state.items)
  const totalItems = useStore((state) =>
    Object.values(state.items).reduce(
      (acc, item) => acc + fallbackToZero(item.quantity),
      0
    )
  )
  const totalPrice = useStore((state) =>
    Object.values(state.items).reduce(
      (acc, item) => acc + item.price * fallbackToZero(item.quantity),
      0
    )
  )

  const handleSave = () => {
    try {
      if (editMode) {
        editOrder(editOrderId, cartItems)
      } else {
        saveOrder(cartItems)
      }
      emptyCart()
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <section className="bottom-0 flex w-full shrink-0 items-center justify-between bg-gray-100 p-4 shadow-2xl">
      <div className="flex items-center justify-center gap-1">
        <Button onClick={() => emptyCart()}>
          <RotateCcw />
          <span>reset</span>
        </Button>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <span>Items: {totalItems}</span>{" "}
          <span>
            Price:{" "}
            {totalPrice.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
          </span>
        </div>{" "}
        <Button disabled={totalItems === 0} onClick={handleSave}>
          {editMode ? "Update" : "Save"}
        </Button>
      </div>
    </section>
  )
}

export default Footer
