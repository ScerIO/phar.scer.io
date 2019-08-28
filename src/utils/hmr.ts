import { hot } from 'react-hot-loader'

export default (module) => (app) => module.hot
  ? hot(module)(app)
  : app
