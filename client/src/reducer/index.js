import { combineReducers } from "redux";
import authReducer from "./auth";
import errorReducer from "./error";
import setSearch from './setSearch';
import {reducer} from './evnt'
import admin from "./admin"
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  search: setSearch,
  events:reducer,
  admin: admin,
});