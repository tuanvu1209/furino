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

const Routers = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRoute routeType="private">
            <App />
          </AuthRoute>
        }
      >
        <Route
          path="/"
          element={
            <Navigate
              to="/product"
              replace={true}
            />
          }
        />
        <Route
          path="product"
          element={<ProductPage />}
        />
        <Route
          path="account"
          element={<AccountPage />}
        />
        <Route
          path="order"
          element={<OrderManagementPage />}
        />

        <Route
          path="*"
          element={<ErrorPage />}
        />
      </Route>

      <Route
        path="/login"
        element={
          <AuthRoute routeType="public">
            <LoginPage />
          </AuthRoute>
        }
      />

      <Route
        path="/register"
        element={
          <AuthRoute routeType="public">
            <RegisterPage />
          </AuthRoute>
        }
      />
    </Routes>
  );
};

export default Routers;
