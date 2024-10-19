import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  constructor(private http:HttpClient){

  }

  loguear(){
    this.http.get("http://127.0.0.1:8000/inventario/").subscribe(
      (data) =>{
      
      } 
    ) 
  }
}
