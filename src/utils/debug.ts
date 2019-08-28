/**
 * Call callback if env != production
 * @param {Function} callback
 */
export default function debug(callback: () => void): void {
  if (process.env.NODE_ENV !== 'production') {
    callback()
  }
}
