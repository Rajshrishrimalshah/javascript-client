import React, { Component } from 'react';
import Math from "../../components/Math/Math"
import template  from "../../pages/childrenDemo/template";
class childrenDemo extends Component {

  render(){

    return(
    <React.Fragment>
      <Math first={1} second={2} operator="+">
        {template}
      </Math>

      <Math first={1} second={2} operator="-">
        {template}
      </Math>

      <Math first={1} second={2} operator="*">
        {template}
      </Math>

      <Math first={1} second={2} operator="^">
        {template}
      </Math>

      <Math first={1} second={4} operator="+">
        {template}
      </Math>
  </React.Fragment>
  );
  }
}

export default childrenDemo;
