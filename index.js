import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import route from './routers/index.js';
import { clientPG } from './database.js';

const app = express();
const PORT = 3030;

clientPG.connect((err) => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('Postgresql is connected');
  }
});
clientPG
  .query(
    `CREATE TABLE IF NOT EXISTS products (
		  product_id serial PRIMARY KEY,
		  name VARCHAR (100) NOT NULL,
		  description VARCHAR (200),
		  price numeric NOT NULL,
		  image VARCHAR (200)
	  );
	CREATE TABLE IF NOT EXISTS orders (
		order_id VARCHAR (100) PRIMARY KEY,
		user_name VARCHAR (100) NOT NULL,
		phone VARCHAR (50) NOT NULL,
		address VARCHAR (300) NOT NULL
	);
	CREATE TABLE IF NOT EXISTS packages (
		package_id serial PRIMARY KEY,
		product_id int NOT NULL,
		order_id VARCHAR(100) NOT NULL,
		quantity int NOT NULL,
		CONSTRAINT order_foreign 
      		FOREIGN KEY(order_id) 
	  		REFERENCES orders(order_id),
		CONSTRAINT product_foreign
      		FOREIGN KEY(product_id) 
	  		REFERENCES products(product_id)
	);
    `,
  )
  .then(() => console.log('Created Table Successful'))
  .catch((err) => console.log('Created Table Fail', err));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

route(app);

app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
