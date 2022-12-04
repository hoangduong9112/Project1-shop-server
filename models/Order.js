import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ProductionInformation = new Schema({
  _id: { type: String },
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  image: { type: String },
  quantity: { type: Number },
});

const Order = new Schema(
  {
    customerInformation: {
      name: { type: String },
      address: { type: String },
      phone: { type: String },
    },
    productionInformation: [ProductionInformation],
  },
  {
    timestamps: true,
  },
);

export const OrderModel = mongoose.model("Order", Order);
