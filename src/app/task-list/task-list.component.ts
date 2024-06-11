import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../core/models/task.model';
import { Store, select } from '@ngrx/store';
import { loadTasks } from '../store/task.actions';
import { selectTaskError, selectAllTasks } from '../store/task.selectors';
import { isPlatformBrowser } from '@angular/common';
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component

@Component({
  selector: 'app-task-list',
  
  // styleUrl: './task-list.component.scss'
  // standalone: true,
  // imports: [AgGridAngular], // Add Angular Data Grid Component
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  // template: ``
})

export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;
  error$: Observable<any>;
  columnDefs: any[] = [];
  defaultColDef: any;
  rowSelection: string = 'multiple';
  isBrowser: boolean;

  constructor(private store: Store, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.initializeGrid();
    }
    this.tasks$ = this.store.pipe(select(selectAllTasks));
    console.log('tasks', this.tasks$)
    this.error$ = this.store.pipe(select(selectTaskError));
  }

  ngOnInit(): void {
    this.store.dispatch(loadTasks());
  }

  private initializeGrid(): void {
    this.columnDefs = [
      { headerName: 'Title', field: 'title', sortable: true, filter: true },
      { headerName: 'Description', field: 'description', sortable: false, filter: false },
      { headerName: 'Due Date', field: 'dueDate', sortable: true, filter: true },
      { headerName: 'Priority', field: 'priority', sortable: true, filter: true },
      { headerName: 'Status', field: 'status', sortable: false, filter: true }
    ];
    this.defaultColDef = { sortable: true, filter: true };
    this.rowSelection = 'multiple';
  }

  onGridReady(params: any): void {
    params.api.sizeColumnsToFit();
  }
}


//   defaultColDef = {
//     sortable: true,
//     filter: true
//   };

//   columnDefs: ColDef[] = [
//     {headerName: 'Make', field: 'make'},
//     {headerName: 'Model', field: 'model'},
//     {headerName: 'Price', field: 'price', editable: true}
//   ];

//   rowData = [];

//   ngOnInit() {
//     fetch('https://www.ag-grid.com/example-assets/row-data.json')
//       .then(result => result.json())
//       .then(rowData => this.rowData = rowData);
//   }
// }