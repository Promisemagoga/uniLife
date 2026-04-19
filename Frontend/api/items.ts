import API from "./auth";


// GET ITEMS BY LIST
export const getItemsByList = async (list_id: number) => {
  const res = await API.get(`/items/list/${list_id}`);
  return res.data;
};

// ADD ITEM
export const createItem = async (data: {
  list_id: number;
  name: string;
  quantity: number;
  price: number;
  total: number;
  progress: number;
}) => {
  const res = await API.post("/items", data);
  return res.data;
};

// TOGGLE CHECKED
export const toggleItem = async (id: number) => {
  const res = await API.patch(`/items/toggle/${id}`);
  return res.data;
};

// DELETE ITEM
export const deleteItem = async (id: number) => {
  const res = await API.delete(`/items/${id}`);
  return res.data;
};