import { clientPG } from '../database.js';

export const setup = async (req, res) => {
  clientPG
    .query(
      `CREATE TABLE IF NOT EXISTS products (
        product_id serial PRIMARY KEY,
        name VARCHAR (100) NOT NULL,
        description VARCHAR (200),
        price numeric NOT NULL,
        image VARCHAR (200),
        is_delete BOOLEAN
      );
    CREATE TABLE IF NOT EXISTS orders (
      order_id VARCHAR (100) PRIMARY KEY,
      user_name VARCHAR (100) NOT NULL,
      phone VARCHAR (50) NOT NULL,
      address VARCHAR (300) NOT NULL,
      created_at TIMESTAMP
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
    .then(() => res.status(200).json({ message: 'Create Successful' }))
    .catch((err) => res.status(400).json({ message: 'Created Table Fail' }));
};
