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


// componentes externos
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, MatInputModule, MatExpansionModule, MatListModule, MatGridListModule } from '@angular/material';
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
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatListModule,
    MatGridListModule,

  ],
  providers: [
   DatosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
