import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Todo } from 'src/app/core/interfaces/todo.interface';

@Component({
  selector: 'todo-item',
  standalone: true,  
  imports: [
    CommonModule
  ],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  @Input() config!: Todo;
}
