import React from 'react'
import Category from './category.js'
import _ from 'lodash'

export default class Category extends React.Component {

  render () {
  var onUrlClick = this.props.onUrlClick
    var categoryNodes = _.map(this.props.categories, function (category, index) {
      return (
        <li key={index} className='table-view-cell category'>
          <Category category={category}  className='clickable' onUrlClick={onUrlClick}/>
        </li>
      )
    })
    return (
      <ul className='content table-view'>
        {categoryNodes}
      </ul>
    )
  }
}