import MenuForm from "@/components/MenuForm"
import { Button } from "@/components/ui/button"
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

import { db } from "@/database/db"
import { saveMenu, editMenu, deleteMenu } from "@/database/MenuService"
import { DataTable } from "@/tables/data-table"
import { columns } from "@/tables/menus/column"
import { useMenuStore } from "@/zustand/state"
import { useLiveQuery } from "dexie-react-hooks"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import Layout from "./Layout"

const MenuPage = () => {
  const menus = useLiveQuery(() => db.menu.orderBy("order").toArray())
  const open = useMenuStore((state) => state.openDialog)
  const setOpen = useMenuStore((state) => state.setOpenDialog)
  const storeMenu = useMenuStore((state) => state.menu)
  const editMode = useMenuStore((state) => state.editMode)
  const deleteMode = useMenuStore((state) => state.deleteMode)
  const emptyMenu = useMenuStore((state) => state.emptyMenu)
  const isValidMenu =
    storeMenu?.id &&
    storeMenu?.name &&
    storeMenu?.price !== undefined &&
    storeMenu?.price > 0

  const handleClose = () => {
    emptyMenu()
  }

  const handleSave = async () => {
    if (!isValidMenu) {
      alert(
        "Please fill in all required fields and ensure price is greater than 0."
      )
      return
    }
    try {
      if (editMode) await editMenu(storeMenu.id!, storeMenu)
      else if (deleteMode) await deleteMenu(storeMenu.id!)
      else await saveMenu(storeMenu)
      emptyMenu()
    } catch (error) {
      console.error(error)
    }
  }

  const renderTitle = () => {
    if (editMode) return "Edit Menu"
    if (deleteMode) return "Do you want to Delete this Menu?"
    return "Add New Menu"
  }

  const renderDescription = () => {
    if (editMode) return "Edit the details of the menu below."
    if (deleteMode)
      return "Are you sure you want to delete this menu? This action cannot be undone."
    return "Fill in the details of the new menu below."
  }

  const renderSaveButtonText = () => {
    if (editMode) return "Update"
    if (deleteMode) return "Delete"
    return "Save"
  }

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <form>
            <DialogTrigger asChild>
              <Button variant="default" className="mt-4 mb-4 w-fit">
                {" "}
                <Plus /> new Menu
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{renderTitle()}</DialogTitle>
                <DialogDescription>{renderDescription()}</DialogDescription>
              </DialogHeader>
              <MenuForm />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" onClick={handleClose}>
                    Close
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    type="submit"
                    disabled={!isValidMenu}
                    className={cn(
                      "",
                      !isValidMenu && "cursor-not-allowed opacity-50",
                      deleteMode && "bg-red-500 hover:bg-red-600"
                    )}
                    onClick={handleSave}
                  >
                    {renderSaveButtonText()}
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>

        {menus && <DataTable columns={columns} data={menus!} />}
      </div>
    </Layout>
  )
}

export default MenuPage
