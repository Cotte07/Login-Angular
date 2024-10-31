import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router){

  }

  onSubmit(loginForm: any){
    this.http.post("http://127.0.0.1:8000/login/", loginForm.value).subscribe(
      (data: any)=>{
        console.log(data); 
        if('token' in data){
          this.router.navigateByUrl('')  //se agrega la ruta de la pagina a la que se quiere ir
        }

      }
    )
  }
  
}
