import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'skill-form',
  standalone: true,
  imports:[
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.scss']
})
export class SkillFormComponent {

  @Output() skillFormChanged = new EventEmitter<FormGroup>();

  skillForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.skillForm = this.fb.group({
      description: ''
    });

    this.skillForm.valueChanges.subscribe(() => {
      this.skillFormChanged.emit(this.skillForm);
    });
  }
}
