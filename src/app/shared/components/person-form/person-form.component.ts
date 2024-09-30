import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output, } from '@angular/core';
import { AbstractControl, ControlContainer, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
      name: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.required, this.ageValidator]],
      skills: this.fb.array([
        this.fb.control('', [this.minSkillsValidator])
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

  public ageValidator(control: AbstractControl) {
    const value = control.value;
    return value && value >= 18 ? null : { underage: true };
  }

  public minSkillsValidator(control: AbstractControl) {
    const skillsArray = control as FormArray;
    return skillsArray.length > 0 ? null : { noSkills: true };
  }
}
