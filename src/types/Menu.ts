
// For Storing Menu items in the database
export type Menu = {
  id: string;
  name: string;
  order: number;
  category: string;
  type: string;
  price: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};