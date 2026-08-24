import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { AnimatePresence } from "framer-motion"
import { RouterProvider } from "react-router"
import { router } from "./Router"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light">
      <AnimatePresence mode="wait">
        <RouterProvider router={router} />
      </AnimatePresence>
    </ThemeProvider>
  </StrictMode>
)
