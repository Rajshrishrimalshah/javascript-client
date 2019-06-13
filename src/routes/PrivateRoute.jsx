import React from "react";
import { PrivateLayout } from "../layouts/PrivateLayout/PrivateLayout";
import { Route } from "react-router-dom"

export const PrivateRoute = ({component: Component, ...rest}) => {

  return (
    <Route {...rest} render={ matchProps => (

      <PrivateLayout>
          <Component {...matchProps} />
      </PrivateLayout>
    )} />
  )
};
