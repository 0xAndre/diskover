import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';

// components
import { AppComponent } from './app.component';
import { SearcherComponent } from './components/searcher/searcher.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { OverviewComponent } from './components/overview/overview.component';
import { SubdomainsComponent } from './components/subdomains/subdomains.component';
import { SubdomainsViewerComponent } from './components/subdomains/subdomains-viewer/subdomains-viewer.component';
import { IpsHistoryComponent } from './components/ips-history/ips-history.component';
import { GrepComponent } from './components/grep/grep.component';
import { DiscoveredUrlsComponent } from './components/discovered-urls/discovered-urls.component';

// services
import { IpcService } from './services/ipc.service';

// global
import { AppGlobals } from './app.globals';
import { FooterComponent } from './components/footer/footer.component';





@NgModule({
  declarations: [
    AppComponent,
    SearcherComponent,
    SidebarComponent,
    OverviewComponent,
    SubdomainsComponent,
    SubdomainsViewerComponent,
    IpsHistoryComponent,
    GrepComponent,
    DiscoveredUrlsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [IpcService, AppGlobals],
  bootstrap: [AppComponent]
})
export class AppModule { }
