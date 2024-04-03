import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrepComponent } from './grep.component';

describe('GrepComponent', () => {
  let component: GrepComponent;
  let fixture: ComponentFixture<GrepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GrepComponent]
    });
    fixture = TestBed.createComponent(GrepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
