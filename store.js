import { createStore } from 'redux';
import reducer from './reducer';

// This connects the reducer to the store
const store = createStore(reducer);

export default store;