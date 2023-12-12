import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardReviewComponent } from './flashcard-review.component';

describe('FlashcardReviewComponent', () => {
  let component: FlashcardReviewComponent;
  let fixture: ComponentFixture<FlashcardReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlashcardReviewComponent]
    });
    fixture = TestBed.createComponent(FlashcardReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
