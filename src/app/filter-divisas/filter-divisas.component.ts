/*import { FilterDivisasComponent } from './../filter-divisas';*/
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-filter-divisas',
  templateUrl: './filter-divisas.component.html',
  styleUrls: ['./filter-divisas.component.css'],
  providers: [NgbDropdownConfig] // add NgbDropdownConfig to the component providers
})

export class FilterDivisasComponent implements OnInit {
  @Output() onAdd = new EventEmitter<any>();

  constructor(config: NgbDropdownConfig) {
    config.placement = 'bottom-left';
    config.autoClose = false;
  }

  ngOnInit() {
  }
  addSeries(divisa) {
    console.log('entre a entregarme', divisa)
    this.onAdd.emit(divisa);
  }

}
