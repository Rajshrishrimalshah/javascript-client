import React from 'react';
import theme from "./theme";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import InputDemo from "./pages/InputFieldDemo/InputDemo";

const App = () =>
  <MuiThemeProvider  theme={theme}>
      <InputDemo />
  </MuiThemeProvider>

export default App;
