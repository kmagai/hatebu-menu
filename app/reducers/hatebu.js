import { FETCH_ENTRIES, ADD_CATEGORY, DELETE_CATEGORY } from '../constants/action_types';

export const FETCH_ENTRIES = 'FETCH_ENTRIES';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
import Config from '../model/config'

var config = new Config(path.join(app.getPath('userConfig'), 'config.json'));
const app_config = config.load();
// better way to write this?
const initialState = (config.cities ? config.cities : [])

export default function hatebu(state=initialState, action) {
  switch (action.type) {
  case FETCH_ENTRIES:
    return state.map(weather =>
      weather.id === weather.id ?
        // TODO: make it async later
        
        http://feeds.feedburner.com/hatena/b/hotentry
        Object.assign({}, weather, { condition: action.condition }) :
        weather
    );
    
  case ADD_CATEGORY:
    return [{
      id: state.reduce((maxId, weather) => Math.max(weather.id, maxId), -1) + 1,
      city: action.city,
      condition: [],
      notification: false
    }, ...state];

  case DELETE_CATEGORY:
    return state.filter(weather =>
      weather.id !== action.id
    );

  default:
    return state;
  }
}


export default function counter(state = 0, action) {
  switch (action.type) {
  case INCREMENT_COUNTER:
    return state + 1;
  case DECREMENT_COUNTER:
    return state - 1;
  default:
    return state;
  }
}

