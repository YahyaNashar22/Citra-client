import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import NotFound from "../pages/NotFound/NotFound";
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <NotFound />;
  console.log("userr info from context" + user);
  if (!user) {
    return <NotFound />;
  }
  const isAdmin = (user && user.Role === "admin") || user.Role === "dataEntry";
  console.log(isAdmin);
  return isAdmin ? children : <NotFound />;
};
export default ProtectedRoute;
