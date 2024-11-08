import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, provideHttpClient, withInterceptors } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthInterceptor } from '../auth.interceptor';

@Component({
  selector: 'app-agregar-producto',
  standalone: true,
  imports: [RouterModule, RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-producto.component.html',
  styleUrl: './agregar-producto.component.css',
})
export class AgregarProductoComponent {
  multiForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient){
    this.multiForm = this.fb.group({
      //campos del modelo Producto
      nombre: [''], proveedor: [''], estadoProducto: ['True'],
      //campos del modelo categoria
      nombreCategoria: [''],
      //campos del modelo lote
      fecha_Rotacion: [''], estado: [''], numero_lote: [''],
      //campo del modelo historial
      fecha_compra: [''],
      //campo del modelo lote_Historial
      cantidad: [''], unidad_medida: [''], precio_compra: ['']
    });
  }
  
  ngOnInit() {
    // Verificar si hay token
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['/login']);
    }
  }

  onSubmit() {
    if (this.multiForm.valid) {
      const formData = this.multiForm.value;
      
      if (formData.fecha_Rotacion) {
        formData.fecha_Rotacion = new Date(formData.fecha_Rotacion)
          .toISOString().split('T')[0];
      }

      // Obtener el token
      const token = localStorage.getItem('access_token');
      
      // Configurar headers con el token
      const headers = new HttpHeaders().set('Authorization',`Token ${token}`);

      this.http.post('http://localhost:8100/guardarDatos/', formData, { headers })
        .subscribe({
          next: (response: any) => { console.log('Datos guardados:', response);
            alert('Datos guardados correctamente');
            this.router.navigate(['']);
          },
          error: (error) => { if (error.status === 401) {
              alert('Sesion expirada. Por favor inicie sesión nuevamente');
              this.router.navigate(['/login']);
            } else {
              console.error('Error:', error);
              alert('Error al guardar los datos: ' + error.error?.error || 'Error desconocido');
            }
          }
        });
    } else {
      alert('Por favor, complete todos los campos requeridos');
    }
  }
}
