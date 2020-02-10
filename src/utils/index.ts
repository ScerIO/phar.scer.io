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

/**
 * Botch returns true if prefers-color-scheme supports
 * @returns {boolean}
 */
export function isSystemPrefersThemeSupport(): boolean {
  return window.matchMedia && window.matchMedia(`(prefers-color-scheme)`).matches;
}

/**
 * Return system theme brightness if supported
 * @returns {SystemThemeCodes}
 */
export function systemPrefersTheme(): SystemThemeCodes {
  if (_checkThemeMedia('dark')) {
    return SystemThemeCodes.dark
  } else if (_checkThemeMedia('light')) {
    return SystemThemeCodes.light
  }
  return SystemThemeCodes.noSupport
}

/**
 *
 * @param {String} color brightness of theme
 */
function _checkThemeMedia(color: String): boolean {
  return window.matchMedia && window.matchMedia(`(prefers-color-scheme: ${color})`).matches;
}

/**
 * Result codes for systemPrefersTheme
 */
export enum SystemThemeCodes {
  noSupport,
  dark,
  light,
}
