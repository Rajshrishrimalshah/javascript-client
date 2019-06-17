import React from "react";
import { SnackBarConsumer } from "./Context";
export const withSnackBarConsumer = WrappedComponent => {
  const WrapSnackBarConsumer = props => (
    <SnackBarConsumer>
      {({ snackBarOpen }) => {
        const snackBarProps = {
          snackBarOpen
        };
        return <WrappedComponent {...snackBarProps} {...props} />;
      }}
    </SnackBarConsumer>
  );
  return WrapSnackBarConsumer;
};
