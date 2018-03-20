import { Fecha } from "./../fecha";
import { Component, OnInit, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { FilterFechaComponent } from '../filter-fecha/filter-fecha.component';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  providers: [NgbAccordionConfig] 
})
export class FilterComponent implements OnInit {
  @Output() onAddDivisa = new EventEmitter<any>();
  @Output() onfecha = new EventEmitter<any>();
  @ViewChild(FilterFechaComponent) child:FilterFechaComponent;

  constructor(config: NgbAccordionConfig) {
    config.closeOthers = true;
    config.type = 'info';  
  }

  ngOnInit() {
  }

  onAdd(divisa) {
    console.log("divisa en app-filter", divisa)
    this.onAddDivisa.emit(divisa);
  }

  onGenerarGrafico() {
    let fecha = this.child.getFecha();
    this.onfecha.emit(fecha)
  }



}
