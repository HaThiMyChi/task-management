import { createReducer, on } from '@ngrx/store';
import { Task } from '../core/models/task.model';
import * as TaskActions from './task.actions';

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

export const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null
};

export const TaskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasks, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
    loading: false
  })),
  
  on(TaskActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
);