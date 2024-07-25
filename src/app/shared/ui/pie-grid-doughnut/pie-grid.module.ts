import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PieGridComponent } from './pie-grid.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    PieGridComponent
  ],
    imports: [
        CommonModule,
        NgxChartsModule,
    ],
    exports: [PieGridComponent]
})
export class PieGridModule { }
