import { Component } from '@angular/core';

// global
import { AppGlobals } from '../../app.globals';

// services
import { IpcService } from './../../services/ipc.service';

@Component({
  selector: 'app-grep',
  templateUrl: './grep.component.html',
  styleUrls: ['./grep.component.css']
})
export class GrepComponent {

  constructor(
    public appGlobals: AppGlobals,
    private readonly _ipc: IpcService
  ) { }

  openLink(link: string) {
    console.log(link)
    if (link) {
      this._ipc.sendMessage('open-external-link', link);
    }
  }
}
