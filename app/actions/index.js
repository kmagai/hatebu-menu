import fetch from 'isomorphic-fetch';
import Shell from 'shell';
import {
  SELECT_REDDIT, INVALIDATE_REDDIT,
  REQUEST_POSTS, RECEIVE_POSTS
} from '../constants/ActionTypes';
import {
  FEED_API, CATEGORY_ALL_URL, CATEGORY_GENERAL_URL, CATEGORY_SOCIAL_URL, CATEGORY_ECONOMICS_URL, CATEGORY_LIFE_URL,
  CATEGORY_ENTERTAINMENT_URL, CATEGORY_KNOWLEDGE_URL, CATEGORY_IT_URL, CATEGORY_GAME_URL, CATEGORY_FUN_URL
} from '../constants/APIUrls';


export function selectReddit(reddit) {
  return {
    type: SELECT_REDDIT,
    reddit
  };
}

export function invalidateReddit(reddit) {
  return {
    type: INVALIDATE_REDDIT,
    reddit
  };
}

function requestPosts(reddit) {
  return {
    type: REQUEST_POSTS,
    reddit
  };
}

function receivePosts(reddit, json) {
  return {
    type: RECEIVE_POSTS,
    reddit: reddit,
    posts: json.responseData.feed.entries,
    receivedAt: Date.now()
  };
}

function fetchPosts(reddit) {
  return dispatch => {
    dispatch(requestPosts(reddit));
    let SELECTED_API = CATEGORY_ALL_URL;
    console.log(`${FEED_API}${SELECTED_API}`);
    return fetch(`${FEED_API}${SELECTED_API}`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(reddit, json)));
  };
}

function shouldFetchPosts(state, reddit) {
  const posts = state.postsByReddit[reddit];
  if (!posts) {
    return true;
  }
  if (posts.isFetching) {
    return false;
  }
  return posts.didInvalidate;
}

export function fetchPostsIfNeeded(reddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), reddit)) {
      return dispatch(fetchPosts(reddit));
    }
  };
}

export function openLink(url) {
  return (dispatch) => {
    Shell.openExternal(url)
    return;
  }
}
