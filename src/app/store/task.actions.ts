import { createAction, props } from '@ngrx/store';
import { Task } from '../core/models/task.model';

export const loadTasks = createAction('[Task List] Load Tasks');
export const loadTasksSuccess = createAction('[Task List] Load Tasks Success', props<{ tasks: Task[] }>());
export const loadTasksFailure = createAction('[Task List] Load Tasks Failure', props<{ error: string }>());