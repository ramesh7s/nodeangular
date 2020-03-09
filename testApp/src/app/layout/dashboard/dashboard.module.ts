import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatDividerModule, MatIconModule, MatExpansionModule, MatGridListModule, MatButtonModule } from '@angular/material';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { TruncateModule } from '../../custommodule/truncate/truncate.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatCardModule, MatDividerModule, MatIconModule, MatExpansionModule, MatGridListModule, MatButtonModule,
    FlexLayoutModule,TruncateModule
  ],
})
export class DashboardModule { }
