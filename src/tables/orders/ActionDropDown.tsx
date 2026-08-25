import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { deleteOrder } from "@/database/OrderService"
import { useStore } from "@/zustand/state"
import type { Order } from "@/types"
import { useNavigate } from "react-router"

interface ActionDropDownProps {
  order: Order
}

export const ActionDropDown = ({ order }: ActionDropDownProps) => {
  const navigate = useNavigate()
  const replaceCart = useStore((state) => state.replaceCart)
  const handleDeleteOrder = () => {
    deleteOrder(order.orderId)
  }

  const handleEditOrder = () => {
    replaceCart(order)
    navigate("/home")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleEditOrder}>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDeleteOrder}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
