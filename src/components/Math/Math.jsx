import React, { Component } from 'react'

class Math extends Component {
  calculator = (num1,operator,num2) => {
    switch(operator) {
    case '+' : return num1 + num2;
    case '-' : return num1 - num2;
    case '*' : return num1 * num2;
    case '/' : if(num2 === 0)
                return "Infinity"

                return num1 / num2;

    default : return "Incorrect Operation"
    }
  }

  render() {
    const { first, second, operator, children } = this.props;
    const result = this.calculator(first,operator,second);
    return(
      React.cloneElement(children(result))
    );
  }
}

export default Math;
