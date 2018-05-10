import jwtDecode from 'jwt-decode';
import * as actionTypes from '../utils/constants/actionTypes';

export function setAuth({ authHeader }) {
  const { id, username, displayName, role } = jwtDecode(authHeader);
  return {
    type: actionTypes.AUTH_USER_SET,
    payload: {
      authHeader,
      id,
      username,
      displayName,
      role
    }
  };
}

export function resetAuth() {
  return {
    type: actionTypes.AUTH_USER_RESET
  };
}
