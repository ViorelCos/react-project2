import * as actionTypes from '../constants/actionTypes';

export function getIsLoggedIn(state) {
  const auth = state.auth;
  return auth.isLoggedIn;
}

export function getUsername(state) {
  return state.auth.username;
}

export function getDisplayName(state) {
  return state.auth.displayName || state.auth.username;
}

const initialState = {
  authHeader: '',
  isLoggedIn: false,
  id: '',
  username: '',
  displayName: '',
  role: '',
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.AUTH_USER_SET: {
      const { authHeader, id, username, displayName, role } = action.payload;
      return { ...state, authHeader, id, username, displayName, role, isLoggedIn: true };
    }
    case actionTypes.AUTH_USER_RESET: {
      return initialState;
    }
    default:
      return state;
  }
}
