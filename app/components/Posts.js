import React, { PropTypes, Component } from 'react';

export default class Posts extends Component {
  render () {
    const { posts, onClick } = this.props;
    
    return (
      <ul>
        {this.props.posts.map((post, i) =>
          <li key={i}><a href="#" onClick={e => onClick(e, post.link)}>{post.title}</a></li>
        )}
      </ul>
    );
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
};
