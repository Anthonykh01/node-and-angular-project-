import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'td3';
  constructor(){
    console.log('debugging from angular -typescript')
  }

  ngOnInit(): void {
    console.log(' Appcomponent oninit')
  }
}
