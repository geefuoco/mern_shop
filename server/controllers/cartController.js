import { Product } from "../models/Product";
import User from "../models/User";
const cartController = {};

cartController.addToCart = async (req, res, next) => {
  try {
    const id = req.params.id;
    Product.findById(id).exec((err, result) => {
      if (err) return next(err);
      if (containsObject(req.session.cart, id)) {
        const item = req.session.cart.find((v) => v._id === id);
        ++item.amount;
      } else {
        const lineItem = { ...result._doc, amount: 1 };
        req.session.cart.push(lineItem);
      }
      req.session.save();
    });
    res.status(200).end();
  } catch (error) {}
};

cartController.incrementItem = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (containsObject(req.session.cart, id)) {
      const item = req.session.cart.find((v) => v._id === id);
      const newQuantity = item.amount + 1;
      if (newQuantity <= item.countInStock) {
        ++item.amount;
        res.status(200).end();
      } else {
        res.send({ error: "Cannot add more items than there are in stock." });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

cartController.decrementItem = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (containsObject(req.session.cart, id)) {
      const item = req.session.cart.find((v) => v._id === id);
      const newQuantity = item.amount - 1;
      if (newQuantity >= 1) {
        --item.amount;
        res.status(200).end();
      } else {
        res.send({ error: "Cannot remove item." });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const containsObject = (arr, prop) => {
  return arr.filter((o) => o._id === prop).length !== 0;
};

cartController.viewCart = async (req, res, next) => {
  try {
    res.status(200);
    res.json(req.session.cart);
  } catch (error) {}
};

cartController.deleteItem = async (req, res, next) => {
  try {
    const id = req.params.id;
    const items = req.session.cart;
    const newCart = items.filter((obj) => obj._id !== id);
    req.session.cart = newCart;
    req.session.save();
    res.status(200).end();
  } catch (error) {}
};

cartController.emptyCart = async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findById(req.user._id);
      user.items = [];
      user.save();
    }
    req.session.cart = [];
    res.status(200).end();
  } catch (error) {}
};

export default cartController;
