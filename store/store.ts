import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import authReducer from "./auth/authReducer";
import ReduxThunk from "redux-thunk"
import rootReducer from "./rootReducer";

const middlewares = [ReduxThunk]
const middlewaresEnhancer = applyMiddleware(...middlewares)

export const store = createStore(rootReducer, composeWithDevTools(middlewaresEnhancer))