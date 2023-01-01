import { clientPG } from '../database.js';

export const getProducts = async (req, res) => {
  clientPG
    .query(`SELECT * FROM products`)
    .then((result) =>
      res.status(200).json({ message: 'Get Successful', data: result.rows }),
    )
    .catch((e) =>
      res.status(400).json({
        message: 'Get Fail',
        error: e,
      }),
    );
};

export const getProductById = async (req, res) => {
  clientPG
    .query(`SELECT * FROM products where product_id = ${req.params.id}`)
    .then((result) =>
      res.status(200).json({ message: 'Get Successful', data: result.rows[0] }),
    )
    .catch((e) =>
      res.status(400).json({
        message: 'Get Fail',
        error: e,
      }),
    );
};

export const createProduct = async (req, res) => {
  clientPG
    .query(
      `INSERT INTO products (name, description, price) VALUES ($1, $2, $3)`,
      [req.body.name, req.body.description, req.body.price],
    )
    .then(() => res.status(200).json({ message: 'Create Successful' }))
    .catch((e) =>
      res.status(400).json({
        message: 'Create Fail',
        error: e,
      }),
    );
};

export const updateProduct = async (req, res) => {
  clientPG
    .query(
      `UPDATE products
      SET name = $1,
          description = $2,
          price = $3
      WHERE product_id = ${req.body.product_id};`,
      [req.body.name, req.body.description, req.body.price],
    )
    .then(() => res.status(200).json({ message: 'Update Successful' }))
    .catch((e) =>
      res.status(400).json({
        message: 'Update Fail',
        error: e,
      }),
    );
};

export const deleteProduct = async (req, res) => {
  clientPG
    .query(
      `DELETE FROM products
      WHERE product_id = ${req.body.product_id};`,
    )
    .then(() => res.status(200).json({ message: 'Delete Successful' }))
    .catch((e) =>
      res.status(400).json({
        message: 'Delete Fail',
        error: e,
      }),
    );
};
