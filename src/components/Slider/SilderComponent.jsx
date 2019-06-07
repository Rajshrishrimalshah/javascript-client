import React, { Component } from "react";
import { getRandomNumber, getNextRoundRobin } from "../../lib/utils/math";
import * as style from "./style";
import { PUBLIC_IMAGE_FOLDER } from "../../configs/constant";

const { align } = style;
class Slider extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      max: props.banner.length,
      current: 0,
      random: props.random,
      banner: props.banner,
      height: props.height,
      defaultBanner: props.defaultBanner
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 2000);
  }

  componentWillUmount() {
    clearInterval(this.timerID);
  }

  tick() {
    const { max, random, current } = this.state;
    this.setState({
      current: random ? getRandomNumber(max) : getNextRoundRobin(max, current)
    });
  }

  render() {
    const { current, banner, altText, height, defaultBanner } = this.state;
    return (
      <div style={{ align }}>
        <img
          src={PUBLIC_IMAGE_FOLDER + banner[current] || defaultBanner}
          alt={altText}
          height={height}
        />
      </div>
    );
  }
}

export default Slider;
