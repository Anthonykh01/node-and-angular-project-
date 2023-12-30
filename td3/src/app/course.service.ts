import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Course {
  id: number;
  name: string;
  description: string;
}

export interface Flashcard {
  id?: number;  // id is optional
  courseId: number;
  question: string;
  answer: string;
  nextReviewDate?: Date;
  easeFactor?: number;
  interval?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = '/api/course';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  getFlashcardsForCourse(courseId: number): Observable<Flashcard[]> {
    return this.http.get<Flashcard[]>(`${this.apiUrl}/${courseId}/flashcard`);
  }

  addFlashcard(courseId: number, flashcard: Flashcard): Observable<Flashcard> {
    return this.http.post<Flashcard>('/api/flashcard', flashcard);
  }

  addCourse(newCourse: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, newCourse);
  }
}
