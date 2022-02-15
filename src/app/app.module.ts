import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { CellComponent } from './grid/row/cell/cell.component';
import { GridComponent } from './grid/grid.component';
import { RowComponent } from './grid/row/row.component';

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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
