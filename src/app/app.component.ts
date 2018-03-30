import { Component, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { GraphicComponent } from './graphic/graphic.component';
import { DatosService } from './services/datos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild(GraphicComponent) child:GraphicComponent;
  title = 'app';
  divisa = '';

  onAddDivisa(divisaInput){
  	this.divisa = divisaInput;
  	this.child.addSeries(this.divisa);
  }
  onfecha(fecha){
    this.child.createChart(fecha);
  }
}


