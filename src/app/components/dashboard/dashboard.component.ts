import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Todo } from 'src/app/core/interfaces/todo.interface';

import { ApiConsumerService } from 'src/app/core/services/api-consumer.service';
import { FiltersComponent } from 'src/app/shared/components/filters/filters.component';
import { TodoItemComponent } from 'src/app/shared/components/todo-item/todo-item.component';
import { SearchCriteria } from 'src/app/shared/interfaces/search-criteria.interface';
import { TodoVm } from 'src/app/shared/interfaces/todo-vm.interface';
import { FilterPipe } from "../../shared/pipes/filter.pipe";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    FiltersComponent,
    TodoItemComponent,
    FilterPipe
],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  public data: Todo[] = [];
  public tableConfig!: TodoVm[];
  public searchCriteria!: SearchCriteria
  
  constructor(private apiConsumerService: ApiConsumerService) {}

  ngOnInit(): void {
    this.getData();
  }

  public completeTask() {
    // this.completed = true;
  }

  public sendData() {
    // const data: Todo = {
    //   title:'fdsafdasfda',
    //   completed: false,
    //   userId: 1
    // }

    // this.apiConsumerService.createTodo(data).subscribe(res => {
    //   console.log(res);
    //   console.log(this.data);
    // })
  }

  public onCompletedTaskEmitter(element: Todo) { 
    this.apiConsumerService.updateTodo(element.id, element).subscribe(res => {
      console.log('updated', res);
    })
  }

  public onDeletedTaskEmitter(id: number) {
    this.apiConsumerService.deleteTodo(id).subscribe(() => {
      console.log('deleted', id);
      this.getData();
    })
  }

  public onFiltersChanged(event: SearchCriteria) {
    this.searchCriteria = {...event}
  }

  private getData() {
    this.apiConsumerService.getAllTodos().subscribe(response => {
      this.data = response
    })
  }
}
