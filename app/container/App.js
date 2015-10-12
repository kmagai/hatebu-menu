import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectCategory, fetchPostsIfNeeded, invalidateCategory, openLink } from '../actions';
import Picker from '../components/Picker';
import Posts from '../components/Posts';
import * as categories from '../constants/Categories';
import {CATEGORIES} from '../constants/Categories';
import URL from 'url';


class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleUrlClick = this.handleUrlClick.bind(this);
    this.handleStarClick = this.handleStarClick.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedCategory } = this.props;
    dispatch(fetchPostsIfNeeded(selectedCategory));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedCategory !== this.props.selectedCategory) {
      const { dispatch, selectedCategory } = nextProps;
      dispatch(fetchPostsIfNeeded(selectedCategory));
    }
  }

  handleChange(e, nextCategory) {
    e.preventDefault();
    const { dispatch, selectedCategory } = this.props;
    // dispatch(invalidateCategory(selectedCategory));
    dispatch(selectCategory(nextCategory));
  }

  handleUrlClick(e, selectedUrl) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(openLink(selectedUrl));
  }

  handleStarClick(e, selectedUrl) {
    e.preventDefault();
    let bookmarkCommentURL = `http://b.hatena.ne.jp/entry/${URL.parse(selectedUrl).hostname}${URL.parse(selectedUrl).pathname}`;
    console.log(bookmarkCommentURL);
    const { dispatch } = this.props;
    dispatch(openLink(bookmarkCommentURL));
  }
  
  render() {
    const { selectedCategory, posts, isFetching } = this.props;
    return (
      <div>
        <Picker value={selectedCategory}
                onClick={this.handleChange}
                options = {CATEGORIES} />
          <p>
        </p>
        {isFetching && posts.length === 0 &&
          <div className="spinner">
            <div className="dot1"></div>
            <div className="dot2"></div>
          </div>
        }
        {!isFetching && posts.length === 0 &&
          <h2>Empty.</h2>
        }
        {posts.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts}
              onClick={this.handleUrlClick}
              onClickStar={this.handleStarClick} />
          </div>
        }
      </div>
    );
  }
}

App.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { selectedCategory, postsByHatebu } = state;
  const {
    isFetching,
    items: posts
  } = postsByHatebu[selectedCategory] || {
    isFetching: true,
    items: []
  };

  return {
    selectedCategory,
    posts,
    isFetching,
  };
}

export default connect(mapStateToProps)(App);
