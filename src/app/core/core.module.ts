import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../material/material.module';
import {FormsModule} from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



@NgModule({
  declarations: [DashboardComponent, LoginComponent, PageNotFoundComponent],
  exports: [DashboardComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule
  ]
})
export class CoreModule { }
