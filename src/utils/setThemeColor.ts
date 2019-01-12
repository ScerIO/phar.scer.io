/**
 * Dynamically set browser theme color
 * @param color  hex|rgb colo
 */
export default function setThemeColor(color: string) {
  document.querySelector('meta[name="theme-color"]').setAttribute('content', color)
}
