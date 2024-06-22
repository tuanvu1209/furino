// @ts-nocheck
import { Navigate, Route, Routes } from 'react-router-dom';
import App from '../App';
import {
  ErrorPage,
  LoginPage,
  OrderManagementPage,
  ProductPage,
  RegisterPage,
  AccountPage,
} from '../pages/index';
import AuthRoute from './AuthRoute';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { getDataProduct, getOrders } from '../store/slices/productManagementSlice/productReduce';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const Routers = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userManagement.user);
  useEffect(() => {
    const socket = io('http://localhost:3001');
    socket.emit('register', user?.userId);
    socket.on('orderInsert', (data) => {
      toast.success('orderInsert');
      dispatch(getOrders());
      dispatch(getDataProduct());
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <Routes>
      <Route
        path='/'
        element={
          <AuthRoute routeType='private'>
            <App />
          </AuthRoute>
        }
      >
        <Route
          path='/'
          element={
            <Navigate
              to='/product'
              replace={true}
            />
          }
        />
        <Route
          path='product'
          element={<ProductPage />}
        />
        <Route
          path='account'
          element={<AccountPage />}
        />
        <Route
          path='order'
          element={<OrderManagementPage />}
        />

        <Route
          path='*'
          element={<ErrorPage />}
        />
      </Route>

      <Route
        path='/login'
        element={
          <AuthRoute routeType='public'>
            <LoginPage />
          </AuthRoute>
        }
      />

      <Route
        path='/register'
        element={
          <AuthRoute routeType='public'>
            <RegisterPage />
          </AuthRoute>
        }
      />
    </Routes>
  );
};

export default Routers;
