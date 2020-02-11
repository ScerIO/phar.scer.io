declare const serviceWorkerOption: {
  assets: string[]
}

declare const appVersion: string
declare const homepageUrl: string

interface NodeModule {
  hot: boolean
}

declare module '@alienfast/i18next-loader*' {
  const content: {};
  export = content;
}
