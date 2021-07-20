import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  return (
    <div style={{ margin: "0 10% 0 10%" }}>
      <Route
        {...rest}
        render={(props) =>
          !isAuthenticated ? <Redirect to="/" /> : <Component {...props} />
        }
      />
    </div>
  );
};
export default PrivateRoute;
