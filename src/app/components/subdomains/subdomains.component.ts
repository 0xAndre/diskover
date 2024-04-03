import { Component } from '@angular/core';

// global
import { AppGlobals } from '../../app.globals';

// models
import { Subdomain } from '../../models/diskover.model';

// services
import { IpcService } from './../../services/ipc.service';

@Component({
  selector: 'app-subdomains',
  templateUrl: './subdomains.component.html',
  styleUrls: ['./subdomains.component.css']
})
export class SubdomainsComponent {
  selectedSubdomain!: Subdomain

  constructor(
    public appGlobals: AppGlobals,
    private readonly _ipc: IpcService
  ) { }

  selectSubdomain(subdomain: Subdomain) {
    if (subdomain) {
      this.selectedSubdomain = subdomain;
    }
  }
}
