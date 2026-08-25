import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Order } from "@/types"
import { fallbackToZero } from "@/utils"

interface SectionCardProps {
  orders: Order[]
}

export function SectionCards({ orders }: SectionCardProps) {
  const totalSales = orders.reduce((acc, cur) => acc + cur.totalPrice, 0)
  const totalShawarmaSold = orders.reduce((totalSold, curOrder) => {
    return (
      totalSold +
      Object.values(curOrder.items).reduce(
        (acc, item) =>
          acc +
          (item.category.toLowerCase() === "shawarma"
            ? fallbackToZero(item.quantity)
            : 0),
        0
      )
    )
  }, 0)
  const totalBowlsSold = orders.reduce((totalSold, curOrder) => {
    return (
      totalSold +
      Object.values(curOrder.items).reduce(
        (acc, item) =>
          acc +
          (item.category.toLowerCase() === "bowls"
            ? fallbackToZero(item.quantity)
            : 0),
        0
      )
    )
  }, 0)
  const totalDrinksSold = orders.reduce((totalSold, curOrder) => {
    return (
      totalSold +
      Object.values(curOrder.items).reduce(
        (acc, item) =>
          acc +
          (item.category.toLowerCase() === "drinks"
            ? fallbackToZero(item.quantity)
            : 0),
        0
      )
    )
  }, 0)

  return (
    <div className="mx-4 mt-4 grid grid-cols-4 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Sales</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(totalSales)}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Shawarma's Sold</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {new Intl.NumberFormat("en-IN").format(totalShawarmaSold)}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Bowls Sold</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {new Intl.NumberFormat("en-IN").format(totalBowlsSold)}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Drinks Sold</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {new Intl.NumberFormat("en-IN").format(totalDrinksSold)}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}
