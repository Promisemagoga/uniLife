import express from "express";
import cors from "cors";
import pool from "./config/db";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";

import dotenv from "dotenv";

import shoppingListRoutes from "./routes/shoppingListRoutes";
import shoppingItemRoutes from "./routes/shoppingItemRoute";


dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);



app.use("/api/shopping-lists", shoppingListRoutes);
app.use("/api/items", shoppingItemRoutes);



app.get("/", (req, res) => {
  res.send("Server working");
});


app.get("/api", (req, res) => {
  res.send("API is working");
});
const PORT = process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.send("uniLife API running")
})

pool.connect()
  .then(() => console.log("Database connected ✅"))
  .catch((err: unknown) => {
    if (err instanceof Error) console.error("DB Error:", err.message);
    else console.error("Unknown error:", err);
  });

 

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

