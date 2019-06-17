import React from "react";
import { PrivateLayout } from "../layouts/PrivateLayout/PrivateLayout";
import { Route } from "react-router-dom";
import LocalStorageMethods from "../contexts/snackBarProvider/LocalStorageMethods";
import  { Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, getItem, ...rest}) => {

  if(!getItem("token")) {
    return <Redirect to="/login" />
  }

  return (
    <Route {...rest} render={ matchProps => (

      <PrivateLayout>
          <Component {...matchProps} />
      </PrivateLayout>
    )} />
  )
};


export default LocalStorageMethods(PrivateRoute);
