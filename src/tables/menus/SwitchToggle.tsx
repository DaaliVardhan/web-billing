import { Switch } from "@/components/ui/switch"
import { db } from "@/database/db"
import type { Menu } from "@/types"
import { useState } from "react"

const SwitchToggle = ({ menu }: { menu: Menu }) => {
  const [checked, setChecked] = useState(menu.status === "Available")

  const handleToggle = async () => {
    setChecked(!checked)
    await db.menu.update(menu.id, {
      status: checked ? "Unavailable" : "Available",
    })
  }

  return <Switch checked={checked} onCheckedChange={handleToggle} />
}

export default SwitchToggle
