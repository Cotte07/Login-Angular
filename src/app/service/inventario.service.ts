import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventario } from '../interfaces/inventario.interface';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private apiUrl = 'http://127.0.0.1:8100/inventario/';
  private apiUrlBase = 'http://127.0.0.1:8100';

  constructor(private http: HttpClient) { }

  getInventario(): Observable<Inventario[]>{
    return this.http.get<Inventario[]>(this.apiUrl);
  }

  eliminarProducto(id: number): Observable<any> { //metodo para eliminar un producto
    return this.http.post<any>(`${this.apiUrlBase}/eliminar_producto/${id}/`, {});
  }

}
