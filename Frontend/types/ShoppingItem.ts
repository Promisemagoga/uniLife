export interface ShoppingItem {
  id: string;
  name: string;
  price: number;
  checked: boolean;
}

export default interface ShoppingList {
  id: string;
  title: string;
  date: string;
  items: ShoppingItem[];
  total: number;
  progress: number;
}