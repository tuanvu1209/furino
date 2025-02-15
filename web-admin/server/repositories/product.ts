import { Op } from 'sequelize';
import sequelize from '../database/sequelize';
import Exception from '../exceptions/Exception';
import { colors, sizes } from '../global/constants';
import {
  Category,
  Product,
  ProductCategory,
  ProductColor,
  ProductGeneralImage,
  ProductImage,
  ProductInventory,
  ProductSize,
} from '../models/index';
import { ProductInsert, ProductUpdate } from '../types/product';

const getProducts = async (
  limit: number,
  page: number,
  keyword: string,
  sort: string,
  categoryIds: number[]
) => {
  try {
    const whereCondition: any = {
      name: {
        [Op.iLike]: `%${keyword}%`,
      },
    };

    const whereCategory: { categoryId?: number[] } = {};

    if (categoryIds.length > 0) {
      whereCategory.categoryId = categoryIds;
    }

    const products = await Product.findAll({
      where: whereCondition,
      order:
        sort === 'price'
          ? [
              [
                { model: ProductInventory, as: 'productInventory' },
                'price',
                'ASC',
              ],
            ]
          : [[sort, 'ASC']],
      limit: limit,
      offset: (page - 1) * limit,
      attributes: [
        'productId',
        'name',
        'description',
        'quantity',
        [
          sequelize.fn(
            'to_char',
            sequelize.col('createdAt'),
            'YYYY-MM-DD HH24:MI:SS'
          ),
          'createdAt',
        ],
        [
          sequelize.fn(
            'to_char',
            sequelize.col('updatedAt'),
            'YYYY-MM-DD HH24:MI:SS'
          ),
          'updatedAt',
        ],
      ],
      include: [
        {
          model: ProductCategory,
          where: whereCategory,
          attributes: ['categoryId'],
          include: [
            {
              model: Category,
              attributes: ['name', 'image'],
            },
          ],
        },
        {
          model: ProductInventory,
          attributes: ['quantity', 'sold', 'price', 'priceDiscount', 'productInventoryId', 'productSizeId', 'productColorId'],
          order: [['productSizeId', 'ASC']],
          include: [
            {
              model: ProductSize,
              attributes: ['productSizeId', 'name'],
            },
            {
              model: ProductColor,
              attributes: ['productColorId', 'hex', 'name'],
            },
          ],
        },
        {
          model: ProductGeneralImage,
          attributes: ['image', 'productGeneralImageId'],
        },
        {
          model: ProductImage,
          attributes: ['image', 'productColorId', 'productImageId'],
        },
      ],
    });

    const count = await Product.findAll({
      where: whereCondition,
      include: [
        {
          model: ProductCategory,
          where: whereCategory,
        },
      ],
    });

    return { data: products, count: count.length };
  } catch (exception: any) {
    throw new Error(exception.message);
  }
};

const insertProduct = async ({
  name,
  description,
  productCategories,
  productGeneralImages,
  productInventories,
  productImages,
}: ProductInsert) => {
  const t = await sequelize.transaction();

  try {
    const [productSizeLength, productColorLength] = await Promise.all([
      ProductSize.count(),
      ProductColor.count(),
    ]);

    if (productSizeLength === 0) {
      await ProductSize.bulkCreate(sizes, { transaction: t });
    }

    if (productColorLength === 0) {
      await ProductColor.bulkCreate(colors, { transaction: t });
    }

    const quantity = productInventories.reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantity,
      0
    );

    const product = await Product.create(
      {
        name,
        description,
        quantity,
      },
      { transaction: t }
    );

    if (!product) {
      throw new Error(Exception.CANNOT_CREATE_PRODUCT);
    }

    const productId = product.get('productId');

    await Promise.all([
      ProductInventory.bulkCreate(
        productInventories.map((item) => ({
          ...item,
          productId,
        })),
        { transaction: t }
      ),
      ProductGeneralImage.bulkCreate(
        productGeneralImages.map((image) => ({
          image,
          productId,
        })),
        { transaction: t }
      ),
      ProductImage.bulkCreate(
        productImages.map((item) => ({
          ...item,
          productId,
        })),
        { transaction: t }
      ),

      ProductCategory.bulkCreate(
        productCategories.map((categoryId) => ({
          categoryId,
          productId,
        })),
        { transaction: t }
      ),
    ]);

    await t.commit();

    return product;
  } catch (exception: any) {
    await t.rollback();
    throw new Error(exception.message);
  }
};

const deleteProduct = async (productId: number) => {
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new Exception(Exception.PRODUCT_NOT_FOUND);
    }
    await product.destroy();
    return null;
  } catch (exception: any) {
    throw new Exception(exception.message);
  }
};

const updateProduct = async ({
  productId,
  name,
  description,
  productCategories,
  productGeneralImages,
  productImages,
  productInventories,
}: ProductUpdate) => {
  const t = await sequelize.transaction();
  try {
    const updateFields: any = {};
    if (name !== undefined) {
      updateFields.name = name;
    }
    if (description !== undefined) {
      updateFields.description = description;
    }

    if (productCategories) {
      await ProductCategory.destroy({
        where: { productId },
        transaction: t,
      });

      const newCategoryRows = productCategories.map((categoryId) => ({
        productId,
        categoryId,
      }));
      await ProductCategory.bulkCreate(newCategoryRows, { transaction: t });
    }

    if (productGeneralImages) {
      await ProductGeneralImage.destroy({
        where: { productId },
        transaction: t,
      });

      const newProductGeneralImageRows = productGeneralImages.map((image) => ({
        productId,
        image,
      }));
      await ProductGeneralImage.bulkCreate(newProductGeneralImageRows, {
        transaction: t,
      });
    }

    if (productImages) {
      await ProductImage.destroy({
        where: { productId },
        transaction: t,
      });

      const newProductImageRows = productImages.map((item) => ({
        productId,
        ...item,
      }));
      await ProductImage.bulkCreate(newProductImageRows, {
        transaction: t,
      });
    }

    if (productInventories) {
      await ProductInventory.destroy({
        where: { productId },
        transaction: t,
      });

      const newProductInventoryRows = productInventories.map((inventory) => ({
        productId,
        ...inventory,
      }));
      await ProductInventory.bulkCreate(newProductInventoryRows, {
        transaction: t,
      });

      const newQuantity = productInventories.reduce(
        (accumulator, currentValue) => accumulator + currentValue.quantity,
        0
      );

      updateFields.quantity = newQuantity;
    }

    const product = await Product.findByPk(productId, { transaction: t });

    if (!product) {
      throw new Exception(Exception.PRODUCT_NOT_FOUND);
    }

    await product.update(updateFields, { transaction: t });

    await t.commit();

    return product;
  } catch (exception: any) {
    await t.rollback();
    throw new Exception(exception.message);
  }
};

const getProductColors = async () => {
  try {
    const colors = await ProductColor.findAll();
    return colors;
  } catch (exception: any) {
    throw new Error(exception.message);
  }
};

const getProductSizes = async () => {
  try {
    const sizes = await ProductSize.findAll();
    return sizes;
  } catch (exception: any) {
    throw new Error(exception.message);
  }
};

export default {
  getProducts,
  insertProduct,
  deleteProduct,
  updateProduct,
  getProductColors,
  getProductSizes,
};
