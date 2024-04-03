import { Component, OnInit } from '@angular/core';

// global
import { AppGlobals } from '../../app.globals';

// services
import { IpcService } from '../../services/ipc.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent {
  showImage: boolean = true;

  constructor(
    public appGlobals: AppGlobals,
    private readonly _ipc: IpcService
  ) {


  }

  ngOnInit() {
    this.saveJSONfile()
  }
  onImageError() {
    this.showImage = false;
  }

  openLink(link: string) {
    this._ipc.sendMessage('open-external-link', `https://${link}`);
  }

  saveJSONfile() {
    var a = document.getElementById("export");
    if (a) {
      a.setAttribute(
        "href",
        `data:text/plain;charset=utf-u,${encodeURIComponent(
          JSON.stringify(this.appGlobals.diskover, null, 4)
        )}`
      );
      a.setAttribute("download", `${this.appGlobals.diskover.site}.json`);
    }

  }
}
