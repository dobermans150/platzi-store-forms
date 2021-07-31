import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StepperComponent),
      multi: true
    }
  ]
})
export class StepperComponent implements OnInit, ControlValueAccessor {
  currentValue = 0;
  onChange = (_: any) => {};
  onTouche = () => {};
  isDisabled: boolean;
  constructor() {}

  ngOnInit(): void {}

  add() {
    this.currentValue = this.currentValue + 1;
    this.onTouche();
    this.onChange(this.currentValue);
  }

  sub() {
    this.currentValue = this.currentValue - 1;
    this.onTouche();
    this.onChange(this.currentValue);
  }

  writeValue(Value: number):void {
    if (Value) {
      this.currentValue = Value;
    }
  }
  registerOnChange(fn: any):void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any):void {
    this.onTouche = fn;
  }
  setDisabledState(isDisabled: boolean):void {
    this.isDisabled = isDisabled;
  }
}
