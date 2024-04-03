import { Component } from '@angular/core';

// global
import { AppGlobals } from '../../app.globals';

// services
import { IpcService } from './../../services/ipc.service';

@Component({
  selector: 'app-discovered-urls',
  templateUrl: './discovered-urls.component.html',
  styleUrls: ['./discovered-urls.component.css']
})
export class DiscoveredUrlsComponent {
  constructor(
    public appGlobals: AppGlobals,
    private readonly _ipc: IpcService
  ) { }

  openLink(link: string) {
    if (link) {
      this._ipc.sendMessage('open-external-link', link);
    }
  }
}
