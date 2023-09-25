import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaPiezaComponent } from './nueva-pieza.component';

describe('NuevaPiezaComponent', () => {
    let component: NuevaPiezaComponent;
    let fixture: ComponentFixture<NuevaPiezaComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [NuevaPiezaComponent]
        });
        fixture = TestBed.createComponent(NuevaPiezaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
