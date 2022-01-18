import User from "../models/User";
import Order from "../models/Order";

const usersController = {};

usersController.logout = (req, res, next) => {
  try {
    if (req.user) {
      //save the users cart into items
      const user = User.findById(req.user._id);
      user.items = req.session.cart;
      user.save();
      req.session.cart = [];
      req.logout();
      // redirect doesnt work due to CORS issues
      //change url on front end side
      res.status(200).end();
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
    const user_id = req.user._id;
    Order.find({ user_id: user_id }).exec((err, list_of_orders) => {
      if (err) return next(err);
      res.status(200).send({ orders: list_of_orders });
    });
  } catch (error) {
    console.error(error);
  }
};

export default usersController;
