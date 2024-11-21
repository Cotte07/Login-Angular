import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventario } from '../interfaces/inventario.interface';
import { Historial } from '../interfaces/historial.interface';


@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private apiUrl = 'http://127.0.0.1:8100/inventario/';
  private apiUrlBase = 'http://127.0.0.1:8100';
  private apirUrl2 = 'http://127.0.0.1:8200/historial/';

  constructor(private http: HttpClient) { }
  
  getInventario(): Observable<Inventario[]>{  //
    return this.http.get<Inventario[]>(this.apiUrl);
  }

  eliminarProducto(id: number): Observable<any> { //metodo para eliminar un producto
    return this.http.post<any>(`${this.apiUrlBase}/eliminar_producto/${id}/`, {});
  }

  getHistorial(): Observable<Historial[]>{
    return this.http.get<Historial[]>(this.apirUrl2);
  }

  //Guardar datos de un producto
  guardarDatos(formData: any): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);

    return this.http.post(`${this.apiUrlBase}/guardarDatos/`, formData, { headers });
  }
}
