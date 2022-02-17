import { Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ServiceWorkerService {
  hasUpdate$: Observable<VersionReadyEvent>;

  constructor(
    private swUpdate: SwUpdate,
  ) {
    this.hasUpdate$ = this.swUpdate.versionUpdates.pipe(
      filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
    );
  }
}
