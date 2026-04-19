import { Request, Response } from "express";
import {
  createItem,
  getItemsByList,
  getItemById,
  updateItem,
  toggleItem,
  deleteItem,
} from "../models/shopping_item";

// CREATE ITEM
export const createShoppingItem = async (req: Request, res: Response) => {
  try {
    const {
      list_id,
      name,
      quantity,
      price,
      total,
      progress,
    } = req.body;

    if (!list_id || !name) {
      return res.status(400).json({
        error: "list_id and name are required",
      });
    }

    const item = await createItem(
      list_id,
      name,
      quantity,
      price,
      total,
      progress
    );

    return res.status(201).json(item);
  } catch (error: any) {
    return res.status(500).json({
      error: "Failed to create item",
      details: error.message,
    });
  }
};

// GET ITEMS BY LIST
export const fetchItemsByList = async (req: Request, res: Response) => {
  try {
    const { list_id } = req.params;

    const items = await getItemsByList(list_id as any);

    return res.json(items);
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// GET ITEM BY ID
export const fetchItemById = async (req: Request, res: Response) => {
  try {
    const item = await getItemById(req.params.id as any);

    if (!item) {
      return res.status(404).json({
        error: "Item not found",
      });
    }

    return res.json(item);
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// UPDATE ITEM
export const updateShoppingItem = async (req: Request, res: Response) => {
  try {
    const {
      name,
      quantity,
      price,
      total,
      progress,
      checked,
    } = req.body;

    const updated = await updateItem(
      req.params.id as any,
      name,
      quantity,
      price,
      total,
      progress,
      checked
    );

    return res.json(updated);
  } catch (error: any) {
    return res.status(500).json({
      error: "Failed to update item",
      details: error.message,
    });
  }
};

// TOGGLE CHECKED
export const toggleShoppingItem = async (req: any, res: any) => {
  try {
    const item = await toggleItem(req.params.id);

    return res.json(item);
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// DELETE ITEM
export const removeShoppingItem = async (req: any, res: any) => {
  try {
    const deleted = await deleteItem(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        error: "Item not found",
      });
    }

    return res.json({
      message: "Item deleted successfully",
      item: deleted,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};