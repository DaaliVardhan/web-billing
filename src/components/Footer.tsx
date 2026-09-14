import { useStore } from "@/zustand/state"
import { fallbackToZero } from "@/utils"
import { RotateCcw } from "lucide-react"
import { editOrder, saveOrder } from "@/database/OrderService"
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
import { Plus } from "lucide-react"
import { useState } from "react"
import OrderForm from "./OrderForm"

const Footer = () => {
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
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <form>
            <DialogTrigger asChild>
              <Button
                variant="default"
                disabled={totalItems === 0}
                className="mt-4 mb-4 w-fit"
              >
                {" "}
                <Plus /> {editMode ? "Update" : "Create"} Order
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
                    <p className="inline font-bold text-primary">
                      {totalItems}
                    </p>
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
    </section>
  )
}

export default Footer
