import React from "react";

import { InputBox } from "../../components/TextField/TextField";
import  Slider  from "../../components/Slider/SilderComponent";
import { banner} from "../../configs/constant";



const TextFieldDemo = () => (
<>
  <div style = {{
    display:"flex",
    justifyContent:"center"
  }}>
  <Slider
  altText = "Default Banner"
  banner={banner}
  defaultBanner = '../../../public/images/default.png'
  duration = {2000}
  height = "200px"
  random = {false}
   />


  </div>

  <div
    style= {{
      border: "1px solid ",
      margin: "100px 100px",
      padding: "5px 5px"
    }}
  >
    <h4>This is Disabled Input</h4>
    <InputBox value="Disable Input" disabled />

    <h4>A valid box</h4>
    <InputBox value="Accessible" />

    <h4>input with an error</h4>
    <InputBox value="101" error="101" />
    <p style={{ color: "red" }}>could not be greater than</p>

  </div>


</>
);

export default TextFieldDemo;
