import { Injectable } from '@angular/core';
import { Fecha } from "./../fecha";
import { IEmployee } from "./../employee";
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';


@Injectable()
export class DatosService {
  fecha: Observable<Fecha>;
  url = `http://localhost:3000`
  constructor(
    public http: HttpClient
  ){}


  ngOnInit() {
    /*this.getProductos();*/
  }

  getProductosDivisas(fechaDesde): Observable<IEmployee>  {
    return this.http.get<IEmployee>(this.url + '/divisas?fecha='+fechaDesde).map(res => res);

  }

  getProductosMasDivisas(fechaDesde): Observable<IEmployee>{
    return this.http.get<IEmployee>(this.url + '/masdivisas?fecha='+fechaDesde).map(res => res);
  }


}
