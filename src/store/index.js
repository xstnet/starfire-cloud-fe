import { createStore,applyMiddleware } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

let middleWares = applyMiddleware(thunk)

const store = createStore(reducer, middleWares);

export default store;