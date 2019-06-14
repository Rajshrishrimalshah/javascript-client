import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LocalStorageMethods from "../../../contexts/snackBarProvider/LocalStorageMethods";
import  { Redirect } from 'react-router-dom';

const style = theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  link: {
    color: "white"
  },
  visited: {
    color: "green"
  },
  hover: {
    color: "hotpink"
  },
  active: {
    color: "blue"
  }
});

class ButtonAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logoutRedirect: false,
    };
  }

  handleLogout = () => {
    const { deleteItem } = this.props;
    deleteItem("token");
    this.setState({
      logoutRedirect: true,
    });
    }




  render() {

    const { classes } = this.props;
    const { logoutRedirect } = this.state;


  if(logoutRedirect){
    return <Redirect to="/login" />
  }

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Trainee Portal
            </Typography>

            <Link to="/trainee">
              <Button className={classes.link}>
                Trainee
              </Button>
            </Link>

            <Link to="/textFieldDemo">
              <Button  className={classes.link}>
                TEXTFIELD DEMO
              </Button>
            </Link>

            <Link to="/inputDemo">
              <Button className={classes.link}>
                INPUT DEMO
              </Button>
            </Link>

            <Link to="/childrenDemo">
              <Button className={classes.link}>
                children DEMO
              </Button>
            </Link>

            <Button className={classes.link} onClick={ this.handleLogout}>LOGOUT</Button>

          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default LocalStorageMethods(withStyles(style)(ButtonAppBar));
