/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import TraineeList from "./TraineeList";
import TraineeDetails from "./TraineeDetail";
import { withSnackBarConsumer } from "../../contexts/snackBarProvider/withSnackBarConsumer";

class Trainee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      user: {
        name: "",
        email: "",
        password: ""
      }
    };
  }

  handleClick = () => {
    const { open } = this.state;
    this.setState({
      open: open ? false : true
    });
  };

  render() {
    //  const { open } = this.state;
    const { match } = this.props;
    return (
      <Switch>
        <Route exact path={match.url} component={TraineeList} />
        <Route exact path={`${match.url}/:id`} component={TraineeDetails} />
      </Switch>
    );
  }
}

export default Trainee;
