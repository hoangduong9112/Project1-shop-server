import { v4 as uuidv4 } from 'uuid';
import { clientPG } from '../database.js';

export const createOrder = async (req, res) => {
  try {
    const orderId = uuidv4().toString();
    const orderResult = await clientPG.query(
      `INSERT INTO orders (order_id, user_name, phone, address) VALUES ($1, $2, $3, $4)`,
      [orderId, req.body.user_name, req.body.phone, req.body.address],
    );
    const packagesResult = req.body.packages.map(async (pack) => {
      const packResult = await clientPG.query(
        `INSERT INTO packages (product_id, order_id, quantity) VALUES ($1, $2, $3)`,
        [pack.product_id, orderId, pack.quantity],
      );
      return packResult;
    });
    res.status(200).json({
      message: 'Create Order Successful',
      data: [],
    });
  } catch (err) {
    res.status(400).json({
      message: 'Create Order Fail',
      error: err,
    });
  }
};

export const getOrderList = async (req, res) => {
  try {
    const result = await clientPG.query(
      `select * from orders o
      left join packages pack ON pack.order_id = o.order_id
      left join products prod ON pack.product_id = prod.product_id`,
    );
    res.status(200).json({
      message: 'Get Order Successful',
      data: result.rows,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Get Order Fail',
      error: err,
    });
  }
};
