import pool from "../config/db";

export const saveShoppingList = async (
  id: string,
  title: string,
  date: Date,
  items: any[],
  total: number,
  progress: number
) => {
  const result = await pool.query(
    `
    INSERT INTO shopping_lists
    (id, title, date, items, total, progress)
    VALUES ($1,$2,$3,$4,$5,$6)

    ON CONFLICT (id)
    DO UPDATE SET
      items = EXCLUDED.items,
      total = EXCLUDED.total,
      progress = EXCLUDED.progress

    RETURNING *
    `,
    [
      id,
      title,
      date,
      JSON.stringify(items),
      total,
      progress,
    ]
  );

  return result.rows[0];
};

export const getShoppingLists = async () => {
  const result = await pool.query(
    `SELECT * FROM shopping_lists
     ORDER BY date DESC`
  );

  return result.rows;
};

export const getShoppingListById = async (
  id: string
) => {
  const result = await pool.query(
    `SELECT * FROM shopping_lists
     WHERE id=$1`,
    [id]
  );

  return result.rows[0];
};

export const deleteShoppingList = async (
  id: string
) => {
  const result = await pool.query(
    `DELETE FROM shopping_lists
     WHERE id=$1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};