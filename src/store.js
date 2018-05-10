import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import multi from 'redux-multi';
import jwtDecode from 'jwt-decode';
import throttle from 'lodash/throttle';
import logger from 'redux-logger';
import rootReducer from './utils/reducers';

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const authHeader = localStorage.getItem('authHeader');
const { id, username, displayName, role } = authHeader
  ? jwtDecode(authHeader)
  : { id: '', username: '', displayName: '', role: '' };

const preLoadedState = {
  auth: {
    authHeader: authHeader || '',
    isLoggedIn: !!authHeader,
    id,
    username,
    displayName,
    role,
  },
};
const middlewares = [multi, thunk, logger];
const store = createStore(
  rootReducer,
  preLoadedState,
  composeEnhancers(applyMiddleware(...middlewares)),
);

store.subscribe(
  throttle(() => {
    localStorage.setItem('authHeader', store.getState().auth.authHeader);
  }, 1000),
);

export default store;
