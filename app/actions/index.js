import fetch from 'isomorphic-fetch';
import Shell from 'shell';
import _ from 'lodash';
import {
  SELECT_CATEGORY, INVALIDATE_HATEBU,
  REQUEST_POSTS, RECEIVE_POSTS, RECEIVE_STARS
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

function receiveStars(stars) {
  return {
    type: RECEIVE_STARS,
    stars: stars,
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
        dispatch(receivePosts(category, entries));
        entries.forEach(entry => {
          fetch_star(entry).then(stars => {
            dispatch(receiveStars(stars));
          })
        })
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
      console.log('=========');
      // console.log(JSON.stringify(entry));
      // console.log(star);
      star != undefined ? resolve([entry.link, star]) : reject(new Error("Bad response from server")) ;
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
