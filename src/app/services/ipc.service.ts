import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';

@Injectable()
export class IpcService {
  private _ipc: IpcRenderer | undefined = void 0;

  constructor() {
    if (window.require) {
      try {
        this._ipc = window.require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('Electron\'s IPC was not loaded');
    }
  }

  public async send(channel: string): Promise<any> {
    if (!this._ipc) {
      return;
    }
    return this._ipc.invoke(channel)
  }

  public async sendMessage(channel: string, message: string): Promise<any> {
    if (!this._ipc) {
      return;
    }
    return this._ipc.invoke(channel, message)
  }
}