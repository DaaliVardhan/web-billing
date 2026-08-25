import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { useMenuStore } from "@/zustand/state"
import type { Menu } from "@/types"

interface ActionDropDownProps {
  menu: Menu
}

export const ActionDropDown = ({ menu }: ActionDropDownProps) => {
  const addMenu = useMenuStore((state) => state.addMenu)
  const emptyMenu = useMenuStore((state) => state.emptyMenu)
  const setOpenDialog = useMenuStore((state) => state.setOpenDialog)
  const setDeleteMode = useMenuStore((state) => state.setDeleteMode)
  const setEditMode = useMenuStore((state) => state.setEditMode)
  const handleDeleteMenu = () => {
    emptyMenu()
    addMenu(menu)
    setDeleteMode(true)
    setOpenDialog(true)
  }

  const handleEditMenu = () => {
    addMenu(menu)
    setEditMode(true)
    setOpenDialog(true)
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
        <DropdownMenuItem onClick={handleEditMenu}>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDeleteMenu}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
