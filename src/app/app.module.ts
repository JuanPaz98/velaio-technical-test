import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FiltersComponent } from './shared/components/filters/filters.component';
import { TodoItemComponent } from './shared/components/todo-item/todo-item.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DashboardComponent,
    BrowserAnimationsModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
