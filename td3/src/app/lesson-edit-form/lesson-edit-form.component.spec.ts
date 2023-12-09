import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonEditFormComponent } from './lesson-edit-form.component';

describe('LessonEditFormComponent', () => {
  let component: LessonEditFormComponent;
  let fixture: ComponentFixture<LessonEditFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LessonEditFormComponent]
    });
    fixture = TestBed.createComponent(LessonEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
