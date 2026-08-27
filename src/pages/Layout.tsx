import { Header } from "@/components/Header"
import { motion } from "framer-motion"

interface LayoutProps {
  setSearch?: (val: string) => void
  children: React.ReactNode
}

const Layout = (props: LayoutProps) => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex h-dvh flex-col"
    >
      <Header setSearchQuery={props.setSearch} />
      {props.children}
    </motion.main>
  )
}

export default Layout
