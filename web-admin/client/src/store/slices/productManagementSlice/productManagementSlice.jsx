import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import {
  changeStatusOrder,
  createCategory,
  createProduct,
  deleteCategory,
  deleteProduct,
  getDataProduct,
  getOrders,
  updateCategory,
  updateProduct,
} from './productReduce';
const initialState = {
  products: [],
  categories: [],
  orders: [],
  colors: [],
  sizes: [],
};

const productManagementSlice = createSlice({
  name: 'productManagement',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get data product
      .addCase(getDataProduct.fulfilled, (state, action) => {
        const { products, categories, colors, sizes } = action.payload;
        state.products = products;
        state.categories = categories;
        state.colors = colors;
        state.sizes = sizes;
      })
      .addCase(getDataProduct.rejected, (state) => {
        toast.error('No response from server');
      })

      //createProduct
      .addCase(createProduct.fulfilled, (state, action) => {
        toast.success('Create Successfully');
        state.products = action.payload;
      })
      .addCase(createProduct.rejected, (state) => {
        toast.error('Create Error');
      })

      //delete Product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        toast.success('Delete Successfully');
        state.products = action.payload;
      })
      .addCase(deleteProduct.rejected, (state) => {
        toast.error('Delete Error');
      })

      //updateProduct
      .addCase(updateProduct.fulfilled, (state, action) => {
        toast.success('updated successfully');
        state.products = action.payload;
      })
      .addCase(updateProduct.rejected, (state) => {
        toast.error('Update Error');
      })

      //createCategory
      .addCase(createCategory.fulfilled, (state, action) => {
        toast.success('Create Successfully');
        state.categories = action.payload;
      })
      .addCase(createCategory.rejected, (state) => {
        toast.error('Create Error');
      })

      //updateCategory
      .addCase(updateCategory.fulfilled, (state, action) => {
        toast.success('updated successfully');
        state.categories = action.payload;
      })
      .addCase(updateCategory.rejected, (state) => {
        toast.error('Update Error');
      })

      //deleteCategory
      .addCase(deleteCategory.fulfilled, (state, action) => {
        toast.success('Delete Successfully');
        state.categories = action.payload;
      })
      .addCase(deleteCategory.rejected, (state) => {
        toast.error('Delete Error');
      })

      //get order List
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state) => {
        toast.error('No response from server');
        state.orders = [];
      })

      //change status order
      .addCase(changeStatusOrder.fulfilled, (state, action) => {
        toast.success('Change Successfully');
        state.orders = action.payload;
      })
      .addCase(changeStatusOrder.rejected, (state) => {
        toast.error('Change Error');
        state.orders = [];
      });
  },
});
export default productManagementSlice.reducer;
