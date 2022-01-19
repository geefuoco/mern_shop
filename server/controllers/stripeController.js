import Stripe from "stripe";
import Order from "../models/Order";
require("dotenv").config();
const stripe = new Stripe(process.env.STRIPE_KEY);

const stripeController = {};
let cartItems;
let total;

stripeController.createCheckoutSession = async (req, res, next) => {
  try {
    const host = process.env.HOSTNAME;

    cartItems = req.body.cartItems;
    total = req.body.total;

    const lineItems = cartItems.map((obj) => {
      return {
        price_data: {
          currency: "cad",
          unit_amount: obj.price * 100,
          product_data: {
            name: obj.name,
            description: obj.description,
            images: [obj.imageUrl],
          },
        },
        quantity: obj.amount,
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      // automatic_tax: {
      //   enabled: true,
      // },
      // tax has to be enabled on dashboard, costs .4% of sale
      success_url: `${host}:3000/success?sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${host}:3000/canceled`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(`Error while directing to checkout page: ${error}`);
  }
};

// Currently getting a content length error in browser,
//Order validation error for date, and email for some reason
stripeController.getCheckoutSession = async (req, res, next) => {
  try {
    const { sessionId } = req.query;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    //Save the order here ? into an order model
    if (cartItems) {
      const order = Order();
      order.user_id = req.user._id || null;
      order.date = new Date();
      order.email = session.customer_details.email || "no email provided";
      order.total = total;
      order.items = cartItems.map((obj) => obj._id);
      order.save();
    }
    res.send(session);
  } catch (error) {
    console.error(error);
  }
};

export default stripeController;
