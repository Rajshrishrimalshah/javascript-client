import React, { Component } from "react";
import { input } from "./style";
import PropTypes from "prop-types";

class SelectBox extends Component {
  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { sports, onChange, error, name, onBlur, ...rest } = this.props;

    const sportList = sports.map(name => {
      return (
        <option value={name.value} key={name.value}>
          {name.label}
        </option>
      );
    });

    return (
      <>
        <select onChange={onChange} style={input} onBlur={onBlur} {...rest}>
          {sportList}
        </select>
        {error ? <span style={{ color: "red" }}> {error}</span> : ""}
      </>
    );
  }
}

SelectBox.defaultProps = {
  error: "",
  options: [{ value: "", label: "Select" }]
};

SelectBox.propTypes = {
  error: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,

  options: PropTypes.array.isRequired
  // options: PropTypes.shape({
  //   label: PropTypes.string,
  //   value: PropTypes.string
  // }).isRequired
};

export default SelectBox;
