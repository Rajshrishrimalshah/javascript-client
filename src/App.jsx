import ButtonAppBar from "./pages/components/Navbar"
import ChildrenDemo from "./pages/childrenDemo"
import React from 'react';
import theme from "./theme";
import { MuiThemeProvider }from '@material-ui/core/styles';
// import ChildrenDemo from "./pages/childrenDemo/childrenDemo";
import Trainee from "./pages/Trainee/Trainee";
import Login from "./pages/Login";
// import InputDemo from "./pages/InputFieldDemo/InputDemo";

const App = () =>
    <MuiThemeProvider theme={theme}>
      <ButtonAppBar />
      <br/>
      <Trainee />
    </MuiThemeProvider>
  //<ChildrenDemo />
  //<Trainee />
  //<InputDemo>
  //<Login />


export default App;
