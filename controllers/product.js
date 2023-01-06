import { clientPG, s3 } from '../database.js';

export const getProducts = async (req, res) => {
  clientPG
    .query(`SELECT * FROM products`)
    .then((result) =>
      res.status(200).json({
        message: 'Get Successful',
        data: result.rows.filter((row) => row.is_delete === false),
      }),
    )
    .catch((e) =>
      res.status(500).json({
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
      res.status(500).json({
        message: 'Get Fail',
        error: e,
      }),
    );
};

export const createProduct = async (req, res) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME, // bucket that we made earlier
    Key: Date.now() + req.file.originalname, // Name of the image
    Body: req.file.buffer, // Body which will contain the image in buffer format
    ACL: 'public-read-write', // defining the permissions to get the public link
    ContentType: 'image/jpeg', // Necessary to define the image content-type to view the photo in the browser with the link
  };

  s3.upload(params, (error, data) => {
    if (error) {
      res.status(500).send({ err: error });
    }
    clientPG
      .query(
        `INSERT INTO products (name, description, price, image, is_delete) VALUES ($1, $2, $3, $4, false)`,
        [req.body.name, req.body.description, req.body.price, data.Location],
      )
      .then(() => {
        res.status(200).json({ message: 'Create Successful' });
      })
      .catch((e) =>
        res.status(500).json({
          message: 'Create Fail',
          error: e,
        }),
      );
  });
};

export const updateProduct = async (req, res) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME, // bucket that we made earlier
    Key: Date.now() + req.file.originalname, // Name of the image
    Body: req.file.buffer, // Body which will contain the image in buffer format
    ACL: 'public-read-write', // defining the permissions to get the public link
    ContentType: 'image/jpeg', // Necessary to define the image content-type to view the photo in the browser with the link
  };
  s3.upload(params, (error, data) => {
    if (error) {
      res.status(500).send({ err: error });
    }

    clientPG
      .query(
        `UPDATE products
        SET name = $1,
            description = $2,
            price = $3,
            image = $4
        WHERE product_id = ${req.body.product_id};`,
        [req.body.name, req.body.description, req.body.price, data.Location],
      )
      .then(() => res.status(200).json({ message: 'Update Successful' }))
      .catch((e) =>
        res.status(500).json({
          message: 'Update Fail',
          error: e,
        }),
      );
  });
};

export const deleteProduct = async (req, res) => {
  clientPG
    .query(
      `UPDATE products
    SET is_delete = true
    WHERE product_id = ${req.body.product_id};`,
    )
    .then(() => res.status(200).json({ message: 'Delete Successful' }))
    .catch((e) =>
      res.status(500).json({
        message: 'Delete Fail',
        error: e,
      }),
    );
};
