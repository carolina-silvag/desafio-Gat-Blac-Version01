import { Component, OnInit, ElementRef, ViewChild, Input, EventEmitter } from '@angular/core';
import { Fecha } from "./../fecha";
import { Data } from "./../datosGraphic";
import { chart } from 'highcharts';
import * as Highcharts from 'highcharts';
import { Observable } from 'rxjs/Observable';
import { DatosService } from '../services/datos.service';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css']
})

export class GraphicComponent implements OnInit {
  title = 'Graphic of Divisas';
  count = 0;
  max = 0;
  hayData = false;
  newData = new Data();

  @Input() divisa : string;
  @Input() fechaData: Fecha;

  @ViewChild('chartTarget') chartTarget: ElementRef;

  chart: Highcharts.ChartObject;

  constructor(private datosService: DatosService) {
  }

  createChart(fecha) {
    this.newData = new Data();
    this.max = fecha.fechas.length * 2;
    this.count = 0;

    fecha.fechas.map(fecha => {
      let dataDivisa = this.datosService.getProductosDivisas(fecha).subscribe(res => {
        this.newData.datos.dolar.push({fecha: res.date, valor: res.dolar.value});
        this.newData.datos.euro.push({fecha: res.date, valor: res.euro.value});
        this.newData.datos.utm.push({fecha: res.date, valor: res.utm.value});
        this.newData.datos.uf.push({fecha: res.date, valor: res.uf.value});
        this.newData.datos.tcm.push({fecha: res.date, valor: res.tcm.value});
        this.count++;
        if (this.count == this.max) {
          this.valoresData();
        }
      });

      let dataMasDivisas = this.datosService.getProductosMasDivisas(fecha).subscribe(res => {
        this.newData.datos.dolar_canadiense.push({fecha: res.date, valor: res.dolarCanadiense.value});
        this.newData.datos.franco.push({fecha: res.date, valor: res.franco.value});
        this.newData.datos.libra.push({fecha: res.date, valor: res.libra.value});
        this.newData.datos.sol_peruano.push({fecha: res.date, valor: res.solPeruano.value});
        this.newData.datos.peso_argentino.push({fecha: res.date, valor: res.pesoArgentino.value});
        this.newData.datos.peso_colombiano.push({fecha: res.date, valor: res.pesoColombiano.value});
        this.newData.datos.peso_mexicano.push({fecha: res.date, valor: res.pesoMexicano.value});
        this.newData.datos.real.push({fecha: res.date, valor: res.real.value});
        this.count++;      
        if (this.count == this.max) {
          this.valoresData();
        }
      });
    });
    console.log(this.newData)
    return this.newData;
  }

  ngOnInit() {
  }
    
    ngAfterViewInit() {
      const options: Highcharts.Options = {
        chart: {
        type: 'spline'
        },
        title: {
            text: 'Expresado en pesos'
        },
        subtitle: {
            text: `Fecha: ${this.fechaData} - ${this.fechaData}`
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                month: '%e. %b',
                year: '%b'
            },
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'Valor en Pesos (CLP)'
            },
            min: 0
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x:%e. %b}: {point.y:.2f} pesos'
            },

            plotOptions: {
                spline: {
                    marker: {
                        enabled: true
                    }
                }
            },

        colors: ['#6CF', '#39F', '#06C', '#036', '#000'],

        series: [
        ]
      }
    
      this.chart = chart(this.chartTarget.nativeElement, options);
    }

    addSeries(divisa){
      let data = [];
      console.log('Agregando Serie!!!', this.hayData);

      if (this.hayData) {
        data = this.newData.datos[divisa].map(item => {
          let fecha = this.formatFechaGraphic(item.fecha);
          let valor = this.transformValue(item.valor);
          return [fecha, parseFloat(valor)];
        });
        console.log('Agregando Serie!!!', data);
      }

      this.chart.addSeries({
        name:divisa,
        data:data
      });
    }

    addDataSerie(data) {
      this.chart.addSeries(data);
    }

    removeAllSeries() {
      while(this.chart.series.length > 0)
          this.chart.series[0].remove(true);
      return true;
    }

    valoresData() {
      this.hayData = true;
      let data = this.chart.series.map(serie => {
        return { name: serie.name, data : this.newData.datos[serie.name].map(item => {
          let fecha = this.formatFechaGraphic(item.fecha);
          let valor = this.transformValue(item.valor);
          return [fecha, parseFloat(valor)];
        })};
      });

      this.removeAllSeries();
      for (var i = data.length - 1; i >= 0; i--) {
        this.addDataSerie(data[i]);
      }
    }

    formatFechaGraphic(fecha) {
      let fechaArray = fecha.split('-');
      return Date.UTC(fechaArray[0], fechaArray[1] - 1, fechaArray[2]);
    }

    transformValue(valor) {
      console.log(valor)
      let valorModificado = valor.split('.').join('');
      console.log(valorModificado)
      return valorModificado;
    }
}
