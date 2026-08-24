import { motion } from "framer-motion"
import { useDeferredValue, useState } from "react"
import { Header } from "@/components/Header"
// import SideMenu from "@/components/SideMenu"
import ProductList from "@/components/ProductList"
import Footer from "@/components/Footer"

function App() {
  // const [selectedMenu, setSelectedMenu] = useState<string | null>(null)
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
      <Header setSearchQuery={(val) => setSearch(val)}/>
        <main className="flex h-full min-h-0 flex-1">
          {/* <SideMenu setSelectedMenu={setSelectedMenu} /> */}
          <ProductList query={query} selectedMenu={null} />
        </main>
      <Footer />
    </motion.main>
  )
}

export default App
