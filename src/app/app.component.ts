import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Subscription } from 'rxjs';

import { GridService } from './grid/grid.service';
import { ServiceWorkerService } from './service-worker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  subscription?: Subscription;
  timer = 0;

  constructor(
    private gridService: GridService,
    private swService: ServiceWorkerService,
    private swUpdate: SwUpdate,
  ) { }

  ngOnInit(): void {
    this.timer = window.setInterval(this.refresh.bind(this), 60000);

    this.subscription = this.swService.hasUpdate$
      .subscribe(() => this.swUpdate.activateUpdate()
        .then(() => document.location.reload()));
  }

  ngOnDestroy(): void {
    this?.subscription?.unsubscribe();
    window.clearInterval(this.timer);
  }

  @HostListener('window:visibilitychange', [])
  refresh(): void {
    if (!document.hidden) {
      this.gridService.refresh();
    }
  }
}
