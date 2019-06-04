import React, { Component} from "react";
import Button from "@material-ui/core/Button";
import AddDialog from "../Trainee/components/AddDialog/AddDialog";

class Trainee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name:"",
      email:"",
      password:"",
      showPassword: false,
    };
  }

  handleClick = () => {
    const { open } = this.state;
    this.setState({
        open: open ? false : true
      })
  }

  handleDataParent = (name, email, password) => {
    this.setState({
        name,
        email,
        password
      })
      console.log(this.state);
  }

  render() {
    const { open,showPassword } = this.state;

    return (
    <>
    <Button variant="outlined" color="primary" onClick={this.handleClick}>
      Add Trainee
    </Button>
  <AddDialog openProp={open} clickHandler={this.handleClick} handlerFromParent={this.handleDataParent}/>
  </>
  )
}
}

export default Trainee;
