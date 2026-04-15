import express from "express";

import {
  createOrUpdateShoppingList,
  fetchShoppingLists,
  fetchShoppingList,
  removeShoppingList,
} from "../controllers/shoppingListController";

const router = express.Router();

router.post(
  "/",
  createOrUpdateShoppingList
);

router.get("/", fetchShoppingLists);

router.get("/:id", fetchShoppingList);

router.delete("/:id", removeShoppingList);

export default router;