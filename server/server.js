require("dotenv").config();
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./config/database";
import productRouter from "./routes/product.router";

connectToDatabase();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/products", productRouter);

app.use((req, res, next) => {
  res.status(404);
  res.send("Error: 404");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));

export default app;
