declare module 'serviceworker-webpack-plugin/lib/runtime' {
  function register(): Promise<ServiceWorkerRegistration>
}

declare const serviceWorkerOption: {
  assets: string[]
}

declare const appVersion: string
