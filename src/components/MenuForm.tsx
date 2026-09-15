import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Menu } from "@/types"
import { useMenuStore } from "@/zustand/state"


const MenuForm = () => {
  const menuStored = useMenuStore((state) => state.menu) ?? ({} as Menu)
  const editMode = useMenuStore((state) => state.editMode)
  const deleteMode = useMenuStore((state) => state.deleteMode)
  const updateMenu = useMenuStore((state) => state.updateMenu)

  return (
    <FieldGroup>
      <Field>
        <Label htmlFor="menu-id">
          Menu Id <span className="text-destructive">*</span>
        </Label>
        <Input
          id="menu-id"
          name="menuId"
          value={menuStored.id || ""}
          onChange={(e) => updateMenu({ ...menuStored, id: e.target.value })}
          maxLength={30}
          disabled={editMode || deleteMode} 
          required
          placeholder="Ex: XYZSHA - shortform of XYZ Shawarma"
        />
      </Field>
      <Field>
        <Label htmlFor="menu-name">
          Menu Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="menu-name"
          name="menuName"
          maxLength={50}
          required
          value={menuStored.name || ""}
          disabled={deleteMode} 
          onChange={(e) => updateMenu({ ...menuStored, name: e.target.value })}
          placeholder="Ex: XYZ Shawarma"
        />
      </Field>
      <Field>
        <Label htmlFor="menu-price">
          Price <span className="text-destructive">*</span>
        </Label>
        <Input
          id="menu-price"
          name="menuPrice"
          maxLength={10}
          required
          type="number"
          min={0}
          max={100000}
          step={0.01}
          value={menuStored.price || ""}
          disabled={deleteMode}
          onChange={(e) =>
            updateMenu({
              ...menuStored,
              price: parseFloat(e.target.value) || 0,
            })
          }
          placeholder="Ex: 100"
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="category">Category</FieldLabel>
        <Select
          defaultValue="Shawarma"
          value={menuStored.category || "Shawarma"}
          disabled={deleteMode}
          onValueChange={(value) =>
            updateMenu({ ...menuStored, category: value })
          }
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Shawarma">Shawarma</SelectItem>
              <SelectItem value="Bowls">Bowls</SelectItem>
              <SelectItem value="Fries">Fries</SelectItem>
              <SelectItem value="Drinks">Drinks</SelectItem>
              <SelectItem value="Add-on">Add-ons</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
      <Field>
        <RadioGroup
          defaultValue="Non-Veg"
          className="flex gap-2"
          value={menuStored.type || "Non-Veg"}
          disabled={deleteMode}
          onValueChange={(value) => updateMenu({ ...menuStored, type: value })}
        >
          <div className="flex items-center gap-3">
            <RadioGroupItem value="Non-Veg" id="non-veg" />
            <Label htmlFor="non-veg">Non-Veg</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="Veg" id="veg" />
            <Label htmlFor="veg">Veg</Label>
          </div>
        </RadioGroup>
      </Field>
    </FieldGroup>
  )
}

export default MenuForm
