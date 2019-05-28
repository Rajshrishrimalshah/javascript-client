import React from "react";

import { InputBox } from "../../components/TextField/TextField";

const TextFieldDemo = () => (
  <div
    style={{
      border: "1px solid ",
      margin: "40px 40px",
      padding: "5px 5px"
    }}
  >
    <h4>This is Disabled Input</h4>

    <InputBox value="disable" disabled />

    <h4>A valid box</h4>

    <InputBox value="accessible" />

    <h4>input with an error</h4>

    <InputBox value="101" error="101" />

    <p style={{ color: "red" }}>could not be greater than</p>
  </div>
);

export default TextFieldDemo;
