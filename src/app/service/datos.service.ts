import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  private apiUrl = 'http://127.0.0.1:8100/producto/producto/';

  constructor(private http: HttpClient) { }

  getDatos(): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.apiUrl);
  }
}
