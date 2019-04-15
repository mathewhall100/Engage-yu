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

 // store.subscribe adds listener that triggers with any state changes so we can add the new state to local storage
 // to prevent frequent store saves impacting performance, lodash .throttle lmiits store saves to max one per second (1000ms)
 store.subscribe(throttle(() => {
     // we can specify any state objects we don't want persisting here in the blacklist
    const blacklist = ['form'] 
    let stateObj = {}
    for (let [item, value] of Object.entries(store.getState())) {
        if (!blacklist.includes(item)) {
            stateObj[item] = value
        }
    }
    saveState(stateObj)
    // saveState(store.getState()) // will persist whole store
 
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
