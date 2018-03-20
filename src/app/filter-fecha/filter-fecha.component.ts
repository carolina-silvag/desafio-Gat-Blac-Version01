import { Fecha } from "./../fecha";
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-filter-fecha',
  templateUrl: './filter-fecha.component.html',
  styleUrls: ['./filter-fecha.component.css']
})
export class FilterFechaComponent implements OnInit {
  @Input() fecha: Fecha = new Fecha;
  @Output() submit = new EventEmitter<Fecha>();
  fechaForm: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.createForm();
  }

  ngOnInit() {
  }


  getFecha() {
    console.log('entre al click filter fecha')
    
      let newFecha = new Fecha();
      newFecha.desde = this.fecha.desde;
      newFecha.hasta = this.fecha.hasta;
      newFecha.fechas = this.allFechas(this.fecha.desde, this.fecha.hasta)
      console.log(newFecha, 'antes de enviar')
      // this.submit.emit(newFecha);
      /*this.fechaForm.reset();
      console.log(this.fecha, 'por fin')*/
      return newFecha
  }

  allFechas(desde, hasta) {
    desde = this.formatFecha(desde);
    hasta = this.formatFecha(hasta);
    let diffDay = (hasta.getTime() - desde.getTime()) / (1000*60*60*24);
    let actual = new Date();
    let fechas = [];

    for (var i = 0; i <= diffDay; i++) {
      actual = new Date(desde.getTime());
      actual.setDate(actual.getDate() + i);
      fechas.push(this.formatFechaApi(actual));
    }

    console.log(fechas, diffDay, desde, hasta);
    return fechas;
  }

  formatFecha(fechaString) {
    let fechaArray = fechaString.split('/');
    let formatFecha = [fechaArray[1], fechaArray[0], fechaArray[2]].join('-');
    return new Date(formatFecha);
  }

  formatFechaApi(fecha) {
    let y = fecha.getFullYear();
    let m = fecha.getMonth() + 1;
    let d = fecha.getDate();
    m = m < 10 ? '0' + m : m;
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
  }

  createForm() {
    this.fechaForm = this.fb.group({
      desde: [this.fecha.desde, [Validators.required, Validators.minLength(8)]],
      hasta: [this.fecha.hasta],
      indice: [0, [Validators.min(0)]]
    });

    this.fechaForm.valueChanges.subscribe(() => {
      this.fecha.desde = this.fechaForm.value.desde;
      this.fecha.hasta = this.fechaForm.value.hasta;
    })
  }


}
