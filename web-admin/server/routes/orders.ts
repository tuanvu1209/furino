import express from 'express';
import { orderController } from '../controllers/index';

const router = express.Router();

router.get('/', orderController.getOrders);
router.patch('/', orderController.updateOrder);

export default router;