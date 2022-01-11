require("dotenv").config();

import { product } from "./product";
import { connectToDatabase } from "../config/database";
import { Product } from "../models/Product";

connectToDatabase();

const seedDatabase = async () => {
  try {
    await Product.deleteMany({});

    await Product.insertMany(product);
    console.log("Data seeded successfully");
    process.exit();
  } catch (error) {
    console.error(`Error while seeding data: ${error}`);
    process.exit(1);
  }
};

seedDatabase();
