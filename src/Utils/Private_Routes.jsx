import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";

const Private_Routes = () => {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  return cookies?.Access_Token ? <Outlet /> : <Navigate to="/" />;
};

export default Private_Routes;
