import ButtonAppBar from "./pages/components/Navbar"
import ChildrenDemo from "./pages/childrenDemo"
import React from 'react';
import theme from "./theme";
import { MuiThemeProvider }from '@material-ui/core/styles';
import NoMatch from "./pages/NoMatch"
// import ChildrenDemo from "./pages/childrenDemo/childrenDemo";
import Trainee from "./pages/Trainee/Trainee";
import Login from "./pages/Login";
import { BrowserRouter, Switch, Route, } from 'react-router-dom'
// import InputDemo from "./pages/InputFieldDemo/InputDemo";

const App = () =>
    <MuiThemeProvider theme={theme}>
        <BrowserRouter>
        <Switch>
              <Route exact path='/' component={ButtonAppBar} />
              <Route path='/login' component={Login} />
              <Route path='/about' component={ButtonAppBar} />
              <Route component={NoMatch} />

        </Switch>
        </BrowserRouter>


    </MuiThemeProvider>
  //<ChildrenDemo />
  //<Trainee />
  //<InputDemo>
  //<Login />
  // <br/>
  // <Trainee />


export default App;
