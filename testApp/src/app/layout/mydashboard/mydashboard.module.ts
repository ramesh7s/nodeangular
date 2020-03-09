import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule, MatDividerModule, MatIconModule, MatExpansionModule, MatGridListModule, MatButtonModule } from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

import { MydashboardComponent } from './mydashboard.component';
import { MydashboardRoutingModule } from './mydashboard-routing.module';
import { TruncateModule } from '../../custommodule/truncate/truncate.module';


@NgModule({
  declarations: [MydashboardComponent],
  imports: [
    CommonModule,
    MydashboardRoutingModule,
    MatCardModule, MatDividerModule, MatIconModule, MatExpansionModule, MatGridListModule, MatButtonModule,
    FlexLayoutModule,TruncateModule
  ],
})
export class MydashboardModule { }
