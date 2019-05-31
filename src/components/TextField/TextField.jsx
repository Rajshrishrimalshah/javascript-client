import React from "react";
import PropTypes from "prop-types";

import * as style from "./style";

export const InputBox = props => {
  console.log(props);

  const { error, ...rest } = props;
  const { border, input } = style;
  const err = { ...border, ...input };
  const errorStyle = error ? err : input;



  return (
    <input type="text" style={errorStyle} {...rest} />
  );
};

InputBox.defaultProps = {
  error: "",
}

InputBox.propTypes = {
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}
