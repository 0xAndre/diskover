import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdomainsViewerComponent } from './subdomains-viewer.component';

describe('SubdomainsViewerComponent', () => {
  let component: SubdomainsViewerComponent;
  let fixture: ComponentFixture<SubdomainsViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubdomainsViewerComponent]
    });
    fixture = TestBed.createComponent(SubdomainsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
