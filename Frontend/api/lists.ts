import API from "./auth";


// GET LISTS
export const getLists = async () => {
  const res = await API.get("/shopping-lists");
  return res.data;
};

// CREATE LIST
export const createList = async (title: string) => {
  const res = await API.post("/shopping-lists", { title });
  return res.data;
};

// DELETE LIST
export const deleteList = async (id: number) => {
  const res = await API.delete(`/shopping-lists/${id}`);
  return res.data;
};

export const updateList = async (id: number, title: string) => {
  await API.put(`/shopping-lists/${id}`, { title });
};