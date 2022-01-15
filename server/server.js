require("dotenv").config();
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./config/database";
import productRouter from "./routes/product.router";
import cartRouter from "./routes/cart.router";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";

const dbConnection = connectToDatabase();

const app = express();

app.use(cors({ origin: "http://192.168.2.239:3000", credentials: true }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      client: dbConnection.then((data) => data.getClient()),
    }),
    cookie: { maxAge: 1000 * 60 * 60 },
  })
);

//session can be set in 'locals' of response of any middleware
app.use((req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = [];
    req.session.save;
  }
  next();
});
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

app.use((req, res, next) => {
  res.status(404);
  res.send("Error: 404");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));

export default app;
