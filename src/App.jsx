import React from 'react';
import theme from "./theme";
import { MuiThemeProvider }from '@material-ui/core/styles';
import ChildrenDemo from "./pages/childrenDemo/childrenDemo";

// import InputDemo from "./pages/InputFieldDemo/InputDemo";

const App = () =>
  <MuiThemeProvider  theme={theme}>
      <ChildrenDemo />
      {/* <InputDemo /> */}
  </MuiThemeProvider>

export default App;
