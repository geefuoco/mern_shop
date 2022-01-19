import User from "../models/User";
import Order from "../models/Order";
import passport from "passport";
import { body, validationResult } from "express-validator";
require("dotenv").config();

const usersController = {};

const validateEmailAndPassword = (req, next) => {
  body("email").isEmail().notEmpty();
  body("password").isLength({ min: 8 });
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next({
      message:
        "Please check that your form fields are filled, and your password has a minimum length of 8",
    });
  }
};

usersController.signup = (req, res, next) => {
  validateEmailAndPassword(req, next);
  passport.authenticate("local_signup", {
    successRedirect: `${process.env.HOSTNAME}:3000/`,
    failureRedirect: `${process.env.HOSTNAME}:3000/user/signup`,
  })(req, res, next);
};

usersController.signin = (req, res, next) => {
  passport.authenticate("local_signin", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.redirect(`${process.env.HOSTNAME}:3000/user/signin`);
    req.logIn(user, (err) => {
      if (err) return next(err);
      req.session.cart = user.items;
      return res.redirect(`${process.env.HOSTNAME}:3000`);
    });
  })(req, res, next);
};

usersController.logout = async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findById(req.user._id);
      user.items = req.session.cart;
      user.save();
      req.session.cart = [];
      req.logout();
      // redirect doesnt work due to CORS issues
      //change url on front end side
      res.status(200).end();
    } else {
      res.status(403).end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};

usersController.authorize = (req, res, next) => {
  if (req.user) {
    res.send(true);
  } else {
    res.send(false);
  }
};

usersController.orders = async (req, res, next) => {
  try {
    if (req.user) {
      const user_id = req.user._id;
      Order.find({ user_id: user_id })
        .populate("products")
        .exec((err, list_of_orders) => {
          if (err) return next(err);
          res.status(200).send({ orders: list_of_orders });
        });
    } else {
      return res.redirect(403, `${process.env.HOSTNAME}:3000/signin`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};

export default usersController;
