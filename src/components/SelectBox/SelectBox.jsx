import React, { Component } from 'react';
import { input } from "./style";
import PropTypes from "prop-types";

class SelectBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: props.sports
    };
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  render() {
    const{ sports, onChange }= this.props;

    const sportList = sports.map(name => {
      return <option key={name.value}>{name.label}</option>

    })

    return (
      <select onChange={onChange} style={input}>
        {sportList}
      </select>
    );
  }
}


SelectBox.defaultProps = {
  error: "",
  options: [ {value:"", label:"Select"} ]
}

SelectBox.propTypes = {
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,

  options: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }).isRequired
}

export default SelectBox;
