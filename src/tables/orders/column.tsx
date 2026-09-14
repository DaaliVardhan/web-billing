import { createColumnHelper } from "@tanstack/react-table"
import { type DataTableFeatures } from "@/utils/data-table-features"
import type { Item, Order } from "@/types"
import { ActionDropDown } from "@/tables/orders/ActionDropDown"


const columnHelper = createColumnHelper<DataTableFeatures, Order>()


export const columns = columnHelper.columns([
  columnHelper.accessor("orderId", {
    header: "Order Id",
  }),
  columnHelper.accessor("items", {
    header: "Items",
    cell: ({ row }) => {
      const items = Object.values(row.getValue("items") as Record<string, Item>)
      return (
        <div className="font-small text-left">
          {items.map((item) => (
            <li className="list-none" key={item.id}>
              {item.quantity}x {item.name}
            </li>
          ))}
        </div>
      )
    },
  }),
  columnHelper.accessor("type", {
    header: "Type",
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {row.getValue("type") || "Dining"}
        </div>
      )
    },
  }),
  columnHelper.accessor("quantity", {
    header: "Quantity",
  }),
  columnHelper.accessor("totalPrice", {
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalPrice"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  }),
  columnHelper.accessor("createdAt", {
    header: () => <div className="text-right">Date</div>,
    cell: ({ row }) => {
      const datetime = row.getValue("createdAt") as Date
      const date = new Date(datetime)
      return (
        <div className="text-right font-medium">
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          })}
        </div>
      )
    },
  }),
  columnHelper.display({
    id: "Time",
    header: () => <div className="text-right">Ordered At</div>,
    cell: ({ row }) => {
      const datetime = row.getValue("createdAt") as Date
      const date = new Date(datetime)
      return (
        <div className="text-right font-medium">
          {date.toLocaleTimeString()}
        </div>
      )
    },
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      const order = row.original
      return <ActionDropDown order={order} />
    },
  }),
])
