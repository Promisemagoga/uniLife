import pool from "../config/db";

// CREATE ITEM
export const createItem = async (
  list_id: string,
  name: string,
  quantity: number,
  price: number,
  total: number,
  progress: number
) => {
  const result = await pool.query(
    `INSERT INTO shopping_items 
     (list_id, name, quantity, price, total, progress)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [list_id, name, quantity, price, total, progress]
  );

  return result.rows[0];
};

// GET ITEMS BY LIST
export const getItemsByList = async (list_id: string) => {
  const result = await pool.query(
    `SELECT * FROM shopping_items
     WHERE list_id = $1
     ORDER BY date_created DESC`,
    [list_id]
  );

  return result.rows;
};

// GET ITEM BY ID
export const getItemById = async (id: string) => {
  const result = await pool.query(
    `SELECT * FROM shopping_items WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};

// UPDATE ITEM
export const updateItem = async (
  id: string,
  name: string,
  quantity: number,
  price: number,
  total: number,
  progress: number,
  checked: boolean
) => {
  const result = await pool.query(
    `UPDATE shopping_items
     SET name = $1,
         quantity = $2,
         price = $3,
         total = $4,
         progress = $5,
         checked = $6,
         date_updated = NOW()
     WHERE id = $7
     RETURNING *`,
    [name, quantity, price, total, progress, checked, id]
  );

  return result.rows[0];
};

// TOGGLE CHECKED
export const toggleItem = async (id: string) => {
  const result = await pool.query(
    `UPDATE shopping_items
     SET checked = NOT checked,
         date_updated = NOW()
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};

// DELETE ITEM
export const deleteItem = async (id: string) => {
  const result = await pool.query(
    `DELETE FROM shopping_items
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};