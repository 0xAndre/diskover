import { Component } from '@angular/core';

// global
import { AppGlobals } from '../../app.globals';

// services
import { IpcService } from 'src/app/services/ipc.service';

@Component({
  selector: 'app-ips-history',
  templateUrl: './ips-history.component.html',
  styleUrls: ['./ips-history.component.css']
})
export class IpsHistoryComponent {
  selectedIP: any
  constructor(
    public appGlobals: AppGlobals,
    private readonly _ipc: IpcService
  ) {
    try {
      this.selectedIP = this.appGlobals.diskover.ipsHistory[0];
    } catch (e) {
      console.error(e);
    }
  }

  selectIP(lastSeen: string) {
    this.selectedIP = this.appGlobals.diskover.ipsHistory.find(ip => ip.lastSeen === lastSeen)
    console.log(this.selectedIP)
  }

  openLink(link: string) {
    this._ipc.sendMessage('open-external-link', `https://www.shodan.io/search?query=${link}`);
  }

}
