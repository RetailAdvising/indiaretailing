import { combineReducers } from "@reduxjs/toolkit"
import userReducer from "./userReducer";
import routesReducer from "./routesReducer";
import paginationReducer from "./PaginationReducer";

const rootReducer = combineReducers({
    user: userReducer,
    routes: routesReducer,
    pagination: paginationReducer
})

export default rootReducer;