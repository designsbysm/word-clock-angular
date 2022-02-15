import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { GridService } from '../../grid.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
})
export class CellComponent implements OnInit, OnDestroy {
  @Input() colID = -1;
  @Input() rowID = -1;
  subscriptions: Subscription[] = [];
  random = '';
  time = '';

  constructor(
    private gridService: GridService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(this.gridService.random.subscribe(grid => {
      this.random = grid[this.rowID][this.colID];
    }));

    this.subscriptions.push(this.gridService.time.subscribe(grid => {
      this.time = grid[this.rowID][this.colID];
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
