import { FETCH_WEATHER, ADD_ANTENNA, DELETE_ANTENNA, TOGGLE_NOTIFIER } from '../constants/action_types';
import Config from '../model/config'

var config = new Config(path.join(app.getPath('userConfig'), 'config.json'));
const app_config = config.load();
// better way to write this?
const initialState = (config.cities ? config.cities : [])

export default function weather(state=initialState, action) {
  switch (action.type) {
  case FETCH_WEATHER:
    return state.map(weather =>
      weather.id === weather.id ?
        Object.assign({}, weather, { condition: action.condition }) :
        weather
    );
    
  case ADD_ANTENNA:
    return [{
      id: state.reduce((maxId, weather) => Math.max(weather.id, maxId), -1) + 1,
      city: action.city,
      condition: [],
      notification: false
    }, ...state];

  case DELETE_ANTENNA:
    return state.filter(weather =>
      weather.id !== action.id
    );

  case TOGGLE_NOTIFIER:
    return state.map(weather =>
      weather.id === action.id ?
        Object.assign({}, weather, {notification : notification }) :
        weather
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

