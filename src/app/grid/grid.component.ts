import { Component } from '@angular/core';

import { GridService } from './grid.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent {
  rows: string[];

  constructor(
    private gridService: GridService,
  ) {
    this.rows = Array(this.gridService.rows)
      .fill('');
  }
}
