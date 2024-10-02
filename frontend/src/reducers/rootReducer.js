import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import authReducer from "../slices/authSlice";
import taskReducer from '../slices/taskSlice'

const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    task: taskReducer,
})

export default rootReducer;