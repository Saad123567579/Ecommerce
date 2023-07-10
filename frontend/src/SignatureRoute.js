import { Outlet, Navigate, Route } from 'react-router-dom';
import Signup from './Signup';
import { useSelector } from 'react-redux';

const SignatureRoute = () => {
  const logger = useSelector((state) => state.user.logger);
  return logger === 1 ? <Outlet /> : <Navigate to="/" />;
};

export default SignatureRoute;