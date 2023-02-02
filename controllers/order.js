import { v4 as uuidv4 } from 'uuid';
import findIndex from 'lodash/findIndex.js';
import { clientPG } from '../database.js';
import { sns } from '../database.js';

export const createOrder = async (req, res) => {
  const orderId = uuidv4().toString();
  clientPG
    .query(
      `INSERT INTO orders (order_id, user_name, phone, address, created_at) VALUES ($1, $2, $3, $4, $5)`,
      [
        orderId,
        req.body.user_name,
        req.body.phone,
        req.body.address,
        new Date(),
      ],
    )
    .then(() => {
      req.body.packages.forEach(async (pack) => {
        clientPG.query(
          `INSERT INTO packages (product_id, order_id, quantity) VALUES ($1, $2, $3)`,
          [pack.product_id, orderId, pack.quantity],
        );
      });
    })
    .then(() => {
      const params = {
        Message: `You have a new order from ${req.body.user_name}` /* required */,
        TopicArn: process.env.AWS_TOPIC_ARN,
      };

      sns.publish(params, () => {});
      res.status(200).json({ message: 'Create Successful' });
    })
    .catch((e) => {
      res.status(500).json({
        message: 'Create Fail',
        error: e,
      });
    });
};

export const getOrderList = async (req, res) => {
  clientPG
    .query(
      `select * from orders o
      left join packages pack ON pack.order_id = o.order_id
      left join products prod ON pack.product_id = prod.product_id`,
    )
    .then((result) => {
      const orderList = [];
      result.rows.forEach((row) => {
        const existIndex = findIndex(orderList, (order) => {
          return order.order_id === row.order_id;
        });
        if (existIndex > -1) {
          orderList[existIndex].products.push({
            product_id: row.product_id,
            quantity: row.quantity,
            name: row.name,
            description: row.description,
            price: row.price,
          });
        } else {
          orderList.push({
            order_id: row.order_id,
            created_at: row.created_at,
            user_name: row.user_name,
            phone: row.phone,
            address: row.address,
            products: [
              {
                product_id: row.product_id,
                quantity: row.quantity,
                name: row.name,
                description: row.description,
                price: row.price,
              },
            ],
          });
        }
      });
      res
        .status(200)
        .json({ message: 'Get Order Successful', data: orderList });
    })
    .catch((e) =>
      res.status(500).json({
        message: 'Get Order Fail',
        error: e,
      }),
    );
};
