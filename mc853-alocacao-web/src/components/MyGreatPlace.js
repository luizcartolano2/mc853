import React, {PropTypes, Component} from 'react';

import {greatPlaceStyle} from './../styles/MyGreatPlace';

export default class MyGreatPlace extends Component {
  static defaultProps = {};

  render() {
    return (
       <div style={greatPlaceStyle}>
          {this.props.text}
       </div>
    );
  }
}