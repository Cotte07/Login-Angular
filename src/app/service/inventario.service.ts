import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventario } from '../interfaces/inventario.interface';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private apiUrl = 'http://127.0.0.1:8100/inventario/';

  constructor(private http: HttpClient) { }

  getInventario(): Observable<Inventario[]>{
    return this.http.get<Inventario[]>(this.apiUrl);
  }
}
