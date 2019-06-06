import React, { Component } from 'react';
import Math from "../../components/Math/Math"
import template  from "../../pages/childrenDemo/template";
class childrenDemo extends Component {

  render(){

    return(
    <React.Fragment>
      <Math first={7} second={2} operator="-">
        {template}
      </Math>
  </React.Fragment>
  );
  }
}

export default childrenDemo;
