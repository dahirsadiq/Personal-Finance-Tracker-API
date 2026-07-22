import app from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import express from "express";
import swaggerUi from "swagger-ui-express";

import swaggerSpec from "./src/config/swagger.js"


// const app = express();

// app.use(express.json());

dotenv.config();

connectDB();


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});