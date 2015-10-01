import React from 'react'

export default class Entry extends React.Component {
  getNotification() {
    
  }
  
  openUrl (url) {
    this.props.onUrlClick(url)
  }
  
  openDetail (e) {
    e.preventDefault()
    this.openUrl(this.props.entry.detail_url)
  }
  
  render() {
    return (
      <ul className='cell' onClick={this.openDetail.bind(this)}>
        <li>Time: {this.props.entry.time}</li>
        <li>Place: {this.props.entry.place}</li>
        <li>Condition: {this.props.entry.condition}</li>
      </ul>
    )
  }
}
