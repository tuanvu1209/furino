import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Exception from '../exceptions/Exception';
import { Role, User } from '../models/index';

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const user: any = await User.findOne({
      where: {
        email,
      },
      include: [
        {
          model: Role,
          as: 'role',
        },
      ],
      attributes: ['userId', 'name', 'email', 'password', 'status'],
    });

    if (!user) {
      throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD);
    }

    if (!user.status) {
      throw new Exception(Exception.USER_DISABLE);
    }

    const token = jwt.sign(
      {
        data: user,
      },
      process.env.JWT_SECRET || 'default-secret',
      {
        expiresIn: '30 days',
      }
    );

    const adminRole = [0, 1];

    if (adminRole.includes(user.roleId)) {
      throw new Exception(Exception.WRONG_ROLE);
    }

    return {
      ...user.dataValues,
      token: token,
      password: 'Not show',
    };
  } catch (exception: any) {
    throw new Exception(exception.message);
  }
};

const register = async ({
  name,
  email,
  password,
  roleId,
  phone,
}: {
  name: string;
  email: string;
  password: string;
  roleId: number;
  phone: string;
}) => {
  try {
    const role: any = await Role.findAll();
    if (role.length === 0) {
      await Role.bulkCreate([
        { name: 'superAdmin', roleId: 0 },
        { name: 'admin', roleId: 1 },
        { name: 'shipper', roleId: 2 },
        { name: 'user', roleId: 3 },
      ]);
    }

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      throw new Exception(Exception.USER_EXIST);
    }

    const saltRounds = process.env.SALT_ROUNDS || '10';

    const hashedPassword = await bcrypt.hash(password, parseInt(saltRounds));

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      roleId: roleId || 3,
      phone,
    });
    return { ...newUser.dataValues, password: 'Not show' };
  } catch (exception: any) {
    throw new Exception(exception.message);
  }
};

const updateUser = async ({
  userId,
  roleId,
  status,
}: {
  userId: number;
  roleId?: string;
  status?: boolean;
}) => {
  try {
    const user = await User.update(
      {
        roleId,
        status,
      },
      {
        where: {
          userId,
        },
      }
    );

    return user;
  } catch (exception: any) {
    throw new Exception(exception.message);
  }
};

const getUsers = async () => {
  try {
    const users = await User.findAll({
      attributes: ['userId', 'name', 'email', 'phone', 'status'],
      include: [
        {
          model: Role,
          as: 'role',
        },
      ],
    });

    return users;
  } catch (exception: any) {
    throw new Exception(exception.message);
  }
}

export default {
  login,
  register,
  updateUser,
  getUsers,
};
