import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
          { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
          { path: 'create', loadChildren: () => import('./create/create.module').then(m => m.CreateModule), canActivate: [AuthGuard] },
          { path: 'mydashboard', loadChildren: () => import('./mydashboard/mydashboard.module').then(m => m.MydashboardModule), canActivate: [AuthGuard] },
        ]
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
export class LayoutRoutingModule { }
