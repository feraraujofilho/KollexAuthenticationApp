import { userReducer } from './user/userReducer';
import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";


export default combineReducers({ authState: authReducer, userState: userReducer })