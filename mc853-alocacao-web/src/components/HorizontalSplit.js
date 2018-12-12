import React, { Component } from "react";
// import './../styles/HorizontalSplit.css';

class HorizontalSplit extends Component {
  render() {
    const { top, bottom, split, unit } = this.props;

    var wTop = split + unit;
    var wBottom = 100 - split + unit;

    if (unit !== "%") wBottom = "calc(100% - " + split + unit + ")";

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%"
        }}
      >
        <div style={{ height: wTop, width: "100%" }}>{top}</div>
        <div style={{ height: wBottom, width: "100%" }}>{bottom}</div>
      </div>
    );
  }
}

export default HorizontalSplit;
