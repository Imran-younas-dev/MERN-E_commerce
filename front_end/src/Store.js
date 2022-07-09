import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { ProductReducer } from "./Redux/Reducer/ProductReducer";
import {ProductDetailsReducer} from "./Redux/Reducer/ProductReducer";
import {userReducer} from './Redux/Reducer/UserReducer'
const reducer = combineReducers({
    products : ProductReducer,
    product: ProductDetailsReducer,
    user : userReducer,
});
let initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
