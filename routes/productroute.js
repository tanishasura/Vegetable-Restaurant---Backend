import express from 'express';
import { getProducts, uploadProduct } from '../controller/productcontroller.js';

const router = express.Router();

router.post('/upload-product', uploadProduct);
router.get('/get-products', getProducts);
// router.get('/update-data', updateData);

export default router;
