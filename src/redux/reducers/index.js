import { combineReducers } from "redux";
import articleReducer from "./articleReducer";
import authReducer from "./authReducer";

const reducers = combineReducers({
    authReducer,
    articleReducer
})

export default reducers