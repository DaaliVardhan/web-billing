import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  LogOutIcon,
  RotateCcwClock,
  ScrollText,
  Search,
  SquareMenu,
} from "lucide-react"
import { Button } from "./ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { Link } from "react-router"

interface HeaderProps {
  setSearchQuery?: (val: string) => void
}

export const Header = ({ setSearchQuery }: HeaderProps) => {
  return (
    <header className="top-0 z-10 flex w-full shrink-0 items-center justify-between bg-gray-100 p-4 shadow-2xl">
      <div className="flex items-center justify-center gap-1">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon">
              <SquareMenu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Settings</SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <div className="p-4">
              <Link to="/home">
                <Button variant="navigation" className="w-full">
                  <ScrollText />
                  <p>Product List</p>
                </Button>
              </Link>
              <Link to="/orders">
                <Button variant="navigation" className="w-full">
                  <RotateCcwClock />
                  <p>Order History</p>
                </Button>
              </Link>
              <Link to="/menus">
                <Button variant="navigation" className="w-full">
                  <RotateCcwClock />
                  <p>Menu Management</p>
                </Button>
              </Link>
            </div>

            <SheetFooter>
              <Link to="/">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  <LogOutIcon />{" "}
                </Button>
              </Link>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <div className="hidden sm:flex gap-2">
          <Link to="/home">
            <Button variant="outline">
              <h2>Lavish Shawarma</h2>
            </Button>
          </Link>
          <Link to="/orders">
            <Button variant="outline">
              <h2>Orders</h2>
            </Button>
          </Link>
          <Link to="/menus">
            <Button variant="outline">
              <h2>Menu</h2>
            </Button>
          </Link>
        </div>
      </div>

      {setSearchQuery && (
        <div className="flex items-center justify-center gap-2">
          <InputGroup className="max-w-xs">
            <InputGroupInput
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
        </div>
      )}
    </header>
  )
}
