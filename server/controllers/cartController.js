import { Product } from "../models/Product";
const cartController = {};

cartController.addToCart = async (req, res, next) => {
  try {
    const id = req.params.id;
    Product.findById(id).exec((err, result) => {
      if (err) return next(err);
      req.session.cart.push(result);
      req.session.save();
    });
    res.status(200).end();
  } catch (error) {}
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

export default cartController;