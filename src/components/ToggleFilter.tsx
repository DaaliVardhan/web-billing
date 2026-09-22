import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group"
import { menus } from "@/seed"

interface ToggleFilterProps {
  onToggleSelect: (menuId: string) => void
}

const ToggleFilter = ({ onToggleSelect }: ToggleFilterProps) => {
  return (
    <ToggleGroup
      className="flex-1 flex-wrap"
      variant="outline"
      type="single"
      defaultValue="all"
    >
      {menus.map((menu) => (
        <ToggleGroupItem
          key={menu.id}
          value={menu.id}
          aria-label={`Toggle ${menu}`}
          className={
            "focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none"
          }
          onClick={() => onToggleSelect(menu.id)}
        >
          {menu.name}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

export default ToggleFilter
