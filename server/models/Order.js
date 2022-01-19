import { Schema, model } from "mongoose";

const OrderSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  email: { type: String, required: true },
  date: { type: Date, required: true },
  total: { type: Number, required: true },
  products: [{ type: Schema.Types.ObjectId, ref: "Product", required: true }],
});

export default model("Order", OrderSchema);
