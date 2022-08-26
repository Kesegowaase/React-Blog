import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from ".";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
    return createStore(reducers, composeEnhancers(applyMiddleware(thunk)))
}