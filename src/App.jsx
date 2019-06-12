import { AuthRoute } from "./routes/AuthRoute"
import ChildrenDemo from "./pages/childrenDemo";
import InputDemo from "./pages/InputFieldDemo"
import NoMatch from "./pages/NoMatch"
import React from 'react';
import theme from "./theme";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Trainee from "./pages/Trainee/Trainee";
import Login from "./pages/Login";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./routes/PrivateRoute";
import TextFieldDemo from "./pages/TextFieldDemo";
import TraineeList from "./pages/Trainee/TraineeList";
import SimpleSnackbar from "./contexts/snackBarProvider/snackBarProvider"

const App = () =>

        <SimpleSnackbar>
            <MuiThemeProvider theme={theme}>
                  <BrowserRouter>
                  <Switch>

                <PrivateRoute exact path="/trainee" component={Trainee}/>
                    <PrivateRoute exact path="/textFieldDemo" component={TextFieldDemo}/>
                    <PrivateRoute exact path="/inputDemo" component={InputDemo}/>
                    <PrivateRoute exact path="/childrenDemo" component={ChildrenDemo}/>
                <PrivateRoute path="/trainee" component={Trainee}/>

                    <AuthRoute exact path="/login" component={Login}/>
                    <PrivateRoute exact path="/" component={Trainee} />
                    <Route component={NoMatch}/>


                  </Switch>
                  </BrowserRouter>
                </MuiThemeProvider>
        </SimpleSnackbar>




export default App;
