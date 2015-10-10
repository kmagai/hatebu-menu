import React, { Component, PropTypes } from 'react';

export default class Picker extends Component {
  render () {
    const { value, onChange, options } = this.props;
        
    return (
      <span>
        <h1>{value}</h1>
        <select onChange={e => onChange(e.target.value)}
                value={value}>
          {Object.keys(options).map(type =>
            <option value={type} key={type}>
            {options[type]}
            </option>)
          }
        </select>
      </span>
              );
  }
}

Picker.propTypes = {
  options: PropTypes.objectOf(
    PropTypes.string.isRequired
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
