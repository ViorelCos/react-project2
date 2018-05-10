import { UPDATE_ERROR } from '../constants/actionTypes';

export function getError(state) {
  return state.error && state.error.message;
}

export default function error(state = '', action) {
  switch (action.type) {
    case UPDATE_ERROR:
      return action.error;
    default:
      return state;
  }
}
