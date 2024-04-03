import { Component, Input } from '@angular/core';

// models
import { Subdomain } from '../../../models/diskover.model';

// services
import { IpcService } from '../../../services/ipc.service';


@Component({
  selector: 'app-subdomains-viewer',
  templateUrl: './subdomains-viewer.component.html',
  styleUrls: ['./subdomains-viewer.component.css']
})
export class SubdomainsViewerComponent {
  @Input() subdomain: Subdomain;

  constructor(private readonly _ipc: IpcService) { }

  openLink(link: string) {
    if (link) {
      this._ipc.sendMessage('open-external-link', link);
    }
  }
}
