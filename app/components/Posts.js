import React, { PropTypes, Component } from 'react';

export default class Posts extends Component {
  render () {
    const { posts, onClick } = this.props;
    
    return (
      <ul className="content table-view">
        {this.props.posts.map((post, i) =>
          <li className="table-view-cell" key = {i}>
            <a href="#" className="clickable" onClick={e => onClick(e, post.link)}>
              {post.title}
              <span className="badge">{post.star}</span>
            </a>
            <span>{post.host}</span>
          </li>
        )}
      </ul>
    );
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
};
