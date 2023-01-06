import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.js';
import { validateAccessToken } from '../middleware/validateAccessToken.js';
import { uploadImage } from '../middleware/uploadImage.js';

const ProductRouter = express.Router();

ProductRouter.get('/', getProducts);
ProductRouter.get('/:id', getProductById);
ProductRouter.post(
  '/',
  validateAccessToken,
  uploadImage.single('image'),
  createProduct,
);
ProductRouter.put(
  '/',
  validateAccessToken,
  uploadImage.single('image'),
  updateProduct,
);
ProductRouter.post('/delete', validateAccessToken, deleteProduct);

export default ProductRouter;
