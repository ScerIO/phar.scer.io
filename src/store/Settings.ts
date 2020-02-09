import { observable, action } from 'mobx'
import { Signature } from 'phar'
import { setThemeColor } from 'utils'
import { getMainColorByTheme } from 'theme'

export enum ThemeType {
  light = 'light',
  dark = 'dark',
}

export class SettingsStore {
  @observable
  public signature: Signature = Signature.SHA1
  @observable
  public compress: boolean = true
  @observable
  public stub: string = '<?php __HALT_COMPILER();'
  @observable
  public theme: ThemeType = ThemeType.light

  @action
  public setSignature(signature: Signature) {
    this.signature = signature
  }

  @action
  public setCompress(compress: boolean) {
    this.compress = compress
  }

  @action
  public setStub(stub: string) {
    this.stub = stub
  }

  @action
  public setTheme(theme: ThemeType) {
    this.theme = theme
    setThemeColor(getMainColorByTheme(theme))
  }
}

export const settingsStore = new SettingsStore()
