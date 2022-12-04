import { ProductModel } from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await ProductModel.create(req.body);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await ProductModel.updateOne(
      { _id: req.params.id },
      req.body,
    );
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.deleteOne({ _id: req.params.id });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
