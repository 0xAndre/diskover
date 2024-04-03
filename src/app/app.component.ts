import { Component } from '@angular/core';

// globals
import { AppGlobals } from './app.globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Diskover';

  constructor(public appGlobals: AppGlobals) {}
}
