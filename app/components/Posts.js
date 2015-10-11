import React, { PropTypes, Component } from 'react';

export default class Posts extends Component {
  render () {
    const { posts, onClick, onClickStar } = this.props;
    
    return (
      <ul className="content table-view">
        {this.props.posts.map((post, i) =>
          <li className="table-view-cell" key = {i}>
            <a href="#" className="clickable" onClick={e => onClick(e, post.link)}>
              {post.title}
            </a>
            <a href="#" className="clickable" onClick={e => onClickStar(e, post.link)}>
              <span className="badge">{post.star}</span>
            </a>
            <span className="hostname">{post.host}</span>
          </li>
        )}
      </ul>
    );
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  onClickStar: PropTypes.func.isRequired,
};
