import React  from "react";

const SnackBarContext = React.createContext();
export const SnackBarProvider = SnackBarContext.Provider;
export const SnackBarConsumer = SnackBarContext.Consumer;
