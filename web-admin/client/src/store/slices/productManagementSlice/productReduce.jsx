// @ts-nocheck
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '../../../assets/enum/constants';
import { handleLoading, handleLoadingButton } from '../loadingSlice';
const token = localStorage.getItem('jwtToken');

const getDataProduct = createAsyncThunk(
  'GET_DATA_PRODUCT',
  async ({ limit, page, categoryId, keyword }, thunkAPI) => {
    try {
      thunkAPI.dispatch(handleLoading(true));
      const products = await axios.get(`${baseURL}/products`, {
        params: {
          limit,
          page,
          categoryId,
          keyword,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const categories = await axios.get(`${baseURL}/categories`, {
        params: {
          limit: 10,
          page: 1,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const colors = await axios.get(`${baseURL}/products/colors`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const sizes = await axios.get(`${baseURL}/products/sizes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      thunkAPI.dispatch(handleLoading(false));
      return {
        products: products.data.data,
        categories: categories.data,
        colors: colors.data,
        sizes: sizes.data,
      };
    } catch (error) {
      thunkAPI.dispatch(handleLoading(false));
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const createProduct = createAsyncThunk(
  'CREATE_PRODUCT',
  async (dataRequest, thunkAPI) => {
    try {
      thunkAPI.dispatch(handleLoadingButton(true));
      const createdProduct = await axios.post(
        `${baseURL}/products`,
        dataRequest,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!createdProduct.data) {
        thunkAPI.dispatch(handleLoadingButton(false));
        return thunkAPI.rejectWithValue(error.message);
      }
      thunkAPI.dispatch(handleLoadingButton(false));
      thunkAPI.dispatch(handleLoading(true));
      const products = await axios.get(`${baseURL}/products`, {
        params: {
          limit: 1000,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      thunkAPI.dispatch(handleLoading(false));

      return products.data.data;
    } catch (error) {
      thunkAPI.dispatch(handleLoadingButton(false));
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const deleteProduct = createAsyncThunk(
  'DELETE_PRODUCT',
  async ({ productId, limitOffset }, thunkAPI) => {
    try {
      thunkAPI.dispatch(handleLoadingButton(true));
      const deleteProduct = await axios.delete(
        `${baseURL}/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      thunkAPI.dispatch(handleLoadingButton(false));
      const { limit, page, categoryId, keyword } = limitOffset;
      thunkAPI.dispatch(handleLoading(true));
      const products = await axios.get(`${baseURL}/products`, {
        params: {
          limit,
          page,
          categoryId,
          keyword,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      thunkAPI.dispatch(handleLoading(false));
      return products.data.data;
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(handleLoadingButton(false));
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const updateProduct = createAsyncThunk(
  'UPDATE_PRODUCT',
  async (dataRequest, thunkAPI) => {
    try {
      thunkAPI.dispatch(handleLoadingButton(true));
      const updateProduct = await axios.patch(
        `${baseURL}/products`,
        dataRequest,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      thunkAPI.dispatch(handleLoadingButton(false));
      if (!updateProduct.data) {
        return thunkAPI.rejectWithValue(error.message);
      }
      thunkAPI.dispatch(handleLoading(true));
      const products = await axios.get(`${baseURL}/products`, {
        params: {
          limit: 1000,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      thunkAPI.dispatch(handleLoading(false));
      return products.data.data;
    } catch (error) {
      thunkAPI.dispatch(handleLoadingButton(false));
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const createCategory = createAsyncThunk(
  'CREATE_CATEGORY',
  async (dataRequest, thunkAPI) => {
    try {
      thunkAPI.dispatch(handleLoadingButton(true));
      const createCategory = await axios.post(
        `${baseURL}/categories`,
        dataRequest,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      thunkAPI.dispatch(handleLoadingButton(false));
      if (!createCategory.data) {
        return thunkAPI.rejectWithValue(error.message);
      }
      thunkAPI.dispatch(handleLoading(true));
      const categories = await axios.get(`${baseURL}/categories`, {
        params: {
          limit: 100,
          page: 1,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      thunkAPI.dispatch(handleLoading(false));
      return categories.data;
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(handleLoadingButton(false));
    }
  }
);

const updateCategory = createAsyncThunk(
  'UPDATE_CATEGORY',
  async (dataRequest, thunkAPI) => {
    try {
      thunkAPI.dispatch(handleLoadingButton(true));
      const updateCategory = await axios.patch(
        `${baseURL}/categories`,
        dataRequest,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      thunkAPI.dispatch(handleLoadingButton(false));
      if (!updateCategory.data) {
        return thunkAPI.rejectWithValue(error.message);
      }
      thunkAPI.dispatch(handleLoading(true));
      const categories = await axios.get(`${baseURL}/categories`, {
        params: {
          limit: 100,
          page: 1,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      thunkAPI.dispatch(handleLoading(false));
      return categories.data;
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(handleLoadingButton(false));
    }
  }
);

const deleteCategory = createAsyncThunk(
  'DELETE_CATEGORY',
  async (categoryId, thunkAPI) => {
    try {
      thunkAPI.dispatch(handleLoadingButton(true));
      const deleteCategory = await axios.delete(
        `${baseURL}/categories/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      thunkAPI.dispatch(handleLoadingButton(false));

      thunkAPI.dispatch(handleLoading(true));
      const categories = await axios.get(`${baseURL}/categories`, {
        params: {
          limit: 100,
          page: 1,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      thunkAPI.dispatch(handleLoading(false));
      return categories.data;
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(handleLoadingButton(false));
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const getOrders = createAsyncThunk(
  'GET_ORDER_LIST',
  async ({ limit, page, status }, thunkAPI) => {
    try {
      thunkAPI.dispatch(handleLoading(true));
      const result = await axios.get(`${baseURL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit,
          page,
          status,
        },
      });
      thunkAPI.dispatch(handleLoading(false));
      return result.data;
    } catch (error) {
      thunkAPI.dispatch(handleLoading(false));
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const changeStatusOrder = createAsyncThunk(
  'CHANGE_STATUS_ORDER',
  async (dataRequest, thunkAPI) => {
    try {
      thunkAPI.dispatch(handleLoadingButton(true));
      const response = await axios.patch(`${baseURL}/orders`, dataRequest, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      thunkAPI.dispatch(handleLoadingButton(false));

      thunkAPI.dispatch(handleLoading(true));
      const orders = await axios.get(`${baseURL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: 1000,
        },
      });
      thunkAPI.dispatch(handleLoading(false));

      return orders.data;
    } catch (error) {
      thunkAPI.dispatch(handleLoadingButton(false));
      thunkAPI.dispatch(handleLoading(false));
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export {
  changeStatusOrder,
  createCategory,
  createProduct,
  deleteCategory,
  deleteProduct,
  getDataProduct,
  getOrders,
  updateCategory,
  updateProduct,
};
