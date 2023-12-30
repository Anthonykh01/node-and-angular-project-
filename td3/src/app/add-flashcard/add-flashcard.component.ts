import { Component, OnInit } from '@angular/core';
import { CourseService, Course, Flashcard } from '../course.service';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-add-flashcard',
  templateUrl: './add-flashcard.component.html',
  styleUrls: ['./add-flashcard.component.css']
})
export class AddFlashcardComponent implements OnInit {
  courses: Course[] = [];
  selectedCourseId: number | null = null;
  newFlashcard: Flashcard = { question: '', answer: '', courseId: 0 };

  constructor(
    private courseService: CourseService,
    private router: Router // Inject Router here
  ) { }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(
      data => this.courses = data,
      error => console.error('Error fetching courses', error)
    );
  }

  onSubmit(): void {
    if (this.selectedCourseId != null) {
      this.newFlashcard.courseId = this.selectedCourseId;
      this.courseService.addFlashcard(this.selectedCourseId, this.newFlashcard).subscribe(
        response => {
          console.log('Flashcard added:', response);
          this.resetForm();
          this.router.navigate(['/review', this.selectedCourseId]); // Navigate after adding flashcard
        },
        error => console.error('Error adding flashcard:', error)
      );
    } else {
      console.error('No course selected');
    }
  }

  private resetForm(): void {
    this.newFlashcard = { question: '', answer: '', courseId: 0 };
    this.selectedCourseId = null;
  }
}
