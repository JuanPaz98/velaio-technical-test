import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/core/interfaces/todo.interface';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'todo-item',
  standalone: true,  
  imports: [
    CommonModule,
    MatCheckboxModule,
    FormsModule
  ],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  @Input() config!: Todo;

  @Output() checkedEmitter = new EventEmitter<any>();


  public onChecked(event: any): void {
    this.checkedEmitter.emit(event.checked);
  }
}
