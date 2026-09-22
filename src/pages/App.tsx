import { useDeferredValue, useState } from "react"
import ProductList from "@/components/ProductList"
import Layout from "./Layout"
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "@/database/db"
import { DataTable } from "@/tables/data-table"
import { columns } from "@/tables/orders/column"
import ToggleFilter from "@/components/ToggleFilter"
import Cart from "@/components/Cart"

function App() {
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null)
  const [search, setSearch] = useState<string>("")
  const query = useDeferredValue(search)
  const orders = useLiveQuery(() =>
    db.order.orderBy("orderId").reverse().limit(10).toArray()
  )

  const onToggleSelect = (menuId: string) => {
    setSelectedMenu((prev) => (prev === menuId ? null : menuId))
  }

  return (
    <Layout setSearch={(val) => setSearch(val)}>
      <div className="flex w-full flex-col items-center justify-between gap-4 overflow-x-auto p-2 sm:p-4 lg:flex-row lg:p-4">
        <ToggleFilter onToggleSelect={onToggleSelect} />
        <Cart />
      </div>
      <main className="flex min-h-0 flex-1">
        <div className="flex w-full flex-col gap-2 overflow-y-auto p-2 sm:p-4 lg:p-4">
          <ProductList query={query} selectedMenu={selectedMenu} />
        </div>
        <div className="hidden w-full flex-col gap-2 overflow-y-auto p-2 sm:p-4 lg:p-4 xl:flex">
          <h2 className="text-2xl font-bold text-primary">Recent Orders</h2>
          {orders && <DataTable columns={columns} data={orders} />}
        </div>
      </main>
    </Layout>
  )
}

export default App
