require("dotenv").config();
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./config/database";
import productRouter from "./routes/product.router";
import cartRouter from "./routes/cart.router";
import stripeRouter from "./routes/stripe.router";
import userRouter from "./routes/user.router";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import passport from "passport";
import csurf from "csurf";

const dbConnection = connectToDatabase();
const csrfProtection = csurf();

const app = express();
require("./config/passport");

app.use(cors({ origin: `${process.env.HOSTNAME}:3000`, credentials: true }));
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
app.use(passport.initialize());
app.use(passport.session());
app.use(csrfProtection);

app.use((req, res, next) => {
  if (!req.session.token) {
    req.session.token = req.csrfToken();
  }
  next();
});

//session can be set in 'locals' of response of any middleware
app.use("/api/cart", (req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  next();
});
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use(stripeRouter);
app.use("/user", userRouter);

app.use((req, res, next) => {
  res.status(404);
  res.send("Error: 404");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));

export default app;
