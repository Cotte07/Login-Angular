import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lote } from '../interfaces/lote.interface';

@Injectable({
  providedIn: 'root'
})
export class LoteService {

  private apiUrl = 'http://localhost:8100/producto/rotacion/';

  constructor(private http: HttpClient) { }
  
  getDatos(): Observable<Lote[]>{
    return this.http.get<Lote[]>(this.apiUrl);
  }
}