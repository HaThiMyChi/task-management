import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TaskService } from '../core/services/task.service';
import * as TaskActions from './task.actions';
import { Store, select } from '@ngrx/store';

@Injectable()
export class TaskEffects {
  loadTasks$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.loadTasks),
    mergeMap(() => this.taskService.getTasks().pipe(
      map(tasks => TaskActions.tasksLoaded({ tasks })),
      catchError(error => of(TaskActions.loadTasksFailure({ error })))
    ))
  ));

  constructor(
    private actions$: Actions,
    private taskService: TaskService,
    private store: Store
  ) {}
}