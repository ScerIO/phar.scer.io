import { createStore } from 'redux'
import rootReducer from 'reducers/Root'

export default () => {
  //@ts-ignore
  const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

  return store
}
