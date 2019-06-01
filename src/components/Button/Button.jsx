import React, { Component } from 'react'
import  buttonStyles  from './style';

class Button extends Component {
  constructor(props){
    super(props);
    this.state = {
      color: props.color,
      disable: props.disable,
      style: props.style,
      value: props.value,
      onChange: props.onChange
    };
  }

  clickHandler = () =>  {
    console.log("Button Clicked ")
  }

render() {
  const {button}=buttonStyles;
  return (
    <div>
        <input type="button"  disabled={this.state.disable} value={this.state.value} style={button} />
    </div>
  );
}
}

export default Button;
