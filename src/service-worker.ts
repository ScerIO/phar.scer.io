// Set this to true for production
var doCache = process.env.NODE_ENV === 'production'

// Name our cache
var CACHE_NAME = 'phar-app-cache-v3'

// Delete old caches that are not our current one!
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME]
  event.waitUntil(
    caches.keys()
      .then(keyList =>
        Promise.all(keyList.map(key => {
          if (!cacheWhitelist.includes(key)) {
            console.log('Deleting cache: ' + key)
            return caches.delete(key)
          }
        }))
      )
  )
})

// The first time the user starts up the PWA, 'install' is triggered.
self.addEventListener('install', (event) => {
  console.log('install called')
  if (!doCache) return
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        // Get the assets manifest so we can see what our js file is named
        // This is because webpack hashes it
        console.log(serviceWorkerOption.assets)
        cache.addAll(serviceWorkerOption.assets)
      })
      // @ts-ignore
      .then(self.skipWaiting())
  )
})

// When the webpage goes to fetch files, we intercept that request and serve up the matching files
// if we have them
self.addEventListener('fetch', (event) => {
  if (!doCache) return
  event.respondWith(
    caches.match(event.request).then((response) =>
      response || fetch(event.request)
    )
  )
})
