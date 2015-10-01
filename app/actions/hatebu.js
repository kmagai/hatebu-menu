import * as types from '../constants/';

export function fetchEntries(text) {
  return { type: types.FETCH_ENTRIES };
}

export function addCategory(id) {
  return { type: types.ADD_CATEGORY, id };
}

export function deleteCategory(id) {
  return { type: types.DELETE_CATEGORY, id };
}

// export function sortCategory(id) {
//   return { type: types.DELETE_CATEGORY, id };
// }

export const FETCH_ENTRIES = 'FETCH_ENTRIES';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
