import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-lesson-edit-form',
  templateUrl: './lesson-edit-form.component.html',
  styleUrls: ['./lesson-edit-form.component.css']
})

export class LessonEditFormComponent {
  constructor(private router: Router) {
    console.log("LessonListPageComponent.constructor()");
  }
  ngOnInit(): void {
    console.log("LessonListPageComponent.ngOnInit()");
  }
  ngOnDestroy(): void {
    console.log("LessonListPageComponent.ngOnDestroy()");
  }
  onClickSubmit() {
    // could execute code (send save request to server)... then navigate
    this.router.navigate(['lesson-list']).then(res => {})
  }
}
