import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.js';
import { validateAccessToken } from '../middleware/validateAccessToken.js';

const ProductRouter = express.Router();

ProductRouter.get('/', getProducts);
ProductRouter.get('/:id', getProductById);
ProductRouter.post('/', validateAccessToken, createProduct);
ProductRouter.put('/', validateAccessToken, updateProduct);
ProductRouter.delete('/', validateAccessToken, deleteProduct);

export default ProductRouter;
