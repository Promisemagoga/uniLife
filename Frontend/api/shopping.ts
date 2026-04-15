import API from "./auth";

export async function saveShoppingList(payload: any) {
  try {
    const res = await API.post("/shopping_lists", payload);
    return res.data;
  } catch (error: any) {
    console.log("FULL ERROR:", error.response?.data);
    console.log("STATUS:", error.response?.status);
    console.log("MESSAGE:", error.message);
  }
}