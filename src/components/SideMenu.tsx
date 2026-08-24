import { menus } from "@/seed";

interface setSelectedMenuProps {
  setSelectedMenu: (id: string | null) => void;
}

const SideMenu = ({ setSelectedMenu }: setSelectedMenuProps) => {
  return (
    <aside className="h-full min-h-0 overflow-y-auto left-0 top-0 bottom-0 w-75 bg-gray-50 grid gap-2 px-3 py-2">
      {menus.map((menu) => (
        <li
          key={menu.id}
          className="text-center w-full text-red-500 border-red-500 border aspect-square rounded grid place-content-center cursor-pointer"
          onClick={() =>
            menu.id === "all" ? setSelectedMenu(null) : setSelectedMenu(menu.name)
          }
        >
          {menu.name}
        </li>
      ))}
    </aside>
  );
};

export default SideMenu;
