import authRouter from './auth.js';
import productRouter from './product.js';
import orderRouter from './order.js';

function route(app) {
	app.use('/login', authRouter);
	app.use('/product', productRouter);
	app.use('/order', orderRouter);
}

export default route;
