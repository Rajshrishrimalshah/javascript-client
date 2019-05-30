import React, { Component } from 'react';
import { input } from "./style";

class SelectBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sports: props.sports
    };
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  render() {
    const{ sports, onChange }= this.props;

    const sportList = sports.map(name => {
      return <option value={name}>{name}</option>

    })

    return (
      <select onChange={onChange} style={input}>
        {sportList}
      </select>
    );
  }
}


export default SelectBox;
