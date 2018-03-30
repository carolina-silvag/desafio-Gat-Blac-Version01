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
  dataOrdenado = []

  @Input() divisa : string;
  @Input() fechaData: Fecha;

  @ViewChild('chartTarget') chartTarget: ElementRef;

  chart: Highcharts.ChartObject;

  constructor(private datosService: DatosService) {
    let array = []
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
              // headerFormat: '<b>{series.name}</b><br>',
              formatter: function () {
                let x = this.point.x,
                    y = this.y,
                    divisa = this.point.series.name,
                series = this.series,
                date = new Date(x),
                anterior = null,
                diff = null;
                const MONTH_NAMES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
                ];
                let day = date.getUTCDate();
                let month =  MONTH_NAMES[date.getUTCMonth()];
                let year = date.getUTCFullYear();
                
                for(var key in series.data) {
                  let keyNumber = parseInt(key);
                  if(series.data[keyNumber].x === x && series.data[keyNumber - 1]) {
                      anterior = series.data[keyNumber - 1].y;
                      diff = (y - anterior);
                  }
                }

                return "Divisa :" + divisa + "<br>" + day + "-" + month + "-" + year + ": " + y + "<br>diferencia: " + diff;
              }
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

    addSeries(divisas) {
      this.removeAllSeries();
      for (var i = divisas.length - 1; i >= 0; i--) {
        this.addDivisa(divisas[i]);
      }
    }

    addDivisa(divisa) {
      let data = [];

      if (this.hayData) {
        data = this.newData.datos[divisa].map(item => {
          let fecha = this.formatFechaGraphic(item.fecha);
          let valor = this.transformValue(item.valor);
          return [fecha, parseFloat(valor)];
        });
      }


      this.addDataSerie({
        name:divisa,
        data:data
      });
    }

    addDataSerie(info) {
      let divisa = info.name;
      let data = info.data.sort(function(a, b) {
        if (a[0] > b[0]) {
          return 1;
        }
        if (a[0] < b[0]) {
          return -1;
        }
        return 0;
      });

      this.chart.addSeries({
        name:divisa,
        data:data
      });
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
        this.addDataSerie({
          name:data[i].name,
          data:data[i].data
        });
      }
    }

    formatFechaGraphic(fecha) {
      let fechaArray = fecha.split('-');
      return Date.UTC(fechaArray[0], fechaArray[1] - 1, fechaArray[2]);
    }

    transformValue(valor) {
      let valorModificado = valor.split('.').join('');
      return valorModificado;
    }
}
