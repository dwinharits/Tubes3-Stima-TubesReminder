import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import combineReducers from "./reducers";

import {composeWithDevTools} from "redux-devtools-extension";

const initialState = {};

const middleWare = [thunk];

const store = createStore(
    combineReducers, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;