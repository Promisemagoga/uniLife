import express from "express";
import { createShoppingItem, fetchItemById, fetchItemsByList, removeShoppingItem, toggleShoppingItem, updateShoppingItem } from "../controllers/ShoppingItemController";


const router = express.Router();

/**
 * CREATE ITEM
 * POST /api/items
 */
router.post("/", createShoppingItem);

/**
 * GET ALL ITEMS FOR A LIST
 * GET /api/items/list/:list_id
 */
router.get("/list/:list_id", fetchItemsByList);

/**
 * GET SINGLE ITEM
 * GET /api/items/:id
 */
router.get("/:id", fetchItemById);

/**
 * UPDATE ITEM
 * PUT /api/items/:id
 */
router.put("/:id", updateShoppingItem);

/**
 * TOGGLE CHECKED
 * PATCH /api/items/toggle/:id
 */
router.patch("/toggle/:id", toggleShoppingItem);

/**
 * DELETE ITEM
 * DELETE /api/items/:id
 */
router.delete("/:id", removeShoppingItem);

export default router;