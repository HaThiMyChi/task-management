import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../core/models/task.model';
import { Store, select } from '@ngrx/store';
import { loadTasks } from '../store/task.actions';
import { selectAllTasks, selectTaskLoading, selectTaskError } from '../store/task.selectors';
import { isPlatformBrowser } from '@angular/common';
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { TaskService } from '../core/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})

export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  columnDefs = [
    { headerName: 'Title', field: 'title', sortable: true, filter: true },
    { headerName: 'Description', field: 'description', sortable: true, filter: true },
    { headerName: 'Due Date', field: 'dueDate', sortable: true, filter: true },
    { headerName: 'Priority', field: 'priority', sortable: true, filter: true },
    { headerName: 'Status', field: 'status', sortable: true, filter: true }
  ];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }
}