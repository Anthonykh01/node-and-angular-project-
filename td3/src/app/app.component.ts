import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'td3';

  constructor(private http: HttpClient) {
    console.log('debugging from angular -typescript');
  }

  ngOnInit(): void {
    console.log('AppComponent initialized');
    this.fetchFlashcard();
  }

  fetchFlashcard(): void {
    this.http.get<any>('/api/flashcard').subscribe(
      data => {
        console.log('Flashcard data:', data);
      },
      error => {
        console.error('Error fetching flashcard:', error);
      }
    );
  }
}
