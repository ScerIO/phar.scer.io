import { hot } from 'react-hot-loader'

/**
 * Hot module replacement wrapper
 * @param {NodeModule} module
 */
export default (module: NodeModule) => <T>(app: React.ComponentType<T>) => module.hot
  ? hot(module)(app)
  : app
