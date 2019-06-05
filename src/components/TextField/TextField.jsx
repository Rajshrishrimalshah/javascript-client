import React from "react";

import * as style from "./style";

export const InputBox = props => {
  console.log(props);

  const { value, error, disabled } = props;
  const { border, input } = style;
  const err = { ...border, ...input };
  const errorStyle = error ? err : input;



  return (
    <input type="text" style={errorStyle} defaultValue={value} disabled={disabled}
    />
  );
};
