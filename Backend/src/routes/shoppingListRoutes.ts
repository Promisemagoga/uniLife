import express from "express";
import { createList, deleteList, getLists,updateList } from "../controllers/shoppingListController";


const router = express.Router();

router.post("/", createList);
router.get("/", getLists);
router.delete("/:id", deleteList);
router.put("/:id", updateList);

export default router;