import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import AddDialog from "../Trainee/components/AddDialog/AddDialog";
import Form from "../Trainee/Form";
import { Switch, Route } from 'react-router-dom';
import TraineeList from "./TraineeList";
import TraineeDetails  from "./TraineeDetail";

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

  handleDataParent = (name, email, password) => event => {
    const { user, open } = this.state;
    user["name"] = name;
    user["email"] = email;
    user["password"] = password;
    this.setState({
      open: open ? false : true,
      user
    });

    console.log(this.state.user);

  };

  render() {
    const { open } = this.state;
    const { match } = this.props;
    return (
      <Switch>
        <Route exact path={match.url} component={TraineeList} />
        <Route exact path={`${match.url}/:id`} component={TraineeDetails} />
      </Switch>

      // <>
      //   <Button variant="outlined" color="primary" onClick={this.handleClick}>
      //     Add Trainee
      //   </Button>
      //   <AddDialog openProp={open} clickHandler={this.handleClick}>
      //     <Form handlerFromParent={this.handleDataParent} clickHandler={this.handleClick} />
      //   </AddDialog>
      // </>
    );
  }
}

export default Trainee;
