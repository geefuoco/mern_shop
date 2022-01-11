require("dotenv").config();
import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connection SUCCESS");
  } catch (error) {
    console.error(`Error while connecting to database: ${error}`);
    process.exit(1);
  }
};
