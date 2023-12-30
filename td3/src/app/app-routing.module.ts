import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LessonEditFormComponent} from "./lesson-edit-form/lesson-edit-form.component";
import {LessonListPageComponent} from "./lesson-list-page/lesson-list-page.component";
import {LessonDetailPageComponent} from "./lesson-detail-page/lesson-detail-page.component";
import {TestPage1Component} from "./test-page1/test-page1.component";
import { LearnComponent } from './learn/learn.component';
import { HomeComponent } from './home/home.component';
import { FlashcardReviewComponent } from './flashcard-review/flashcard-review.component';
import { AddFlashcardComponent } from './add-flashcard/add-flashcard.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path:'lesson-edit-form', component: LessonEditFormComponent },
  { path:'lesson-list', component: LessonListPageComponent },
  { path:'lesson/:id', component: LessonDetailPageComponent },
  { path:'test-page1', component: TestPage1Component },
  {path: 'learn', component: LearnComponent},
  { path: 'review/:courseId', component: FlashcardReviewComponent },
  { path: 'add-flashcard', component: AddFlashcardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
