import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastoAdicionalComponent } from './gasto-adicional.component';

describe('GastoAdicionalComponent', () => {
  let component: GastoAdicionalComponent;
  let fixture: ComponentFixture<GastoAdicionalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GastoAdicionalComponent]
    });
    fixture = TestBed.createComponent(GastoAdicionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
