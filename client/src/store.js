import Thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import throttle from 'lodash/throttle'
import rootReducer from './reducers';
import { loadState, saveState } from './localStorage';
//import { persistStore, persistCombineReducers } from 'redux-persist'
//import reducer from './reducers/indexPersist';

//import storage from 'redux-persist/lib/storage'
const persistedState = loadState()

 const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(Thunk)
 );

 store.subscribe(throttle(() => {
     saveState(store.getState())
}, 1000));

export default store;

// const middleware = applyMiddleware(Thunk)

// const persistConfig = {
//   key: 'root',
//   storage,
//   blacklist: ['auth', 'user', 'form']

// };

// const reducers = persistCombineReducers(persistConfig, reducer);

// export const configureStore = () => {
//     const store = createStore(reducers, middleware)
//     const persistor = persistStore(store)
//     return { persistor, store }
// }
