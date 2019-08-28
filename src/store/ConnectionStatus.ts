import { observable, action } from 'mobx'

export enum ConnectionStatus {
  online,
  offline,
}

export class ConnectionStatusStore {
  @observable
  public status: ConnectionStatus = ConnectionStatus.online

  public constructor() {
    window.addEventListener('online', this.updateOnlineStatus)
    window.addEventListener('offline', this.updateOnlineStatus)
  }

  @action
  public updateOnlineStatus = (_: Event) => {
    this.status = navigator.onLine
      ? ConnectionStatus.online
      : ConnectionStatus.offline
  }

  get isOnline(): boolean {
    return this.status === ConnectionStatus.online
  }
}

export const connectionStatusStore = new ConnectionStatusStore()
