import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncargoComponent } from './encargos.component';

describe('EncargoComponent', () => {
  let component: EncargoComponent;
  let fixture: ComponentFixture<EncargoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncargoComponent]
    });
    fixture = TestBed.createComponent(EncargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
