import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectCategory, fetchPostsIfNeeded, invalidateHatebu, openLink } from '../actions';
import Picker from '../components/Picker';
import Posts from '../components/Posts';
import * as categories from '../constants/Categories';
import {CATEGORIES} from '../constants/Categories';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
    this.handleUrlClick = this.handleUrlClick.bind(this);
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

  handleChange(nextCategory) {
    this.props.dispatch(selectCategory(nextCategory));
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch, selectedCategory } = this.props;
    dispatch(invalidateHatebu(selectedCategory));
    dispatch(fetchPostsIfNeeded(selectedCategory));
  }

  handleUrlClick(e, selectedUrl) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(openLink(selectedUrl));
  }

  render() {
    const { selectedCategory, posts, isFetching, lastUpdated } = this.props;
    return (
      <div>
        <Picker value={selectedCategory}
                onChange={this.handleChange}
                options = {CATEGORIES} />
          <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}
            </span>
          }
          {!isFetching &&
            <a href="#"
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
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
              onClick={this.handleUrlClick} />
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
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { selectedCategory, postsByHatebu } = state;
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByHatebu[selectedCategory] || {
    isFetching: true,
    items: []
  };

  return {
    selectedCategory,
    posts,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(App);
