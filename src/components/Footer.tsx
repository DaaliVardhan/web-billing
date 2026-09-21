import { useStore } from "@/zustand/state"
import { RotateCcw } from "lucide-react"
import { Button } from "./ui/button"

const Footer = () => {
  const emptyCart = useStore((state) => state.emptyCart)

  return (
    <section className="bottom-0 flex w-full shrink-0 items-center justify-between bg-gray-100 p-4 shadow-2xl">
      <div className="flex items-center justify-center gap-1">
        <Button onClick={() => emptyCart()}>
          <RotateCcw />
          <span>reset</span>
        </Button>
      </div>
    </section>
  )
}

export default Footer
