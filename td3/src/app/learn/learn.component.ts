// learn.component.ts
import { Component, OnInit } from '@angular/core';
import { Course, CourseService } from '../course.service'; // Import the Course interface

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent implements OnInit {
  courses: Course[] = []; // Define courses as an array of Course

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(
      (data: Course[]) => { // Add the Course[] type to the data parameter
        this.courses = data;
      },
      error => {
        console.error('There was an error fetching courses', error);
      }
    );
  }
}
