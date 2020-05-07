import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  let render = null;
  if (!currentUser) {
    render = <Redirect to={"/login"} />;
  }

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        render === null ? <RouteComponent {...routeProps} /> : render
      }
    />
  );
};

export default PrivateRoute;
