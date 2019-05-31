import React, { Component } from 'react';
import PropTypes from "prop-types";


class Radio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: props.player
    };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  render() {
    console.log(this.props.player)

    const { options, onChange, name, value } = this.props;
    console.log(value);
    const radioOptions = options.map(({ label, value}) => (
      <React.Fragment key={value} >
        <input type="radio" value={value} name={name} onChange={onChange} />
        {label}
        <br />
      </React.Fragment>
    ));
  return radioOptions;
}
}

Radio.defaultProps = {
  error: "",
  options: []
}

Radio.propTypes = {
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,

  options: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }).isRequired
}

export default Radio;

