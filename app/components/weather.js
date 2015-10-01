import React from 'react'

export default class Weather extends React.Component {
  getNotification() {
    
  }
  
  openUrl (url) {
    this.props.onUrlClick(url)
  }
  
  openDetail (e) {
    e.preventDefault()
    this.openUrl(this.props.weather.detail_url)
  }
  
  render() {
    return (
      <ul className='cell' onClick={this.openDetail.bind(this)}>
        <li>Time: {this.props.weather.time}</li>
        <li>Place: {this.props.weather.place}</li>
        <li>Condition: {this.props.weather.condition}</li>
      </ul>
    )
  }
}
