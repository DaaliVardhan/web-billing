import { useDeferredValue, useState } from "react"
import ProductList from "@/components/ProductList"
import Footer from "@/components/Footer"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { menus } from "@/seed"
import Layout from "./Layout"

function App() {
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null)
  const [search, setSearch] = useState<string>("")
  const query = useDeferredValue(search)

  return (
    <Layout setSearch={(val) => setSearch(val)}>
      <div className="flex flex-row items-center justify-start gap-2 p-2 sm:p-4 lg:p-4 w-full overflow-x-auto">
        <ToggleGroup variant="outline" type="single" defaultValue="all">
          {menus.map((menu) => (
            <ToggleGroupItem
              key={menu.id}
              value={menu.id}
              aria-label={`Toggle ${menu}`}
              onClick={() =>
                setSelectedMenu((prev) => (prev === menu.id ? null : menu.id))
              }
            >
              {menu.name}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <main className="flex h-full min-h-0 flex-1 overflow-y-auto">
        <ProductList query={query} selectedMenu={selectedMenu} />
      </main>
      <Footer />
    </Layout>
  )
}

export default App
