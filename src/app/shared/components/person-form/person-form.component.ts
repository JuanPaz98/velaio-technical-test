import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output, } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SkillFormComponent } from "../skill-form/skill-form.component";

@Component({
  selector: 'person-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SkillFormComponent
],
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, {skipSelf: true, host: true})
    }
  ]
})
export class PersonFormComponent implements OnInit{

  @Output() personFormChanged = new EventEmitter<FormGroup>();

  personForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.personForm = this.fb.group({
      name: '',
      age: '',
      skills: this.fb.array([
        this.fb.control('', [])
      ]),
    });

    this.personForm.valueChanges.subscribe(() => {
      this.personFormChanged.emit(this.personForm);
    });
  }

  get skills(): FormArray {
    return this.personForm.get('skills') as FormArray;
  }

  public onAddSkill() {
    return this.skills.push(this.fb.control(''))
  }

  public onSkillsFormChanged(skillFormGroup: FormGroup<any>, index: number) {
    this.skills.controls[index].setValue(skillFormGroup.value)
  }
}
