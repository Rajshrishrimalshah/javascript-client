import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Mail from "@material-ui/icons/Mail";
import TextField from '@material-ui/core/TextField';
import validationSchema from "./components/AddDialog/ValidationSchema";
import Paper from '@material-ui/core/Paper';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      errors: {},
      isTouch: [],
      button: true,
      showPassword: false,
    };
  }

  handleNameChange = event => {
    this.setState({ name: event.target.value }, this.handleValidator);
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value }, this.handleValidator);
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value }, this.handleValidator);
  };

  handleConfirmPasswordChange = event => {
    this.setState({ confirm_password: event.target.value }, this.handleValidator);
  };

  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };


  handleValidator = () => {
    let ErrorObj = {};
    const { name, email, password, confirm_password  } = this.state;
    const valid = validationSchema
      .validate({ name, email, password, confirm_password }, { abortEarly: false })
      .then(success => {
        this.setState({
          errors: {},
          button: false
        });
      })
      .catch(error => {
        error.inner.forEach(key => {
          if (!ErrorObj[key.path]) {
            ErrorObj[key.path] = key.message;
          }
        });
        this.setState({
          errors: ErrorObj,
          button: true,
        });
      });
  };

  passwordValidation= () => {
    const { password, confirm_password } = this.state;
    if ( password !== confirm_password) {
        return "Password is not matching";
    }
    return null;
  };

  hasErrors = value => {
    const { errors } = this.state;
    return errors[value];
  };

  isTouched = value => {
    const { isTouch } = this.state;
    return isTouch.includes(value);
  };

  getError = value => {
    const { errors } = this.state;
    if (this.isTouched(value) && this.hasErrors(value)) {
      return errors[value];
    }
    return "";
  };

  getErrorBool = value => {
    if (this.isTouched(value) && this.hasErrors(value)) {
      return true;
    }
    return false;
  };

  blurHandler = event => () => {
    const { isTouch } = this.state;
    if (!isTouch.includes(event)) {
      isTouch.push(event);
    }
    this.setState(
      {
        isTouch
      },
      this.handleValidator
    );
  };

render() {
  const { showPassword } = this.state;
  return (
       <Paper>
      <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextField
                  required
                  id="outlined-required"
                  label="Name"
                  defaultValue=""
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  onChange={this.handleNameChange}
                  error={this.getError("name")}
                  onBlur={this.blurHandler("name")}
                  helperText={this.getError("name")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
              />
            </Grid>

            <Grid item xs={12}>
                <TextField
                  required
                  id="outlined-required"
                  label="Email Address"
                  defaultValue=""
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  onChange={this.handleEmailChange}
                  error={this.getErrorBool("email")}
                  onBlur={this.blurHandler("email")}
                  helperText={this.getError("email")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail />
                      </InputAdornment>
                    ),
                  }}

              />
            </Grid>

            <Grid item xs={6}>

                <TextField
                  id="outlined-adornment-password"
                  variant="outlined"
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  onChange={this.handlePasswordChange}
                  error={this.getErrorBool("password")}
                  onBlur={this.blurHandler("password")}
                  helperText={this.getError("password")}
                  InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                edge="start"
                aria-label="Toggle password visibility"
                onClick={this.handleClickShowPassword}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        />
            </Grid>

            <Grid item xs={6}>
            <TextField
                  id="outlined-adornment-password"
                  variant="outlined"
                  type={showPassword ? 'text' : 'password'}
                  label="Confirm Password"
                  onChange={this.handleConfirmPasswordChange}
                  error={this.getErrorBool("confirm_password")}
                  onBlur={this.blurHandler("confirm_password")}
                  helperText={this.getError("confirm_password") || this.passwordValidation}
                  InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                edge="start"
                aria-label="Toggle password visibility"
                onClick={this.handleClickShowPassword}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
            />
            </Grid>
            </Grid>
            </Paper>
);
}
}

export default Form;
