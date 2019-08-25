declare module 'serviceworker-webpack-plugin/lib/runtime' {
  function register(): Promise<ServiceWorkerRegistration>
}

declare const serviceWorkerOption: {
  assets: string[]
}

declare const appVersion: string
declare const homepageUrl: string

declare module 'worker-loader!*' {
  class WebpackWorker extends Worker {
    constructor()
  }

  export default WebpackWorker
}
