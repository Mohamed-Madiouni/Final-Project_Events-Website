import { combineReducers } from "redux";
import authReducer from "./auth";
import errorReducer from "./error";
import setSearch from './setSearch';
import admin from "./admin"
import {reducer} from './evnt'
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  search: setSearch,
  admin: admin,
  events:reducer,
});