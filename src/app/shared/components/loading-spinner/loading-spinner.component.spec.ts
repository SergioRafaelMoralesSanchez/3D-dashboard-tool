import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterOutlet } from '@angular/router';
import { LoadingSpinnerComponent } from "./loading-spinner.component";

describe('LoadingSpinnerComponent', () => {
    let component: LoadingSpinnerComponent;
    let fixture: ComponentFixture<LoadingSpinnerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                RouterOutlet,
                CommonModule,
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(LoadingSpinnerComponent);
        component = fixture.componentInstance;

    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });
    describe('render', () => {
        it('should create component', () => {
            expect(component).toBeTruthy();
        });
    });
});
