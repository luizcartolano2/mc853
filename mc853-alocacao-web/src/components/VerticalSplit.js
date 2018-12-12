import React, { Component } from "react";
// import './../styles/VerticalSplit.css';

class VerticalSplit extends Component {
  render() {
    const { left, right, split, unit } = this.props;

    var wLeft = split + unit;
    var wRight = 100 - split + unit;

    if (unit !== "%") wRight = "calc(100% - " + split + unit + ")";

    return (
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ width: wLeft, height: "100%" }}>{left}</div>
        <div style={{ width: wRight, height: "100%" }}>{right}</div>
      </div>
    );
  }
}

export default VerticalSplit;
