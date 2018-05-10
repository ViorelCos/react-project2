import { post, get } from 'axios';
import { AUTH_URL } from '../utils/constants/endpoints';

export async function login ({ username, password }) {
  
  console.log(`${AUTH_URL}/api/sessions`);
  console.log({username,password});
  
  const response = await post(`${AUTH_URL}/api/sessions`, {
    username,
    password
  });
  return response.data;
}

export async function signUp (data) {
  const response = await post(`${AUTH_URL}/api/users`, data);
  return response.data;
}

export async function getUserInfo (token) {
  const data = {
    headers: {
      Authorization: `JWT ${token}`
    }
  };
  console.log('getUserInfo');
  console.log({data});
  const response = await get(`${AUTH_URL}/api/users/me`, data);
  return response.data;
}

export async function isExistsUser (token, user) {
  const data = {
    headers: {
      Authorization: `JWT ${token}`
    }
  };
  const response = await get(
    `${AUTH_URL}/api/users/exists?username=${user}`,
    data
  );
  return response.data;
}
