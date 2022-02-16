import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { GridService } from './grid/grid.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  timer = 0;

  constructor(
    private gridService: GridService,
  ) { }

  ngOnInit(): void {
    this.timer = window.setInterval(this.refresh.bind(this), 60000);
  }

  ngOnDestroy(): void {
    window.clearInterval(this.timer);
  }

  @HostListener('window:visibilitychange', [])
  refresh(): void {
    if (!document.hidden) {
      this.gridService.refresh();
    }
  }
}
