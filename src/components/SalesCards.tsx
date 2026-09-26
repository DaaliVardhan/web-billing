import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Order } from "@/types"
import { fallbackToZero } from "@/utils"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

interface SectionCardProps {
  orders: Order[]
}

export function SectionCards({ orders }: SectionCardProps) {
  const [showTotalSales, setShowTotalSales] = useState<boolean>(false)
  let totalSales = 0
  let totalShawarmaSold = 0
  let totalBowlsSold = 0
  let totalDrinksSold = 0
  let totalNumberOfDining = 0
  let totalNumberOfTakeaway = 0
  let totalNumberOfZomato = 0
  const shawarmas: Record<string, number> = {}

  for (const order of orders) {
    totalSales += fallbackToZero(order.totalPrice)

    switch (order.type) {
      case "Zomato":
        totalNumberOfZomato += 1
        break
      case "Takeaway":
        totalNumberOfTakeaway += 1
        break
      case "Dining":
      default:
        totalNumberOfDining += 1
    }

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

  const totalSalesString = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(totalSales)

  return (
    <div>
      <div className="mx-4 mt-4 flex flex-col gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs md:grid md:grid-cols-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
        <Card className="@container/card">
          <CardHeader>
            <CardDescription className="flex items-center justify-start gap-2">
              <span>Total Sales</span>{" "}
              <span
                className="cursor-pointer"
                onClick={() => setShowTotalSales((prev) => !prev)}
              >
                {!showTotalSales ? <Eye /> : <EyeOff />}
              </span>
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {showTotalSales ? totalSalesString : "₹*.00"}
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
        <div className="mx-4 mt-4 flex flex-col gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs md:grid md:grid-cols-4 lg:px-6 @xl/main:grid-cols-4 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
          <Card className="@container/card col-span-3">
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
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Orders fulfilled</CardDescription>
              <ul className="mt-1">
                <li>
                  <span className="text-xl font-semibold">
                    {totalNumberOfDining}
                  </span>
                  {"  "} Dining
                </li>
                <li>
                  <span className="text-xl font-semibold">
                    {totalNumberOfTakeaway}
                  </span>
                  {"  "} Takeaway
                </li>
                <li>
                  <span className="text-xl font-semibold">
                    {totalNumberOfZomato}
                  </span>
                  {"  "} Zomato
                </li>
              </ul>
            </CardHeader>
          </Card>
        </div>
      )}{" "}
    </div>
  )
}
