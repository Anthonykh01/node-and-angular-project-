import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService, Flashcard } from '../course.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-flashcard-review',
  templateUrl: './flashcard-review.component.html',
  styleUrls: ['./flashcard-review.component.css']
})
export class FlashcardReviewComponent implements OnInit {
  flashcards: Flashcard[] = [];
  currentFlashcard: Flashcard | undefined;
  currentIndex = 0;
  message = '';

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    const courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    this.courseService.getFlashcardsForCourse(courseId).subscribe(data => {
      this.flashcards = data;
      this.currentFlashcard = this.flashcards.length > 0 ? this.flashcards[0] : undefined;
      if (!this.currentFlashcard) {
        this.message = 'You have finished your assigned cards for today.';
      }
    });
  }

  rateFlashcard(difficulty: 'Easy' | 'Medium' | 'Hard'): void {
    if (this.currentFlashcard) {
      this.http.put(`/api/flashcard/${this.currentFlashcard.id}`, { userResponse: difficulty })
        .subscribe(() => {
          this.currentIndex++;
          if (this.currentIndex < this.flashcards.length) {
            this.currentFlashcard = this.flashcards[this.currentIndex];
          } else {
            this.currentFlashcard = undefined;
            this.message = 'You have finished your assigned cards for today.';
          }
        }, error => console.error('Error updating flashcard', error));
    }
  }
}
