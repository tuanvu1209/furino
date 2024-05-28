// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import { createUser, getAccounts, loginUser, updateUser } from './userReduce';
import * as jwtDecode from 'jwt-decode';

const getDataFromToken = (token) => {
  try {
    const data = jwtDecode.jwtDecode(token);
    return data.data;
  } catch (error) {
    return null;
  }
};

const initialState = {
  accounts: [],
  token: localStorage.getItem('jwtToken') || null,
  user: getDataFromToken(localStorage.getItem('jwtToken')) || null,
};

const userManagementSlice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {
    actionLogout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('jwtToken');
    },
  },
  extraReducers: (builder) => {
    builder
      // //get Account List
      .addCase(getAccounts.fulfilled, (state, action) => {
        state.accounts = action.payload;
      })
      .addCase(getAccounts.rejected, (state) => {
        toast.error('No response from server');
        state.accounts = [];
      })

      //createUser
      .addCase(createUser.fulfilled, (state, action) => {
        toast.success('Create Successfully');
      })
      .addCase(createUser.rejected, (state) => {
        toast.error('Create Error');
      })

      // login
      .addCase(loginUser.fulfilled, (state, action) => {
        toast.success('Login Success');
        state.user = action.payload;
        state.token = action.payload.token
      })
      .addCase(loginUser.rejected, (state) => {
        toast.error('Login Error');
      })

      //updateUser
      .addCase(updateUser.fulfilled, (state, action) => {
        toast.success('Update Successfully');
        state.accounts = action.payload;
      })
      .addCase(updateUser.rejected, (state) => {
        toast.error('Update Error');
      });
  },
});
export const { actionLogout } = userManagementSlice.actions;
export default userManagementSlice.reducer;
