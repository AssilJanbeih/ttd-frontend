import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-pie-grid',
  templateUrl: './pie-grid.component.html',
  styleUrls: ['./pie-grid.component.scss'],
})
export class PieGridComponent implements OnInit {
  percentage: number = 0;
  @Input() CurrentNumber: number = 0;
  @Input() TotalNumber: number = 0;
  @Input() PieTitle: string = 'Pie Chart';
  @Input() activeColor: string = '#000';
  @Input() inactiveColor: string = '#F0F0F0';
  @Input() showTitle: boolean = true;
  @Input() view: [number, number] = [180, 180];

  single: any[] = [];
  colorScheme!: Color;

  constructor() {
    Object.assign(this, { this: this.single });
  }

  ngOnInit(): void {
    if (this.CurrentNumber === 0 && this.TotalNumber === 0) {
      this.percentage = 0;
    } else {
      this.percentage = Math.round(
        (this.CurrentNumber / this.TotalNumber) * 100
      );
    }
    this.single = [
      {
        name: 'Done',
        value: this.CurrentNumber,
      },
      {
        name: 'Undone',
        value: this.TotalNumber - this.CurrentNumber,
      },
    ];

    this.colorScheme = {
      name: 'myScheme',
      selectable: true,

      group: ScaleType.Ordinal,
      domain: [this.activeColor, this.inactiveColor],
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.CurrentNumber === 0 && this.TotalNumber === 0) {
      this.percentage = 0;
    } else {
      this.percentage = Math.round(
        (this.CurrentNumber / this.TotalNumber) * 100
      );
    }

    this.single = [
      {
        name: 'Done',
        value: this.CurrentNumber,
      },
      {
        name: 'Undone',
        value: this.TotalNumber - this.CurrentNumber,
      },
    ];

    this.colorScheme = {
      name: 'myScheme',
      selectable: true,
      group: ScaleType.Ordinal,
      domain: [this.activeColor, this.inactiveColor],
    };
  }
}
