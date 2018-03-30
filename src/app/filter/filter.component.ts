import { Fecha } from "./../fecha";
import { Component, OnInit, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FilterFechaComponent } from '../filter-fecha/filter-fecha.component';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  
  panelOpenState: boolean = false;
  @Output() onAddDivisa = new EventEmitter<any>();
  @Output() onfecha = new EventEmitter<any>();
  @ViewChild(FilterFechaComponent) child:FilterFechaComponent;

  constructor() {  
  }

  ngOnInit() {
  }

  onAdd(divisa) {
    this.onAddDivisa.emit(divisa);
  }

  onGenerarGrafico() {
    let fecha = this.child.getFecha();
    this.onfecha.emit(fecha)
  }
}
