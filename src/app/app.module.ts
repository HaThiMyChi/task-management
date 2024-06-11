
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TaskReducer } from './store/task.reducer';
import { TaskEffects } from './store/task.effects';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskService } from './core/services/task.service';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgGridModule,
    StoreModule.forRoot({ task: TaskReducer }),
    EffectsModule.forRoot([TaskEffects])
  ],
  providers: [
    provideClientHydration(),
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
