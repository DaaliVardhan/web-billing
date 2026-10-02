import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { deleteOrder } from "@/database/OrderService"
import type { Order } from "@/types"
import { useStore } from "@/zustand/state"
import { useNavigate } from "react-router"

interface ActionContextMenuProps {
  children: React.ReactNode
  order: Order
}

const ActionContextMenu = ({ children, order }: ActionContextMenuProps) => {
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
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleEditOrder} className="cursor-pointer">
          Edit
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          onClick={handleDeleteOrder}
          className="cursor-pointer text-destructive"
        >
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default ActionContextMenu
