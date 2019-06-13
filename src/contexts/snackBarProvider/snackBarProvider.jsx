/* eslint-disable no-unused-vars */
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { SnackBarProvider } from "./Context";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import { amber, green } from "@material-ui/core/colors";
import { SnackbarContent } from "@material-ui/core";

//export const SnackBarContext = React.createContext();

const statusIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const styles = theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconStatus: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});

class SimpleSnackbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: "",
      variant: ""
    };
  }

  SnackBarContent = () => {
    const { classes } = this.props;
    const { message, variant } = this.state;
    const Icon = statusIcon[variant];

    return (
      <SnackbarContent
        className={classes[variant]}
        message={
          <span className={classes.message}>
            <Icon className={classes.iconStatus} />
            {message}
          </span>
        }
        action={[
          <IconButton key="close" color="inherit" onClick={this.handleClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>
        ]}
      />
    );
  };

  snackBarOpen = (message, variant) => {
    // const { message } = this.state;
    this.setState({
      open: true,
      message,
      variant
    });
  };

  snackBarClose = () => {
    this.setState({
      open: false
    });
  };

  handleClose = (event, reason) => {
    this.setState({
      open: false
    });
  };

  getVariantClass = variant => {
    const { classes } = this.props;
    return classes[variant];
  };

  render() {
    const { open, variant, message } = this.state;
    const { children, classes } = this.props;

    return (
      <>
        <SnackBarProvider
          value={{
            snackBarOpen: this.snackBarOpen
          }}
        >
          {children}
        </SnackBarProvider>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={open}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          {this.SnackBarContent(variant, message)}
        </Snackbar>
      </>
    );
  }
}

export default withStyles(styles)(SimpleSnackbar);
