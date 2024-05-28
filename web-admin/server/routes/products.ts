import express from 'express';
import { productController } from '../controllers/index';

const router = express.Router();

router.get('/', productController.getProducts);
router.get('/colors', productController.getProductColors);
router.get('/sizes', productController.getProductSizes);
router.patch('/', productController.updateProduct);
router.post('/', productController.insertProduct);
router.delete('/:productId', productController.deleteProduct);

export default router;
