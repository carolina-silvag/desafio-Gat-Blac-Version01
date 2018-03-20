// Importar HttpClientModule
import { HttpClientModule } from '@angular/common/http';
import { DatosService } from './services/datos.service'

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
 
import { AppComponent } from './app.component';
import { GraphicComponent } from './graphic/graphic.component';
import { FilterComponent } from './filter/filter.component';
import { FilterDivisasComponent } from './filter-divisas/filter-divisas.component';
import { FilterFechaComponent } from './filter-fecha/filter-fecha.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
/*import {  BootstrapComponent } from './bootstrap';*/

// componentes externos
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, MatInputModule, MatExpansionModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    GraphicComponent,
    FilterComponent,
    FilterDivisasComponent,
    FilterFechaComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule
  ],
  providers: [
   DatosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
