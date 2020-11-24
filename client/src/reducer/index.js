import { combineReducers } from "redux";
import authReducer from "./auth";
import errorReducer from "./error";
import setSearch from './setSearch';
import {reducer} from './evnt'
import {comment} from './comment'
import admin from "./admin"
import {map} from "./map"
import {part} from "./participant"
import {myevents} from "./myEvents"
import {notifications} from "./notification"
import resize from "./resize"
import {loading} from "./Loading"
import {chat} from "./chat"
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  search: setSearch,
  events:reducer,
  resize:resize,
  admin: admin,
  participant:part,
  myevents:myevents,
  comments:comment,
  notification:notifications,
  map:map,
  loading:loading,
  chat:chat
});