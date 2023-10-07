import { combineReducers } from "@reduxjs/toolkit"
import userReducer from "./userReducer";
import routesReducer from "./routesReducer";
import paginationReducer from "./PaginationReducer";
import alertReducer from './alertReducer';
import customerInfoReducer from './customerInfoReducer';
import isMobileReducer from './isMobileReducer';
import commentsReducer from './commentsReducer';

const rootReducer = combineReducers({
    user: userReducer,
    routes: routesReducer,
    pagination: paginationReducer,
    alert: alertReducer,
    customer:customerInfoReducer,
    comments:commentsReducer
    // isMobile: isMobileReducer
})

export default rootReducer;