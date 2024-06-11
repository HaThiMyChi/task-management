import { createReducer, on } from '@ngrx/store';
import { Task } from '../core/models/task.model';
import * as TaskActions from './task.actions';

export interface TaskState {
  tasks: Task[];
  error: string | null;
}

export const initialState: TaskState = {
  tasks: [],
  error: null
};

export const TaskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasks, state => ({ ...state })),
  on(TaskActions.tasksLoaded, (state, { tasks }) => ({ ...state, tasks })),
  on(TaskActions.loadTasksFailure, (state, { error }) => ({ ...state, error }))
  // on(TaskActions.editTask, (state, { task }) => ({
  //   ...state,
  //   tasks: state.tasks.map(t => t.id === task.id ? task : t)
  // })),
  // on(TaskActions.deleteTask, (state, { taskId }) => ({
  //   ...state,
  //   tasks: state.tasks.filter(t => t.id !== taskId)
  // }))
);