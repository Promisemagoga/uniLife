import { Request, Response } from "express";
import { deleteShoppingList, getShoppingListById, getShoppingLists, saveShoppingList } from "../models/shopping_lists";



export const createOrUpdateShoppingList =
  async (req: Request, res: Response) => {
    try {
      const {
        id,
        title,
        date,
        items,
        total,
        progress,
      } = req.body;

      const list =
        await saveShoppingList(
          id,
          title,
          date,
          items,
          total,
          progress
        );

      res.json(list);
    } catch (error) {
      res.status(500).json({
        error:
          "Failed to save shopping list",
      });
    }
  };

export const fetchShoppingLists =
  async (_: Request, res: Response) => {
    const lists =
      await getShoppingLists();

    res.json(lists);
  };

export const fetchShoppingList =
  async (req: Request, res: Response) => {
    const list =
      await getShoppingListById(
        req.params.id as string
      );

    res.json(list);
  };

export const removeShoppingList =
  async (req: Request, res: Response) => {
    const deleted =
      await deleteShoppingList(
        req.params.id as string
      );

    res.json(deleted);
  };