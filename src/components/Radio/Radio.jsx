import React, { Component } from "react";
import PropTypes from "prop-types";

class Radio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: props.player
    };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { options, onChange, name, error, ...rest } = this.props;
    const radioOptions = options.map(({ label, value }) => (
      <div>
        <>
          <React.Fragment key={value}>
            <input
              type="radio"
              value={value}
              name={name}
              onChange={onChange}
              {...rest}
            />
            {label}
            <br />
          </React.Fragment>
        </>
      </div>
    ));

    return (
      <>
        {radioOptions}
        {error ? <span style={{ color: "red" }}> {error}</span> : ""}
      </>
    );
  }
}

Radio.defaultProps = {
  error: "",
  options: []
};

Radio.propTypes = {
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,

  options: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  }).isRequired
};

export default Radio;
