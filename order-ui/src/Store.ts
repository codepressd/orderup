import * as Redux from 'redux';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import { beginListener } from './routerUtils/RouterListener';

import RootReducer from './reducers/RootReducer';
import { RouterMiddleware } from './routerUtils/RouterMiddleware';

// Creates a history object
export const history = createBrowserHistory();

// middleware to watch the history
const routerMiddleware = RouterMiddleware(history);

// Apply Middleware 
const allMiddleWare = [thunk, routerMiddleware];

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || Redux.compose;

const enhancers = composeEnhancers(
    Redux.applyMiddleware(...allMiddleWare)
);

// We should add the persisted state to our store

export const store = Redux.createStore(RootReducer, {}, enhancers);

// Listens for route changes
beginListener(history, store);