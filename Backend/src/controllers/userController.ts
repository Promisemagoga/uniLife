import { Response } from "express";
import pool from "../config/db";
import bcrypt from "bcrypt";
import { AuthRequest } from "../middleware/authMiddleware";

export const updateUser = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;


  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const { name, password, gender, campus, monthly_income } = req.body;

    const result = await pool.query("SELECT * FROM users WHERE id=$1", [
      userId,
    ]);
    const user = result.rows[0];
    // console.log({ userrrrr: user });

    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : user.password;

    const updatedResult = await pool.query(
      `UPDATE users
       SET name=$1, password=$2, gender=$3, campus=$4, monthly_income=$5
       WHERE id=$6
       RETURNING id, name, email, password, gender, campus, monthly_income, created_at`,
      [
        name ?? user.name,
        hashedPassword,
        gender ?? user.gender,
        campus ?? user.campus,
        monthly_income ?? user.monthly_income,
        userId,
      ],
    );

    res.json(updatedResult.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
