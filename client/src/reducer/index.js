import { combineReducers } from "redux";
import authReducer from "./auth";
import errorReducer from "./error";
import setSearch from './setSearch';
import {reducer} from './evnt'
import {part} from "./participant"
import {myevents} from "./myEvents"
import resize from "./resize"
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  search: setSearch,
  events:reducer,
  resize:resize,
  participant:part,
  myevents:myevents
});