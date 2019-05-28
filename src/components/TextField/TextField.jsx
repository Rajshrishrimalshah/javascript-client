import React from "react";

import * as style from "./style";

export const InputBox = props => {
  // eslint-disable-next-line no-console

  console.log(props);

  // eslint-disable-next-line react/prop-types

  const { value, error, disabled } = props;

  const { border, input } = style;

  const err = { ...border, ...input };

  const errorStyle = error ? err : input;

  if (error) {
    return (
      <div>
        <input type="text" style={errorStyle} defaultValue={value} />
      </div>
    );
  }

  return (
    <input
      type="text"
      style={errorStyle}
      defaultValue={value}
      disabled={disabled}
    />
  );
};
