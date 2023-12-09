import {Component, Input, Output} from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-number-display',
  //templateUrl: './number-display.component.html',
  styleUrls: ['./number-display.component.css'],
  template: '<div> display value component: {{value}} </div>'
})
export class NumberDisplayComponent {
  @Input()
  value: number = 5;


}
