// @ts-nocheck
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingPage from '../pages/LoadingPage'; // Import LoadingPage

const AuthRoute = ({ children, routeType }) => {
  const { token } = useSelector((state) => state.userManagement);
  const { isLoadingPage } = useSelector((state) => state.loading);
  const { user } = useSelector((state) => state.userManagement);
  const location = useLocation(); // Import useLocation

  if (isLoadingPage) {
    return <LoadingPage />; // Use LoadingPage component
  }

  if (routeType === 'private' && !token) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (
    routeType === 'private' &&
    user?.role?.roleId == 1 &&
    location.pathname == '/account'
  ) {
    return (
      <Navigate
        to="/product"
        replace
      />
    );
  }

  if (
    routeType === 'private' &&
    user?.role?.roleId === 2 &&
    location.pathname !== '/order'
  ) {
    return (
      <Navigate
        to="/order"
        replace
      />
    );
  }

  if (
    routeType === 'public' &&
    token &&
    ['/login', '/register'].includes(location.pathname)
  ) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return children;
};

export default AuthRoute;
