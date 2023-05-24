import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncargoCardComponent } from './encargo-card.component';

describe('EncargoCardComponent', () => {
  let component: EncargoCardComponent;
  let fixture: ComponentFixture<EncargoCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncargoCardComponent]
    });
    fixture = TestBed.createComponent(EncargoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
