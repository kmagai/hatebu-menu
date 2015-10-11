import React, { Component, PropTypes } from 'react';

export default class Picker extends Component {
  render () {
    const { value, onChange, options } = this.props;
    
    
    // let class = 
    let navNodes = Object.keys(options).map(type =>
      // if (this.state.selected === selection) {
      //   className = className + ' active'
      // }
        <a className="control-item active" href="#item1mobile">{options[type]}</a>
    );
  // <a class="control-item" href="#item2mobile">
  //   Thing two
  // </a>
  // <a class="control-item" href="#item3mobile">
  //   Thing three
  // </a>
        
    return (
      <span>
        <h1>{value}</h1>
        <div className="segmented-control">
          {navNodes}
        </div>
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
