import { Outlet, Navigate, Route } from 'react-router-dom';
import Signup from './Signup';
import { useSelector } from 'react-redux';


const ProtectedRoute = ({ element: Element, ...rest }) => {
    const logger = useSelector((state) => state.user.logger);
  
    if (logger === 0) {
      return <Navigate to="/signup" replace />;
    }
  
    return <Route {...rest} element={<Element />} />;
  };
  
  export default ProtectedRoute;
