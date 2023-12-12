import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../course.service';
import { HttpClient } from '@angular/common/http';

// Define the Flashcard interface based on your backend structure
interface Flashcard {
  id: number;
  courseId: number;
  question: string;
  answer: string;
  nextReviewDate: Date;
  easeFactor: number;
  interval: number;
}

@Component({
  selector: 'app-flashcard-review',
  templateUrl: './flashcard-review.component.html',
  styleUrls: ['./flashcard-review.component.css']
})
export class FlashcardReviewComponent implements OnInit {
  flashcards: Flashcard[] = [];
  currentFlashcard!: Flashcard;
  currentIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    const courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    this.courseService.getFlashcardsForCourse(courseId).subscribe(data => {
      this.flashcards = data;
      this.currentFlashcard = this.flashcards[0];
    });
  }

  rateFlashcard(difficulty: 'Easy' | 'Medium' | 'Hard'): void {
    if (this.currentFlashcard) {
      // Update the flashcard based on the difficulty rating
      this.http.put(`/api/flashcard/${this.currentFlashcard.id}`, { userResponse: difficulty })
        .subscribe(() => {
          // Move to the next flashcard
          this.currentIndex++;
          if (this.currentIndex < this.flashcards.length) {
            this.currentFlashcard = this.flashcards[this.currentIndex];
          } else {
            // Handle completion of flashcard review
            console.log('Completed review of all flashcards');
          }
        }, error => console.error('Error updating flashcard', error));
    }
  }
}
