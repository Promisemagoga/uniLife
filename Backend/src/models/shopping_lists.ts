import pool from "../config/db";

export const ShoppingListModel = {
  create: async (title: string) => {
    return pool.query(
      "INSERT INTO shopping_lists (title) VALUES ($1) RETURNING *",
      [title],
    );
  },

  getAll: async () => {
    return pool.query("SELECT * FROM shopping_lists ORDER BY created_at DESC");
  },

  delete: async (id: number) => {
    return pool.query("DELETE FROM shopping_lists WHERE id = $1", [id]);
  },

  updateList: async (req: any, res: any) => {
    const { id } = req.params;
    const { title } = req.body;

    try {
      const result = await pool.query(
        "UPDATE shopping_lists SET title = $1 WHERE id = $2 RETURNING *",
        [title, id],
      );

      res.json(result.rows[0]);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },
};
