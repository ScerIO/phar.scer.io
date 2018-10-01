import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import rootReducer from 'reducers/Root'

const persistedReducer = persistReducer({
  key: 'root',
  storage,
  whitelist: ['packOptions']
}, rootReducer)

export default () => {
  //@ts-ignore
  const store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  persistStore(store)
  return store
}
