import { combineReducers } from 'redux';

import products from './products';
import auth from './auth';

export const reducers = combineReducers({ products, auth });
