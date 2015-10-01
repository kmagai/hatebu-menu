import React from 'react'
import Weather from './weather.js'
import _ from 'lodash'

export default class WeatherList extends React.Component {

  render () {
  var onUrlClick = this.props.onUrlClick
    var weatherNodes = _.map(this.props.weathers, function (weather, index) {
      return (
        <li key={index} className='table-view-cell weather'>
          <Weather weather={weather}  className='clickable' onUrlClick={onUrlClick}/>
        </li>
      )
    })
    return (
      <ul className='content table-view'>
        {weatherNodes}
      </ul>
    )
  }
}