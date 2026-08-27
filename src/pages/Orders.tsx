import { useLiveQuery } from "dexie-react-hooks"
import { db } from "@/database/db"
import { DataTable } from "@/tables/data-table"
import { columns } from "@/tables/orders/column"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useState } from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"
import { addDays, compareDesc, isWithinInterval } from "date-fns"
import { SectionCards } from "@/components/SalesCards"
import Layout from "./Layout"

const Orders = () => {
  const [seletedToggle, setSelectedToggle] = useState("today")
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [currentMonth, setCurrentMonth] = useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  )
  const orders = useLiveQuery(() => {
    switch (seletedToggle) {
      case "yesterday": {
        return db.order
          .filter(
            (ord) =>
              addDays(new Date(), -1).toDateString() ===
              new Date(Number(ord.createdAt)).toDateString()
          )
          .toArray()
      }
      case "custom": {
        const from = dateRange?.from || addDays(new Date(), -1)
        const to = dateRange?.to || new Date()
        return db.order
          .filter((ord) =>
            isWithinInterval(new Date(Number(ord.createdAt)), {
              start: from,
              end: to,
            })
          )
          .toArray()
      }
      case "today":
      default: {
        return db.order
          .filter(
            (ord) =>
              new Date().toDateString() ===
              new Date(Number(ord.createdAt)).toDateString()
          )
          .toArray()
      }
    }
  }, [seletedToggle, dateRange])
  return (
    <Layout>
      {orders && <SectionCards orders={orders!} />}
      <div className="container mx-auto px-4 py-10">
        <ToggleGroup
          type="single"
          value={seletedToggle}
          onValueChange={setSelectedToggle}
          variant="outline"
          defaultValue="today"
          className="flex flex-wrap py-4 *:data-[slot=toggle-group-item]:px-4!"
        >
          <ToggleGroupItem value="today">Today</ToggleGroupItem>
          <ToggleGroupItem value="yesterday">Yesterday</ToggleGroupItem>
          <ToggleGroupItem value="custom">
            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                onClick={() => setSelectedToggle("custom")}
              >
                <span className="flex items-center gap-1">
                  <CalendarIcon /> Customize{" "}
                  {
                    <>
                      <time>
                        {dateRange?.from?.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        })}
                      </time>
                      {" - "}
                      <time>
                        {dateRange?.to?.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        })}
                      </time>
                    </>
                  }
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  month={currentMonth}
                  onMonthChange={setCurrentMonth}
                  defaultMonth={dateRange?.from}
                  numberOfMonths={2}
                  fixedWeeks
                  className="p-0 [--cell-size:--spacing(9.5)]"
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </ToggleGroupItem>
        </ToggleGroup>

        {orders && (
          <DataTable
            columns={columns}
            data={orders.sort((a, b) => compareDesc(a.createdAt, b.createdAt))!}
          />
        )}
      </div>
    </Layout>
  )
}

export default Orders
