import React from "react";
import { InputBox } from "../../components/TextField/TextField";
import SelectBox from "../../components/SelectBox/SelectBox";
import {
  SPORTS,
  CRICKET_PLAYER,
  FOOTBALL_PLAYER
} from "../../configs/constant";
import RadioButton from "../../components/Radio/Radio";
import Button from "../../components/Button/Button";
import { validationSchema } from "../validationSchema";

class InputDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      sports: "",
      Cricket: "",
      Football: "",
      errors: {},
      isTouch: [],
      button: true,
    };
  }

  handleChange = event => {
    this.setState({ name: event.target.value }, this.handleValidator);
  };

  handleSportsChange = event => {
    this.setState({ sports: event.target.value }, this.handleValidator);
  };

  handleCricketChange = event => {
    this.setState({ Cricket: event.target.value });
  };

  handleFootballChange = event => {
    this.setState({ Football: event.target.value });
  };
  0;
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

  handleValidator = () => {
    let ErrorObj = {};
    const { name, sports } = this.state;
    const valid = validationSchema
      .validate({ name, sports }, { abortEarly: false })
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

  container = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: "20"
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
  renderOptions = () => {
    const { sports } = this.state;

    if (!sports) {
      return null;
    }

    if (sports === "cricket") {
      return (
        <>
          <h4> What you do ?</h4>
          <RadioButton
            options={CRICKET_PLAYER}
            name="role"
            onChange={this.handleCricketChange}
            error={this.hasErrors("role")}
            onBlur={this.blurHandler}
          />
        </>
      );
    }

    if (sports === "football") {
      return (
        <>
          <h4> What you do ?</h4>
          <RadioButton
            options={FOOTBALL_PLAYER}
            name="role"
            onChange={this.handleFootballChange}
            error={this.hasErrors("role")}
            onBlur={this.blurHandler}
          />
        </>
      );
    }
  };

  render() {
    console.log(this.state);
    const { button  } = this.state;

    return (
      <>
        <div>
          <h4> Name: </h4>
          <InputBox
            value={this.state.name}
            name="name"
            onChange={this.handleChange}
            error={this.getError("name")}
            onBlur={this.blurHandler("name")}
          />
        </div>

        <div>
          <h4> Select the game you play? </h4>
          <SelectBox
            name="sports"
            sports={SPORTS}
            onChange={this.handleSportsChange}
            error={this.getError("sports")}
            onBlur={this.blurHandler("sports")}
          />
        </div>

        {this.renderOptions()}

        <div style={this.container}>
          <Button
            color="green"
            style={{ margin: "5px" }}
            value="Cancel"
            onclick={this.handleCancelChange}
          />

          <Button
            color="green"
            disabled={button}
            style={{ margin: "5px" }}
            value="Submit"
            onclick={this.handleSubmitChange}
          />
        </div>
      </>
    );
  }
}

export default InputDemo;
