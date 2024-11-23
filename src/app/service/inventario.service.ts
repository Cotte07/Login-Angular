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
    const token = localStorage.getItem('access_token'); // Obtén el token almacenado
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.get<Inventario[]>(this.apiUrl, {headers} );
  }

  eliminarProducto(id: number): Observable<any> { //metodo para eliminar un producto
    const token = localStorage.getItem('access_token'); // Obtén el token almacenado
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.post<any>(`${this.apiUrlBase}/eliminar_producto/${id}/`, {},{headers});
  }

  getHistorial(): Observable<Historial[]>{
    const token = localStorage.getItem('access_token'); // Obtén el token almacenado
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.get<Historial[]>(this.apirUrl2, {headers} );
  }

  //Guardar datos de un producto
  guardarDatos(formData: any): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.post(`${this.apiUrlBase}/guardarDatos/`, formData, { headers });
  }

  //actualiza el producto segun su Id
  actualizarProducto(productoId: number, formData: any): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.put<any>(`${this.apiUrlBase}/actualizar_producto/${productoId}/`,formData,{ headers });
  }
}
