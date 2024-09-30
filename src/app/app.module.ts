import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { MatDialogModule } from '@angular/material/dialog';
import { SuccessMessageComponent } from './shared/components/success-message/success-message.component';
@NgModule({
  declarations: [
    AppComponent,
    SuccessMessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DashboardComponent,
    BrowserAnimationsModule,
    MatDialogModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
