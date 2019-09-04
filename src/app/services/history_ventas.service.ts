
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

import { UserService } from  '../services/authentication.service';
import { VentasInterface } from '../models/models-history-ventas';
import { VentasResponse } from '../models/model.history_venta';
import { from } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HistoryVentasService {
    public url: string;
  
    constructor( private _http:HttpClient, private userService:UserService){ }
  
    headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("accessToken")
    });
  
    private baseurl = 'https://marsol-test.herokuapp.com';
    
  
    getAllVentas(): Observable<VentasResponse> {
        console.log(this.headers , "ss")
      return this._http.get<VentasResponse>(`${this.baseurl}/history`, {headers: this.headers});
    }
  
    /* getVentasById(id: string): Observable<VentaResponse> {
      return this._http.get<VentaResponse>(`${this.baseurl}/get/`+id, {headers: this.headers});
    } */
  }