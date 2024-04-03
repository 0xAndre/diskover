import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdomainsComponent } from './subdomains.component';

describe('SubdomainsComponent', () => {
  let component: SubdomainsComponent;
  let fixture: ComponentFixture<SubdomainsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubdomainsComponent]
    });
    fixture = TestBed.createComponent(SubdomainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
