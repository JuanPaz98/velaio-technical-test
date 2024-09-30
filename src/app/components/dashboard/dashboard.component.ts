import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Todo } from 'src/app/core/interfaces/todo.interface';

import { ApiConsumerService } from 'src/app/core/services/api-consumer.service';
import { FiltersComponent } from 'src/app/shared/components/filters/filters.component';
import { TodoItemComponent } from 'src/app/shared/components/todo-item/todo-item.component';
import { SearchCriteria } from 'src/app/shared/interfaces/search-criteria.interface';
import { TodoVm } from 'src/app/shared/interfaces/todo-vm.interface';
import { TodoFormComponent } from "../../shared/components/todo-form/todo-form.component";
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
    FilterPipe,
    TodoFormComponent,
],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  public data: Todo[] = [];
  public tableConfig!: TodoVm[];
  public searchCriteria!: SearchCriteria;
  public isFormExpanded = false;
  public toggleButtonLabel = 'Open Todo Form'
  
  constructor(
    private apiConsumerService: ApiConsumerService
  ) {}

  ngOnInit(): void {
    this.getData();
  }
  
  public onFormDataEmitter(event: any): void {
    this.apiConsumerService.createTodo(event).subscribe(resp => {
      console.log('saved', resp)
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

  public openForm() {
    this.isFormExpanded 
    ? this.toggleButtonLabel = 'Open Todo Form'
    : this.toggleButtonLabel = 'Close Todo Form';
    this.isFormExpanded = !this.isFormExpanded;
  }

  public onCancelEmitter(event: any) {
    this.isFormExpanded = false;
  }

  public onCompleteTaskEmitter(event: boolean, element: Todo) {
    element.completed = event
    this.apiConsumerService.updateTodo(element.id, element).subscribe(res => {
      console.log('updated', res);
    })
  }

  private getData() {
    this.apiConsumerService.getAllTodos().subscribe(response => {
      this.data = response
    })
  }
}
