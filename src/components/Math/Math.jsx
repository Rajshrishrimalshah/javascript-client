import React, { Component } from 'react'

class Math extends Component {

  calculator = (num1,operator,num2) => {
    switch(operator) {
    case '+' : return num1 + num2;
                break;

    case '-' : return num1 - num2;
                break;

    case '*' : return num1 * num2;
                break;

    case '/' : if(num === 2)
                  return "Infinity"

                return num1 / num2;
                break;

    default : return "Incorrect Choice"

    }

  }

  render() {

    return(

    );
  }
}
