import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import pool from "./db/db.js"; // promise-based mysql2 pool

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Test MySQL connection with a simple query
    const [rows] = await pool.query("SELECT 1");
    console.log("MySQL connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MySQL:", error);
    process.exit(1); // Exit process with failure
  }
}

startServer();
