export interface ShoppingList {
  id: number;
  title: string;
  created_at: string;
}

export interface ShoppingItem {
  id: number;
  list_id: number;
  name: string;
  quantity: number;
  price: number;
  total: number;
  progress: number;
  checked: boolean;
}