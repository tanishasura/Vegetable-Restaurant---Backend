import express from 'express';
import { payment } from '../controller/paymentcontroller.js';

 const router = express.Router();

 router.post("/create-checkout-session", payment)

 export default router;