import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import rootReducer, { ApplicationState } from 'reducers/Root'
import setThemeColor from 'utils/setThemeColor'
import { getMainColorByTheme } from 'theme'

const persistedReducer = persistReducer({
  key: 'root',
  storage,
  whitelist: ['settings']
}, rootReducer)

export default () => {
  //@ts-ignore
  const store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  persistStore(store, {}, () => {
    const theme = (store.getState() as ApplicationState).settings.theme
    setThemeColor(getMainColorByTheme(theme))
  })
  return store
}
