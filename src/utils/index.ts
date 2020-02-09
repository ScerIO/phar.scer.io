/**
 * Call callback if env != production
 * @param {Function} callback
 */
export function debug(callback: () => void): void {
  if (process.env.NODE_ENV !== 'production') {
    callback()
  }
}

/**
 * Dynamically set browser theme color
 * @param {String} color  hex|rgb color
 */
export function setThemeColor(color: string) {
  document.querySelector('meta[name="theme-color"]').setAttribute('content', color)
}
