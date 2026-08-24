import { items } from "@/seed";
import { Card } from "./Card";

interface ProductListProps {
  query: string;
  selectedMenu: string | null;
}

const ProductList = ({ query, selectedMenu }: ProductListProps) => {
  return (
    <aside className="p-2 sm:p-4 lg:p-4 w-full flex flex-col gap-1 min-w-64">
      {!query &&
        (selectedMenu
          ? items.filter((item) => item.category === selectedMenu)
          : items
        ).map((item) => <Card key={item.id} item={item} />)}
      {query &&
        items
          .filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase()),
          )
          .map((item) => <Card key={item.id} item={item} />)}
    </aside>
  );
};

export default ProductList;
