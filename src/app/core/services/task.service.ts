import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // private apiUrl = 'http://localhost:3000/tasks';
  private apiUrl = 'db.json';

  constructor(private http: HttpClient) {}

  // getTasks(): Observable<Task[]> {
  //   return this.http.get<Task[]>(this.apiUrl).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  
  getTasks(): Observable<Task[]> {
    console.log('data task', this.http.get<Task[]>(this.apiUrl))
    return this.http.get<Task[]>(this.apiUrl);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Url error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}