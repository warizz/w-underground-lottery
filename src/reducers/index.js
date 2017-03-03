import { combineReducers } from 'redux';
import layout from './layout';
import user from './user';
import data from './data';

const rootReducers = combineReducers({ layout, user, data });

export default rootReducers;
