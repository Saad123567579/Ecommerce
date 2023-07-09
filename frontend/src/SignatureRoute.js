import {Outlet,Navigate} from'react-router';
import Signup from './Signup';
import {useDispatch,useSelector} from "react-redux";

const SignatureRoute = () => {
    const logger = useSelector(state=>state.user.logger);
    return logger===1?<Outlet/>:<Navigate to="/" />
}
export default SignatureRoute;
