import authRouter from './auth.js';
import productRouter from './product.js';
import orderRouter from './order.js';
import setupRouter from './setup.js';

function route(app) {
  app.use('/login', authRouter);
  app.use('/product', productRouter);
  app.use('/order', orderRouter);
  app.use('/setup', setupRouter);
}

export default route;
