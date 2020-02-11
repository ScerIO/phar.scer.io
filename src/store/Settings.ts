import { observable } from 'mobx'
import { Signature } from 'phar'
import { ThemeType, getDefaultTheme } from 'theme'

export class SettingsStore {
  @observable
  public signature: Signature = Signature.SHA1
  @observable
  public compress: boolean = true
  @observable
  public stub: string = '<?php __HALT_COMPILER();'
  @observable
  public theme: ThemeType = getDefaultTheme();
}

export const settingsStore = new SettingsStore()
