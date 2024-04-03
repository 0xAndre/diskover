import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoveredUrlsComponent } from './discovered-urls.component';

describe('DiscoveredUrlsComponent', () => {
  let component: DiscoveredUrlsComponent;
  let fixture: ComponentFixture<DiscoveredUrlsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscoveredUrlsComponent]
    });
    fixture = TestBed.createComponent(DiscoveredUrlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
