import {Outlet,Navigate} from'react-router';
import Signup from './Signup';
import {useDispatch,useSelector} from "react-redux";

const ProtectedRoute = () => {
    const logger = useSelector(state=>state.user.logger);
    return logger===0?<Outlet/>:<Navigate to="/signup" />
}
export default ProtectedRoute;
