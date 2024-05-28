// @ts-nocheck
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '../../../assets/enum/constants';
import {
  handleLoading,
  handleLoadingButton,
  handleLoadingPage,
} from '../loadingSlice';
const token = localStorage.getItem('jwtToken');

const getAccounts = createAsyncThunk(
  'GET_ACCOUNT_LIST',
  async ({ limit, page }, thunkAPI) => {
    try {
      thunkAPI.dispatch(handleLoading(true));
      const accounts = await axios.get(`${baseURL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit,
          page,
        },
      });
      thunkAPI.dispatch(handleLoading(false));
      return accounts.data;
    } catch (error) {
      thunkAPI.dispatch(handleLoading(false));
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const createUser = createAsyncThunk(
  'CREATE_USER',
  async ({ dataRequest, limitOffset }, thunkAPI) => {
    try {
      thunkAPI.dispatch(handleLoadingButton(true));
      await axios.post(`${baseURL}/users/register`, dataRequest, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      thunkAPI.dispatch(handleLoadingButton(false));

      thunkAPI.dispatch(handleLoading(true));
      const accounts = await axios.get(`${baseURL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: limitOffset.limit,
          page: limitOffset.page,
        },
      });
      thunkAPI.dispatch(handleLoading(false));
      return accounts.data;
    } catch (error) {
      thunkAPI.dispatch(handleLoadingButton(false));
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const loginUser = createAsyncThunk('LOGIN', async (dataRequest, thunkAPI) => {
  try {
    thunkAPI.dispatch(handleLoadingButton(true));
    const response = await axios.post(
      `${baseURL}/users/login`,
      dataRequest
    );
    thunkAPI.dispatch(handleLoadingButton(false));

    thunkAPI.dispatch(handleLoadingPage(true));
    setTimeout(() => {
      thunkAPI.dispatch(handleLoadingPage(false));
      const { token } = response.data;
      localStorage.setItem('jwtToken', token);
    }, 3000);
    return response.data;
  } catch {
    thunkAPI.dispatch(handleLoadingButton(false));
    return thunkAPI.rejectWithValue(error.message);
  }
});

const updateUser = createAsyncThunk(
  'UPDATE_USER',
  async ({ dataRequest, limitOffset }, thunkAPI) => {
    try {
      thunkAPI.dispatch(handleLoadingButton(true));
      const updateUser = await axios.patch(`${baseURL}/users`, dataRequest, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      thunkAPI.dispatch(handleLoadingButton(false));

      thunkAPI.dispatch(handleLoading(true));
      const { limit, page } = limitOffset;
      const orders = await axios.get(`${baseURL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit,
          page,
        },
      });
      thunkAPI.dispatch(handleLoading(false));
      return orders.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export { createUser, getAccounts, loginUser, updateUser };
