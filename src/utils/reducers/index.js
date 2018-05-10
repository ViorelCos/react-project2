import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
export default combineReducers({
  auth: authReducer,
  routing: routerReducer,
  error: errorReducer,
});