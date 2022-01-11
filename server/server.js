require("dotenv").config();
import express from "express";
import { connectToDatabase } from "./config/database";

connectToDatabase();

const app = express();
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));

export default app;
