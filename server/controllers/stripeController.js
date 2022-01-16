import Stripe from "stripe";
require("dotenv").config();
const stripe = new Stripe(process.env.STRIPE_KEY);

const stripeController = {};

stripeController.createCheckoutSession = async (req, res, next) => {
  try {
    const host = process.env.HOSTNAME;

    const cartItems = req.body;

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

stripeController.getCheckoutSession = async (req, res, next) => {
  try {
    const { sessionId } = req.query;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    //Save the order here ? into an order model
    res.send(session);
  } catch (error) {}
};

export default stripeController;
