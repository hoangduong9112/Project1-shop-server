import express from 'express';
import {createOrder} from '../controllers/order.js';
import {getOrderList} from '../controllers/order.js';

const orderRouter = express.Router();

orderRouter.post('/', createOrder);
orderRouter.get('/', getOrderList);

export default orderRouter;
