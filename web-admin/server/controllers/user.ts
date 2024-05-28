import { Request, Response } from 'express';
import HttpStatusCode from '../exceptions/HttpStatusCode';
import { userRepository } from '../repositories/index';

async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await userRepository.login({
      email,
      password,
    });
    res.status(HttpStatusCode.OK).json(user);
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
}

async function register(req: Request, res: Response) {
  try {
    const { name, email, password, roleId, phone } = req.body;
    const user = await userRepository.register({
      name,
      email,
      password,
      roleId,
      phone,
    });
    res.status(HttpStatusCode.OK).json(user);
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
}

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId, roleId, status } = req.body;
    const user = await userRepository.updateUser({
      userId,
      roleId,
      status,
    });
    res.status(HttpStatusCode.OK).json(user);
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepository.getUsers();
    res.status(HttpStatusCode.OK).json(users);
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
}

export default {
  login,
  register,
  updateUser,
  getUsers,
};
