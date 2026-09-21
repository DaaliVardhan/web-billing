import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'
import { menus } from '@/seed'

interface ToggleFilterProps {
    onToggleSelect: (menuId: string) => void
}

const ToggleFilter = ({ onToggleSelect }: ToggleFilterProps) => {
  return (
    <ToggleGroup variant="outline" type="single" defaultValue="all">
          {menus.map((menu) => (
            <ToggleGroupItem
              key={menu.id}
              value={menu.id}
              aria-label={`Toggle ${menu}`}
              onClick={() =>
                onToggleSelect(menu.id)
              }
            >
              {menu.name}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
  )
}

export default ToggleFilter