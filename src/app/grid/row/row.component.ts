import { Component, Input } from '@angular/core';

import { GridService } from '../grid.service';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
})
export class RowComponent {
  @Input() rowID = -1;
  cells: string[];

  constructor(private gridService: GridService) {
    this.cells = Array(this.gridService.cells)
      .fill('');
  }
}
