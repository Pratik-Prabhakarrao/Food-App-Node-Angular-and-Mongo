import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MESSAGE: any = {
  required : "Should not be empty",
  email : 'Email is not valid',
  minlength: "Field is too short",
  notMatch: "Password and confirm Password doese not match ! "
}

@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnInit, OnChanges {

@Input()
control!: AbstractControl;

@Input()
showErrorsWhen : boolean = true;

errorMessages: string[] = [];

ngOnChanges(changes: SimpleChanges): void {
  this.checkValidation();
}

ngOnInit(): void{
  this.control.statusChanges.subscribe(()=>{
    this.checkValidation();
  });

  this.control.valueChanges.subscribe(() =>{
    this.checkValidation();
  });
}



checkValidation() { 
  const error = this.control.errors;
  if(!error){
    this.errorMessages = [];
    return;
  }

  const errorKeys = Object.keys(error);
  this.errorMessages = errorKeys.map(key => VALIDATORS_MESSAGE[key])

}
}