import { createColumnHelper } from "@tanstack/react-table"
import { type DataTableFeatures } from "@/utils/data-table-features"
import type { Menu } from "@/types"
import SwitchToggle from "./SwitchToggle"
import { ActionDropDown } from "./ActionDropDown"
import { DragHandle } from "./DragHandle"


const columnHelper = createColumnHelper<DataTableFeatures, Menu>()

export const columns = columnHelper.columns([
  columnHelper.display({
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original?.id} />,
  }),
  columnHelper.accessor("id", {
    header: "Menu Id",
  }),
  columnHelper.accessor("name", {
    header: "Menu Name",
  }),
  columnHelper.accessor("type", {
    header: "Type",
  }),
  columnHelper.accessor("category", {
    header: "Category",
  }),
  columnHelper.accessor("price", {
    header: "Price",
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => {
      const item = row.original as Menu
      return <SwitchToggle menu={item} />
    },
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      const menu = row.original
      return <ActionDropDown menu={menu} />
    },
  }),
])
