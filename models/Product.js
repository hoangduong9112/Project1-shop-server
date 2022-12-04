import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Product = new Schema(
  {
    name: { type: String, default: "New Product" },
    description: { type: String, default: "Description" },
    image: { type: String },
    price: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

export const ProductModel = mongoose.model("Product", Product);
