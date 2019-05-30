import React from "react";
import { InputBox } from "../../components/TextField/TextField";
import SelectBox from "../../components/SelectBox/SelectBox";
import {
  SPORTS,
  CRICKET_PLAYER,
  FOOTBALL_PLAYER
} from "../../configs/constant";
import RadioButton from "../../components/Radio/Radio";

class InputDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", sports: "", Cricket: "", Football: "" };
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  handleSportsChange = event => {
    this.setState({ sports: event.target.value });
  };

  handleCricketChange = (event) => {
    this.setState({Cricket: event.target.value});
  }

  handleFootballChange = (event) => {
    this.setState({Football: event.target.value});
  }

  renderOptions = () => {
    const { sports } = this.state;

    if (!sports) {
      return null;
    }

    if (sports === "Cricket") {
      return <RadioButton options={CRICKET_PLAYER} name="role" onChange={this.handleCricketChange} />;
    }

    if (sports === "Football") {
      return <RadioButton options={FOOTBALL_PLAYER} name="role" onChange={this.handleFootballChange } />;
    }
  };

  render() {
    console.log(this.state);
    return (
      <>
        <div>
          <h4> Name: </h4>
          <InputBox value={this.state.name} onChange={this.handleChange} />
        </div>

        <div>
          <h4> Select the game you play? </h4>
          <SelectBox sports={SPORTS} onChange={this.handleSportsChange} />
        </div>

        {this.renderOptions()}
      </>
    );
  }
}
export default InputDemo;
