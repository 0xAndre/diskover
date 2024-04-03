import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpsHistoryComponent } from './ips-history.component';

describe('IpsHistoryComponent', () => {
  let component: IpsHistoryComponent;
  let fixture: ComponentFixture<IpsHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IpsHistoryComponent]
    });
    fixture = TestBed.createComponent(IpsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
