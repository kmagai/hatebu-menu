import * as types from '../constants/';

export function fetchWeather(text) {
  return { type: types.FETCH_WEATHER };
}

export function setNotifier(id) {
  return { type: types.SET_NOTIFIER, id };
}

export function unsetNotifier(id) {
  return { type: types.UNSET_NOTIFIER, id };
}

export const FETCH_WEATHER = 'FETCH_WEATHER';
export const SET_NOTIFIER = 'SET_NOTIFIER';
export const UNSET_NOTIFIER = 'UNSET_NOTIFIER';
