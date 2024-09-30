import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonFormComponent } from '../person-form/person-form.component';

@Component({
  selector: 'todo-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    PersonFormComponent
  ],
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit{

  public todoForm!: FormGroup;

  @Output() formDataEmitter = new EventEmitter<any>();
  @Output() cancelEmitter = new EventEmitter<any>()

  constructor(private fb: FormBuilder){}

  ngOnInit() {
    this.todoForm = this.fb.group({
      title: '',
      completed: false,
      persons: this.fb.array([
        this.fb.control('', [Validators.required])
      ]),
    });
  }

  get persons(): FormArray {
    return this.todoForm.get('persons') as FormArray;
  }

  public addPerson() {
    return this.persons.push(this.fb.control(''))
  }

  public onPersonFormChanged(personFormGroup: FormGroup<any>, index: number) {
    this.persons.controls[index].setValue(personFormGroup.value)
  }

  public submit() {
    this.formDataEmitter.emit(this.todoForm.value);
  }

  public cancel() {
    this.cancelEmitter.emit();
  }
}
