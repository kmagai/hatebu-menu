import fetch from 'isomorphic-fetch';
import Shell from 'shell';
import _ from 'lodash';
import {
  SELECT_CATEGORY, INVALIDATE_HATEBU,
  REQUEST_POSTS, RECEIVE_POSTS 
} from '../constants/ActionTypes';
import {URLS} from '../constants/Categories';
import {FEED_API} from '../constants/APIs';

export function selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
    category
  };
}

export function invalidateHatebu(hatebu) {
  return {
    type: INVALIDATE_HATEBU,
    hatebu
  };
}

function requestPosts(hatebu) {
  return {
    type: REQUEST_POSTS,
    hatebu
  };
}

function receivePosts(category, entries) {
  return {
    type: RECEIVE_POSTS,
    category: category,
    posts: entries,
    receivedAt: Date.now()
  };
}

function fetchPosts(category) {
  return dispatch => {
    dispatch(requestPosts(category));
    let SELECTED_API = URLS[category];
    let FEED_URL = `${FEED_API}${SELECTED_API}`;
    
    return fetch(FEED_URL)
      .then(response => response.json())
      // .then(json => dispatch(merge_stars(category, json)));
      .then(json => {
        let entries = json.responseData.feed.entries;
        var updated_entries;
        return Promise.all(
          _.map(entries, fetch_star)
        );
      })
      .then(merged_entries => {
        console.log('------entries----------');
        console.log(JSON.stringify(merged_entries));
        console.log('---------entries-------');
        dispatch(receivePosts(category, merged_entries));
      })
  };
}

function fetch_star(entry) {
  return new Promise(function(resolve, reject){
    fetch(`http://api.b.st-hatena.com/entry.count?url=${entry['link']}`)
    .then(response => {
      if (response.status >= 400) {
        console.log('awww.......error occurred');
        reject(new Error("Bad response from server"));
      }
      return response.json();
    })
    .then(star => {
      console.log('----------------------');
      console.log(JSON.stringify(star));
      console.log('----------------------');
      star != undefined ? resolve(Object.assign(entry, {'star': star})) : reject(new Error("Bad response from server")) ;
    })
  });
}

function get_stars(entries) {
  var updated_entries = [];
  return Promise.all(
    entries.forEach(entry => {
      fetch_star(entry)
      // return get_stars(entry).then(v => {
      //   updated_entries.push(Object.assign(v[0], {
      //     'star': v[1]
      //   }));
      // }).catch(function onRejected(error) {
      //     console.error(error);
      // });
    })
  );
}

function shouldFetchPosts(state, category) {
  const posts = state.postsByHatebu[category];
  if (!posts) {
    return true;
  }
  if (posts.isFetching) {
    return false;
  }
  return posts.didInvalidate;
}

export function fetchPostsIfNeeded(category) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), category)) {
      return dispatch(fetchPosts(category));
    }
  };
}

export function openLink(url) {
  return (dispatch) => {
    Shell.openExternal(url)
    return;
  }
}
