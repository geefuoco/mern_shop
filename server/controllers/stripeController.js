import Stripe from "stripe";
require("dotenv").config();
const stripe = new Stripe(process.env.STRIPE_KEY);

const stripeController = {};

export default stripeController;
