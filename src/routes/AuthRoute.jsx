import React from "react";
import { AuthLayout } from "../layouts/AuthLayout/AuthLayout";
import { Route } from "react-router-dom";
import LocalStorageMethods from "../contexts/snackBarProvider/LocalStorageMethods"
import  { Redirect } from 'react-router-dom';

const AuthRoute = ({component: Component, getItem,  ...rest}) => {
  console.log('props', {...rest});
  if(getItem("token")) {
    return <Redirect to="/trainee" />
  }
  return (
    <Route {...rest} render={ matchProps => (

      <AuthLayout>
          <Component {...matchProps} />
      </AuthLayout>
    )} />
  )
};

export default LocalStorageMethods(AuthRoute);

