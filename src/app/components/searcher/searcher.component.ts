import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// global
import { AppGlobals } from '../../app.globals';

// IPC Electron
import { IpcService } from '../../services/ipc.service';
const { ipcRenderer } = window.require('electron');

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent {
  @ViewChild('codeSnippetsCheckbox') codeSnippetsCheckbox!: ElementRef<HTMLInputElement>;
  @ViewChild('urlsDiscoveredCheckbox') urlsDiscoveredCheckbox!: ElementRef<HTMLInputElement>;
  @ViewChild('subdomainValidatorCheckbox') subdomainValidatorCheckbox!: ElementRef<HTMLInputElement>;

  domainRegexValidator: RegExp = /^(?:(?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/;
  // form
  form!: FormGroup;

  // loaders
  loading: boolean = false

  loadingMessageState: string = 'Loading... Please wait while we polish our turbo boosters';

  constructor(
    private readonly _ipc: IpcService,
    private router: Router,
    private fb: FormBuilder,
    private appGlobals: AppGlobals
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      input: ['', [Validators.required, Validators.pattern(this.domainRegexValidator)]]
    });
  }

  async start() {
    if (this.form.valid) {
      this.startLoading();
      let term = this.form.get('input')?.value;

      ipcRenderer.on('update-loading-state', (event, arg) => {
        this.loadingMessageState = arg;
      });

      let payload = {
        url: term,
        runCodeSnippets: this.codeSnippetsCheckbox.nativeElement.checked,
        runUrlsDiscovered: this.urlsDiscoveredCheckbox.nativeElement.checked,
        runSubdomain: this.subdomainValidatorCheckbox.nativeElement.checked
      }

      const response = await this._ipc.sendMessage('startup', JSON.stringify(payload));
      this.appGlobals.diskover = response;
      ipcRenderer.send('maximize-window');
      this.router.navigate(['/overview']);
    }
  }

  startLoading(): void {
    this.form.get('input')?.disable();
    this.loading = true;
  }

  endLoading(): void {
    this.form.get('input')?.enable();
    this.loading = false;
  }

  handleClick(): void {
    document.getElementById('fileInput')!.click();
  }

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      let fileContent = reader.result as string;

      try {
        this.appGlobals.diskover = JSON.parse(fileContent);
        ipcRenderer.send('maximize-window');
        this.router.navigate(['/overview']);
      } catch (error) {
        alert('Invalid file.')
      }
    };

    reader.readAsText(file);
  }

}
