import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-divisas',
  templateUrl: './filter-divisas.component.html',
  styleUrls: ['./filter-divisas.component.css'],
})

export class FilterDivisasComponent implements OnInit {
  divisas = [
    { name: 'Dolar', value: 'dolar'}, 
    { name: 'Euro', value: 'euro'}, 
    { name: 'UTM', value: 'utm'}, 
    { name: 'UF', value: 'uf'}, 
    { name: 'TCM', value: 'tcm'}, 
    { name: 'LIBRA', value: 'libra'}, 
    { name: 'Dolar Canadiense', value: 'dolar_canadiense'}, 
    { name: 'Sol Peruano', value: 'sol_peruano'}, 
    { name: 'Peso Mexicano', value: 'peso_mexicano'}, 
    { name: 'Peso Colombiano', value: 'peso_colombiano'}, 
    { name: 'Peso Argentino', value: 'peso_argentino'}, 
    { name: 'Franco', value: 'franco'}
  ];
  selectedDivisas = [];
  @Output() onAdd = new EventEmitter<any>();

  constructor() {
  }

  onChangeDivisas(list){
    this.selectedDivisas = list.selectedOptions.selected.map(item => item.value);
    this.onAdd.emit(this.selectedDivisas);
  }

  ngOnInit() {
  }

}
