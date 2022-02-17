import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { CellComponent } from './grid/row/cell/cell.component';
import { GridComponent } from './grid/grid.component';
import { RoutingModule } from './routing.module';
import { RowComponent } from './grid/row/row.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    GridComponent,
    RowComponent,
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    RoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
