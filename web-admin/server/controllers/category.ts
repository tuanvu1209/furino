import { Request, Response } from 'express';
import HttpStatusCode from '../exceptions/HttpStatusCode';
import { categoryRepository } from '../repositories/index';

async function getCategories(req: Request, res: Response) {
  try {
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;

    const categories = await categoryRepository.getCategories(limit, page);
    res.status(HttpStatusCode.OK).json(categories);
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
}

async function insertCategory(req: Request, res: Response) {
  try {
    const { name, image } = req.body;
    const newCategory = await categoryRepository.insertCategory(name, image);
    res.status(HttpStatusCode.INSERT_OK).json(newCategory);
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
}

export default {
  getCategories,
  insertCategory,
};
