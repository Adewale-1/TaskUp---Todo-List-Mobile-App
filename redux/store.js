// Import the createStore, combineReducers, and applyMiddleware functions from the Redux library
import { createStore, combineReducers, applyMiddleware } from 'redux';

// Import the redux-thunk middleware
import thunk from 'redux-thunk';

// Import the task reducer function
import taskReducer from './reducers';

// Combine the task reducer with any other reducers that you have
const rootReducer = combineReducers({taskReducer});

// Create the Redux store using the root reducer and the redux-thunk middleware
export const Store = createStore(rootReducer,applyMiddleware(thunk));