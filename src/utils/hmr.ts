import { hot } from 'react-hot-loader'

/**
 * Hot module replacement wrapper
 * @param {NodeModule} module
 */
export default (module: NodeModule) => (app: () => JSX.Element | JSX.Element) => module.hot
  ? hot(module)(app)
  : app
