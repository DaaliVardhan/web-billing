import { Card } from "./Card"
import { db } from "@/database/db"
import { useLiveQuery } from "dexie-react-hooks"

interface ProductListProps {
  query: string
  selectedMenu: string | null
}

const ProductList = ({ query, selectedMenu }: ProductListProps) => {
  const items = useLiveQuery(
    () => db.menu.where("status").equals("Available").sortBy("order"),
    []
  )
  if (!items) return <div>Loading...</div>
  return (
    <aside className="flex w-full min-w-64 flex-col gap-1 p-2 sm:p-4 lg:p-4">
      {!query &&
        (selectedMenu
          ? items.filter(
              (item) =>
                selectedMenu === "all" ||
                item.category.toLowerCase() === selectedMenu ||
                (item.type.toLowerCase() === selectedMenu &&
                  item.category.toLowerCase() === "shawarma")
            )
          : items
        ).map((item) => <Card key={item.id} item={item} />)}
      {query &&
        items
          .filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase())
          )
          .map((item) => <Card key={item.id} item={item} />)}
    </aside>
  )
}

export default ProductList
