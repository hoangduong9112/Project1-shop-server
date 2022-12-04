import { OrderModel } from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const order = await OrderModel.create(req.body);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getOrderList = async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
