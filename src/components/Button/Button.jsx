import React, { Component } from "react";
import ButtonStyle from "./style"
class Button extends Component {

  container = {
    backgroundColor: "green",
    border: "1 solid black",
    color: "black",
    padding: 15,
    textAlign: "center",
    display: "inline-block",
    fontSize: 16,
    margin: 4,
    cursor: "pointer"
  };

  render() {
    const { disabled, value, style, ...rest } = this.props;
    const { submitStyle, plainStyle } = ButtonStyle;
    const buttonStyle = disabled ? plainStyle : submitStyle ;
    return (
      <div>

      <button disabled={disabled} style={buttonStyle} {...rest}> {value} </button>

      </div>
    );
  }
}

export default Button;
