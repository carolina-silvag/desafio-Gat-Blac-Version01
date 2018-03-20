import { Component, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { GraphicComponent } from './graphic/graphic.component';
import { DatosService } from './services/datos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  /*directives: [GraphicComponent]*/
})
export class AppComponent {
  @ViewChild(GraphicComponent) child:GraphicComponent;
  title = 'app';
  divisa = '';

  onAddDivisa(divisaInput){
  	this.divisa = divisaInput;
    console.log("divisa en app-root", divisaInput)
  	this.child.addSeries(this.divisa);
    /*this.addSeries.emit(divisa);*/
  }
  onfecha(fecha){
    console.log("fecha en app-root", fecha)
    this.child.createChart(fecha);
    /*this.addSeries.emit(divisa);*/
  }
}


