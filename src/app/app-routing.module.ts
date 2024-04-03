import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearcherComponent } from './components/searcher/searcher.component';
import { OverviewComponent } from './components/overview/overview.component';
import { SubdomainsComponent } from './components/subdomains/subdomains.component';
import { IpsHistoryComponent } from './components/ips-history/ips-history.component';
import { GrepComponent } from './components/grep/grep.component';
import { DiscoveredUrlsComponent } from './components/discovered-urls/discovered-urls.component'

const routes: Routes = [
  {
    path: 'overview',
    component: OverviewComponent
  },
  {
    path: 'subdomains',
    component: SubdomainsComponent
  },
  {
    path: 'ipshistory',
    component: IpsHistoryComponent
  },
  {
    path: 'grep',
    component: GrepComponent
  },
  {
    path: 'discoveredUrls',
    component: DiscoveredUrlsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
