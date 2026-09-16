import { Field, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useStore } from "@/zustand/state"
import type { OrderType } from "@/types/Order"

const OrderForm = () => {
  const cartItems = useStore((state) => state.items)
  const orderType = useStore((state) => state.orderType)
  const setOrderType = useStore((state) => state.setOrderType)

  const handleMenuTypeChange = (value: string) => {
    return setOrderType(value as OrderType)
  }

  return (
    <FieldGroup>
      <Field>
        <Label>Items</Label>
        <div className="font-small px-4 text-left">
          {Object.values(cartItems).map((item) => (
            <li className="list-none" key={item.id}>
              {item.quantity}x {item.name}
            </li>
          ))}
        </div>
      </Field>
      <Field>
        <Label>Order Type</Label>
        <div className="px-4">
          <RadioGroup
            defaultValue={orderType}
            className="flex gap-4"
            onValueChange={(value) => handleMenuTypeChange(value)}
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="Dining" id="dining" />
              <Label htmlFor="dining">Dining</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="Takeaway" id="takeaway" />
              <Label htmlFor="takeaway">Takeaway</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="Zomato" id="zomato" />
              <Label htmlFor="zomato">Zomato</Label>
            </div>
          </RadioGroup>
        </div>
      </Field>
    </FieldGroup>
  )
}

export default OrderForm
