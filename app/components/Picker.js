import React, { Component, PropTypes } from 'react';
import {ICONS} from '../constants/Categories';
import FontAwesome from 'react-fontawesome';

export default class Picker extends Component {
  render () {
    const { value, onClick, options } = this.props;
    
    
    let navNodes = Object.keys(options).map(type => {
      var controlItemClass = 'control-item';
      if (type === value) {
        controlItemClass = controlItemClass + ' active'
      }
      var iconTab = (<FontAwesome name={ICONS[type]} />);
      return (<a className={controlItemClass} href="#item1mobile" onClick={e => onClick(e, type)}>{iconTab}</a>);
      }
    );
    return (
        <div className="segmented-control">
          {navNodes}
        </div>
    );
  }
}

Picker.propTypes = {
  options: PropTypes.objectOf(
    PropTypes.string.isRequired
  ).isRequired,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
