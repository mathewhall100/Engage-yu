import ReduxThunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers';
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/es/storage'import reducer from './reducers/PatientDataReducer'


// const middleware = [thunk]
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// const configureStore = composeEnhancers(
//   applyMiddleware(...middleware),
// )(createStore)

// const config = {
//   key: 'root',
//   storage,
// }

// const combinedReducer = persistReducer(config, reducer)

// const createAppStore = () => {
//   let store = configureStore(combinedReducer)
//   let persistor = persistStore(store)
//   return { persistor, store }
// }

// export default createAppStore

const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk)
);

export default store;