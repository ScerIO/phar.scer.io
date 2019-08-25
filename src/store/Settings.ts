import { observable, action } from 'mobx'
import { Signature } from 'phar'
import setThemeColor from 'utils/setThemeColor'
import { getMainColorByTheme } from 'theme'

export enum ThemeType {
  light = 'light',
  dark = 'dark',
}

export class SettingsStore {
  @observable signature: Signature = Signature.SHA1
  @observable compress: boolean = true
  @observable stub: string = '<?php __HALT_COMPILER();'
  @observable theme: ThemeType = ThemeType.light

  @action setSignature(signature: Signature) {
    this.signature = signature
  }

  @action setCompress(compress: boolean) {
    this.compress = compress
  }

  @action setStub(stub: string) {
    this.stub = stub
  }

  @action setTheme(theme: ThemeType) {
    this.theme = theme
    setThemeColor(getMainColorByTheme(theme))
  }
}

export const settingsStore = new SettingsStore()
