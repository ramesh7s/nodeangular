import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MydashboardComponent } from './mydashboard.component';

const routes: Routes = [
	{
		path: '', component: MydashboardComponent
	}
];

@NgModule({
  declarations: [],
  imports: [
		CommonModule,
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class MydashboardRoutingModule { }
