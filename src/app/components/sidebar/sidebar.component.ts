import { Component } from '@angular/core';

// global
import { AppGlobals } from '../../app.globals';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(
    public appGlobals: AppGlobals
  ) { }

}
