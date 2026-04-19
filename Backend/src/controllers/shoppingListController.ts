import pool from "../config/db";

// Create list
export const createList = async (req: any, res: any) => {
  try {
    const { title } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" });
    }

    const result = await pool.query(
      "INSERT INTO shopping_lists (title) VALUES ($1) RETURNING *",
      [title.trim()]
    );

    return res.status(201).json(result.rows[0]);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Get all lists
export const getLists = async (_req: any, res: any) => {
  try {
    const result = await pool.query(
      "SELECT * FROM shopping_lists ORDER BY created_at DESC"
    );

    return res.json(result.rows);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Delete list
export const deleteList = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM shopping_lists WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "List not founds" });
    }

    return res.json({ message: "List deleted" });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const updateList = async (req:any, res:any) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const result = await pool.query(
      `
      UPDATE shopping_lists
      SET title = $1
      WHERE id = $2
      RETURNING *
      `,
      [title, id]
    );

    res.json(result.rows[0]);
  } catch (error:any) {
    res.status(500).json({
      error: error.message,
    });
  }
};