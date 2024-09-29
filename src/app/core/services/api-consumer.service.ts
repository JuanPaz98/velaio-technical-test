import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../interfaces/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiConsumerService {

  // private URLApi = 'https://velaio-data.onrender.com/todos'
  private URLApi = 'http://localhost:3000/todos'

  constructor(private http: HttpClient) { }

  public getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.URLApi);
  }

  public createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.URLApi, todo)
  }

  public updateTodo(id: number | undefined, todo: Todo ): Observable<Todo> {
    return this.http.put<Todo>(`${this.URLApi}/${id}`, todo);
  }

  public deleteTodo(id: number): Observable<Todo> {
    return this.http.delete<Todo>(`${this.URLApi}/${id}`);
  }

}