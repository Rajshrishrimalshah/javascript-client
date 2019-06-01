import React, { Component } from "react";
import * as buttonStyles from "./style";

class Button extends Component {

  clickHandler = () => {
    console.log("Button Clicked ");
  };

  render() {
    const { input, submitStyle } = buttonStyles;
    const { disabled, value, ...rest } = this.props;
    const buttonStyle = disabled ? input : submitStyle;
    return (
      <div>

      <button disabled={disabled} style={submitStyle} {...rest}> {value} </button>

      </div>
    );
  }
}

export default Button;
