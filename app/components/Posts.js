import React, { PropTypes, Component } from 'react';
import FontAwesome from 'react-fontawesome';
import URL from 'url';

export default class Posts extends Component {
  render () {
    const { posts, onClick, onClickStar } = this.props;
    
    return (
      <ul className="content table-view">
        {this.props.posts.map((post, i) =>
          <li className="table-view-cell">
            <a href="#" className="clickable" onClick={e => onClick(e, post.link)}>
              {post.title}
            </a>
            <span className="hostname">{URL.parse(post.link).hostname}</span>
            <br />
            <span className="comments clickable" onClick={e => onClickStar(e, post.link)}>
              <FontAwesome name="comments-o" />&nbsp;comments &nbsp;
              <span className="badge">{post.star}</span>
            </span>
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
