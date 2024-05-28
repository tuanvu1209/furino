import { Request, Response } from 'express';
import HttpStatusCode from '../exceptions/HttpStatusCode';
import { orderRepository } from '../repositories/index';

const updateOrder = async (req: Request, res: Response) => {
  try {
    const { orderId, status } = req.body;
    const order = await orderRepository.updateOrder({
      orderId,
      status,
    });
    res.status(HttpStatusCode.OK).json(order);
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderRepository.getOrders();
    res.status(HttpStatusCode.OK).json(orders);
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
};

export default {
  updateOrder,
  getOrders,
};
