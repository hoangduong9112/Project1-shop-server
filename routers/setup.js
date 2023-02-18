import express from 'express';
import { setup } from '../controllers/setup.js';

const setupRouter = express.Router();

setupRouter.get('/', setup);

export default setupRouter;
