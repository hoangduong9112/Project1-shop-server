import { v4 as uuidv4 } from 'uuid';
import { clientPG } from '../database.js';

export const createOrder = async (req, res) => {
  const orderId = uuidv4().toString();
  const orderResult = await clientPG
    .query(
      `INSERT INTO orders (order_id, user_name, phone, address) VALUES ($1, $2, $3, $4)`,
      [orderId, req.body.user_name, req.body.phone, req.body.address],
    )
    .then(() => {
      req.body.packages.forEach(async (pack) => {
        clientPG.query(
          `INSERT INTO packages (product_id, order_id, quantity) VALUES ($1, $2, $3)`,
          [pack.product_id, orderId, pack.quantity],
        );
      });
    })
    .then(() => res.status(200).json({ message: 'Create Successful' }))
    .catch((e) =>
      res.status(400).json({
        message: 'Create Fail',
        error: e,
      }),
    );
};

export const getOrderList = async (req, res) => {
  clientPG
    .query(
      `select * from orders o
      left join packages pack ON pack.order_id = o.order_id
      left join products prod ON pack.product_id = prod.product_id`,
    )
    .then((result) =>
      res
        .status(200)
        .json({ message: 'Get Order Successful', data: result.rows }),
    )
    .catch((e) =>
      res.status(400).json({
        message: 'Get Order Fail',
        error: e,
      }),
    );
};
