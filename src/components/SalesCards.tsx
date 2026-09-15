import {
  Card,
  CardContent,
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
  let totalSales = 0
  let totalShawarmaSold = 0
  let totalBowlsSold = 0
  let totalDrinksSold = 0
  const shawarmas: Record<string, number> = {}

  for (const order of orders) {
    totalSales += fallbackToZero(order.totalPrice)
    Object.values(order.items).forEach((item) => {
      const name = item.name
        .toLowerCase()
        .replaceAll("shawarma", "")
        .trim()
        .replaceAll("chicken", "")
        .trim()
      switch (item.category.toLowerCase()) {
        case "shawarma":
          totalShawarmaSold += fallbackToZero(item.quantity)
          shawarmas[name] =
            (shawarmas[name] || 0) + fallbackToZero(item.quantity)
          break
        case "bowls":
          totalBowlsSold += fallbackToZero(item.quantity)
          break
        case "drinks":
          totalDrinksSold += fallbackToZero(item.quantity)
          break
        default:
          break
      }
    })
  }

  return (
    <div>
      <div className="mx-4 mt-4 flex flex-col gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs md:grid md:grid-cols-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
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
      {Object.keys(shawarmas).length > 0 && (
        <div className="mx-4 mt-4 flex flex-col gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs md:grid md:grid-cols-1 lg:px-6 @xl/main:grid-cols-1 @5xl/main:grid-cols-1 dark:*:data-[slot=card]:bg-card">
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Shawarma's Sold</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {Object.entries(shawarmas).map(([name, quantity]) => (
                  <div
                    key={name}
                    className="rounded-md border border-primary bg-primary/10 px-3 py-1 text-primary"
                  >
                    <span>{quantity}</span> <span>{name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}{" "}
    </div>
  )
}
