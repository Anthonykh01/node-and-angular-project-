import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberStepsComponent } from './number-steps.component';

describe('NumberStepsComponent', () => {
  let component: NumberStepsComponent;
  let fixture: ComponentFixture<NumberStepsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumberStepsComponent]
    });
    fixture = TestBed.createComponent(NumberStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
