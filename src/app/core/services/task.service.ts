import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { catchError, map} from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // private apiUrl = 'http://localhost:3000/tasks';
  // private tasksUrl  = 'http://localhost:3000/tasks';
  // private tasks: Task[] = [];

  // constructor(private http: HttpClient) {}

  // getTasks(): Observable<Task[]> {
  //   console.log('data get task', this.http.get<any>(this.tasksUrl))
  //   return this.http.get<any>(this.tasksUrl);
  // }

  private taskUrl = 'http://localhost:3000/tasks';
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskUrl);
  }
  
  // getTasks(): Observable<Task[]> {
  //   return this.http.get<Task[]>(this.tasksUrl).pipe(
  //     map(tasks => {
  //       this.tasks = tasks;
  //       console.log('data get tasks', tasks)
  //       return tasks;
  //     }),
  //     catchError(this.handleError)
  //   );
  // }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}