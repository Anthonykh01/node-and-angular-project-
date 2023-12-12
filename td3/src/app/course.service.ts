import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the Course interface to match your backend structure
export interface Course {
  id: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = '/api/course'; // Using the proxy for backend requests

  constructor(private http: HttpClient) { }

  // Use Course interface to type the return value of getCourses()
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }
}
