/* eslint-disable no-unused-vars */
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import AuthRoute from "./routes/AuthRoute";
import axios from "axios";
import ChildrenDemo from "./pages/childrenDemo";
import InputDemo from "./pages/InputFieldDemo";
import NoMatch from "./pages/NoMatch";
import React from "react";
import theme from "./theme";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Trainee from "./pages/Trainee/Trainee";
import Login from "./pages/Login";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import TextFieldDemo from "./pages/TextFieldDemo";
import TraineeList from "./pages/Trainee/TraineeList";
import SimpleSnackbar from "./contexts/snackBarProvider/snackBarProvider";

const token = localStorage.getItem("token");

axios.interceptors.request.use(
  config => {
    config.headers = { Authorization: token };
    return config;
  },
  error => Promise.reject(error)
);

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  headers: {
    Authorization: localStorage.getItem("token")
  }
});

const App = () => (
  <ApolloProvider client={client}>
    <SimpleSnackbar>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <PrivateRoute exact path="/trainee" component={Trainee} />
            <PrivateRoute
              exact
              path="/textFieldDemo"
              component={TextFieldDemo}
            />
            <PrivateRoute exact path="/inputDemo" component={InputDemo} />
            <PrivateRoute exact path="/childrenDemo" component={ChildrenDemo} />
            <PrivateRoute path="/trainee" component={Trainee} />

            <AuthRoute exact path="/login" component={Login} />
            <PrivateRoute exact path="/" component={Trainee} />
            <Route component={NoMatch} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </SimpleSnackbar>
  </ApolloProvider>
);

export default App;
