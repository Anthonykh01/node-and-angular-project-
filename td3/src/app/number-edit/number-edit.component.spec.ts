import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberEditComponent } from './number-edit.component';

describe('NumberEditComponent', () => {
  let component: NumberEditComponent;
  let fixture: ComponentFixture<NumberEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumberEditComponent]
    });
    fixture = TestBed.createComponent(NumberEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
