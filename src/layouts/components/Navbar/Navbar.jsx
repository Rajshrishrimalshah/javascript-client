import AppBar from "@material-ui/core/AppBar";
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const style = theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
});

class ButtonAppBar extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Trainee Portal
            </Typography>

            <Link to="/trainee">
              <Button>
                Trainee
              </Button>
            </Link>

            <Link to="/textFieldDemo">
              <Button>
                TEXTFIELD DEMO
              </Button>
            </Link>

            <Link to="/inputDemo">
              <Button>
                INPUT DEMO
              </Button>
            </Link>

            <Link to="/childrenDemo">
              <Button>
                children DEMO
              </Button>
            </Link>

            <Button color="inherit">LOGOUT</Button>

          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(style)(ButtonAppBar);
