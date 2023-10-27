import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenciasComponent } from './preferencias.component';

describe('PreferenciasComponent', () => {
  let component: PreferenciasComponent;
  let fixture: ComponentFixture<PreferenciasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreferenciasComponent]
    });
    fixture = TestBed.createComponent(PreferenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});