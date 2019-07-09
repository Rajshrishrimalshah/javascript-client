import React from "react";
import { AuthLayout } from "../layouts/AuthLayout/AuthLayout";
import { Route } from "react-router-dom";

export const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <AuthLayout>
          <Component {...matchProps} />
        </AuthLayout>
      )}
    />
  );
};
