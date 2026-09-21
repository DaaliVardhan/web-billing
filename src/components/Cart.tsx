import { editOrder, saveOrder } from "@/database/OrderService"
import { fallbackToZero } from "@/utils"
import { useStore } from "@/zustand/state"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Edit, Plus } from "lucide-react"
import { useState } from "react"
import OrderForm from "./OrderForm"

const Cart = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const emptyCart = useStore((state) => state.emptyCart)
  const editOrderId = useStore((state) => state.editOrderId)
  const editMode = useStore((state) => state.editMode)
  const cartItems = useStore((state) => state.items)
  const orderType = useStore((state) => state.orderType)
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
        editOrder(editOrderId, cartItems, orderType)
      } else {
        saveOrder(cartItems, orderType)
      }
      emptyCart()
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex gap-2">
        <span className="font-medium text-primary">
          {totalPrice.toLocaleString("en-US", {
            style: "currency",
            currency: "INR",
          })}
        </span>
      </div>{" "}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <form>
          <DialogTrigger asChild>
            <Button
              variant="default"
              disabled={totalItems === 0}
              data-cart-items={totalItems > 0 ? totalItems : ''}
              className="cart mt-4 mb-4 w-fit"
            >
              {" "}
              {editMode ? <Edit /> : <Plus />}
              {editMode ? "Update" : "Create"} Order
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{"Order Details"}</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <OrderForm />
            <DialogFooter className="flex-col">
              <div className="mr-auto flex flex-col">
                <span className="font-medium">
                  Quantity:{" "}
                  <p className="inline font-bold text-primary">{totalItems}</p>
                </span>
                <span className="font-medium">
                  Price:{" "}
                  <p className="inline font-bold text-primary">
                    {totalPrice.toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </p>
                </span>
              </div>
              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-around">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    onClick={() => setOpenDialog(false)}
                  >
                    Close
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    type="submit"
                    disabled={totalItems === 0}
                    onClick={handleSave}
                  >
                    {editMode ? "Update" : "Save"}
                  </Button>
                </DialogClose>
              </div>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  )
}

export default Cart
