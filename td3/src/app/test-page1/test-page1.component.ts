import { Component } from '@angular/core';

@Component({
  selector: 'app-test-page1',
  templateUrl: './test-page1.component.html',
  styleUrls: ['./test-page1.component.css']
})
export class TestPage1Component {
  numberValue = 1;
  onClickIncrementValue() {
    this.numberValue++;
  }
  onInputChanged($event: Event) {
    console.log("input changed", $event)
    const input = <HTMLInputElement> $event.target;
    const textValue: string = input.value;
    console.log('input text value:', textValue);
    this.numberValue= +textValue;
    console.log('input number value:', this.numberValue);
  }

  onDecr10($event: number) {
    this.numberValue -= 10;
  }
  onDecr1($event: number) {
    this.numberValue -= 1;
  }
  onIncr1($event: number) {
    this.numberValue += 1;
  }
  onIncr10($event: number) {
    this.numberValue += 10;
  }



}

