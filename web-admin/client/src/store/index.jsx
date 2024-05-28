import { configureStore } from '@reduxjs/toolkit';
import productManagementReducer from './slices/productManagementSlice/productManagementSlice';
import userManagementReducer from './slices/userManagementSlice/userManagementSlice';
import leftMenuReducer from './slices/leftMenuSlice';
import loadingReducer from './slices/loadingSlice';

const store = configureStore({
  reducer: {
    productManagement: productManagementReducer,
    userManagement: userManagementReducer,
    loading: loadingReducer,
    leftMenu: leftMenuReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
