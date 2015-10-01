import React from 'react'
import _ from 'lodash'
import Client from 'electron-rpc/client'
import WeatherList from './weather_list.js'
import Choose from './choose.js'

// introducing redux
import { connect, createStore } from 'react-redux'
import { increment, decrement, async_increment } from '../actions/counter'

export default class WeatherBox extends React.Component {
  constructor (props) {
    super (props)
    this.state = {}
    this.state.weathers = [{'place': 'Tokyo', 'condition': 'rainy', 'time': 12, 'detail_url': 'http://www.yahoo.co.jp/'}, {'place': 'Tokyo', 'condition': 'sunny', 'time': 11, 'detail_url': 'http://www.yahoo.co.jp/'}]
    this.client = new Client()
  }
  
  onUrlClick(url) {
    this.client.request('open-url', {
      url: url
    })
  }
  
  render() {
    var content = null
    if (_.isEmpty(this.state.weathers)) {
      content = <Choose />
    } else {
      content = <WeatherList weathers={this.state.weathers} onUrlClick={this.onUrlClick.bind(this)} />
    }
    return (
    <div className='weathers'>
      {content}
    </div>
    )
  }
}
