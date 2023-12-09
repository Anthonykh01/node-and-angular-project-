import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-lesson-list-page',
  templateUrl: './lesson-list-page.component.html',
  styleUrls: ['./lesson-list-page.component.css']
})
export class LessonListPageComponent {
constructor(private http: HttpClient) {
}
GetLesson(){
  this.http.get('/api/package').subscribe(
    (data: any) => { // Adding 'any' type or a more specific interface/type if known
      console.log(data);
      // You can also assign this data to a variable to use it in your template
    },
    (error: any) => { // Adding 'any' type, or use HttpErrorResponse for more specific typing
      console.error('Error fetching data: ', error);
    }
  );

}
}
