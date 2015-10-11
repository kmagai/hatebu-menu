import fetch from 'isomorphic-fetch';
import Shell from 'shell';
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
      .then(json => dispatch(merge_stars(category, json)));
      
      
      getJSON('story.json').then(function(story) {
    addHtmlToPage(story.heading);

    // return story.chapterUrls.reduce(function(sequence, chapterUrl) {
    //   // Once the last chapter's promise is done…
    //   return sequence.then(function() {
    //     // …fetch the next chapter
    //     return getJSON(chapterUrl);
    //   }).then(function(chapter) {
    //     // and add it to the page
    //     addHtmlToPage(chapter.html);
    //   });
    // }, Promise.resolve());  
  };
}

function get_stars(entry) {
  return new Promise(function(resolve, reject){
    // fetch(`http://api.b.st-hatena.com/entry.count?url=${entry['link']}`)
    // .then(response => response.json())
    // .then(star => resolve(star))
    
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
      console.log(JSON.stringify(entry));
      console.log(star);
      star != undefined ? resolve([entry, star]) : reject(new Error("Bad response from server")) ;
    })
  });
}

function merge_stars(category, json) {
  return dispatch => {
    let entries = json.responseData.feed.entries;
    console.log(entries);
    var updated_entry;
    for (var i = 0; i < entries.length; i++) {
      get_stars(entries[i])
      .then(v => {
        // use 'map'
          if (v[0]) {
            let merged_entry = Object.assign(v[0], {
              'star': v[1]
            })
            console.log(JSON.stringify(merged_entry));
            console.log('=========');
            updated_entry.push(merged_entry);
          }
        }).catch(function onRejected(error) {
        console.error(error);
      });
    }
    return update_stars(category, entries).then( v => dispatch(receivePosts(v[0], v[1])))
  }
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
