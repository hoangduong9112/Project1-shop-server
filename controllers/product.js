import { clientPG } from '../database.js';

export const getProducts = async (req, res) => {
  try {
    const result = await clientPG.query(`SELECT * FROM products`);
    res.status(200).json({ data: result.rows });
  } catch (err) {
    res.status(400).json({
      message: 'Get Fail',
      error: err,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const result = await clientPG.query(
      `SELECT * FROM products where product_id = ${req.params.id}`,
    );
    res.status(200).json({ data: result.rows[0] });
  } catch (err) {
    res.status(400).json({
      message: 'Get Fail',
      error: err,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const result = await clientPG.query(
      `INSERT INTO products (name, description, price) VALUES ($1, $2, $3)`,
      [req.body.name, req.body.description, req.body.price],
    );
    res.status(200).json({ message: 'Create Successful', data: result.rows });
  } catch (err) {
    res.status(400).json({
      message: 'Create Fail',
      error: err,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const result = await clientPG.query(
      `UPDATE products
      SET name = $1,
          description = $2,
          price = $3
      WHERE product_id = ${req.body.product_id};`,
      [req.body.name, req.body.description, req.body.price],
    );
    res.status(200).json({ message: 'Update Successful', data: result.rows });
  } catch (err) {
    res.status(400).json({
      message: 'Update Fail',
      error: err,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const result = await clientPG.query(
      `DELETE FROM products
      WHERE product_id = ${req.body.product_id};`,
    );
    res.status(200).json({ message: 'Delete Successful', data: result.rows });
  } catch (err) {
    res.status(400).json({
      message: 'Delete Fail',
      error: err,
    });
  }
};
