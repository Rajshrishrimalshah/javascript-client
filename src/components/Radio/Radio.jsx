import React, { Component } from 'react';


class Radio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: props.player
    };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  render() {
    console.log(this.props.player)

    const { options, onChange, name } = this.props;

    const radioOptions = options.map(({ label, value: val }) => (
      <React.Fragment key={val} >
        <input type="radio" value={val} name={name} onChange={onChange} />
        {label}
        <br />
      </React.Fragment>
    ));
  return radioOptions;
}
}

export default Radio;

