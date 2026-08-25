import { motion } from "framer-motion"
import { useDeferredValue, useState } from "react"
import { Header } from "@/components/Header"
import ProductList from "@/components/ProductList"
import Footer from "@/components/Footer"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { menus } from "@/seed"

function App() {
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null)
  const [search, setSearch] = useState<string>("")
  const query = useDeferredValue(search)

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex h-dvh flex-col"
    >
      <Header setSearchQuery={(val) => setSearch(val)} />
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
    </motion.main>
  )
}

export default App
