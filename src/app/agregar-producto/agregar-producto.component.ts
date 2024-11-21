import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, provideHttpClient, withInterceptors } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { InventarioService } from '../service/inventario.service';

@Component({
  selector: 'app-agregar-producto',
  standalone: true,
  imports: [RouterModule, RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-producto.component.html',
  styleUrl: './agregar-producto.component.css',
})

export class AgregarProductoComponent {
  multiForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private inventarioService: InventarioService
  ) {
    this.multiForm = this.fb.group({
      nombre: [''], proveedor: [''], estadoProducto: ['True'], nombreCategoria: [''], fecha_Rotacion: [''], estado: [''], numero_lote: [''], fecha_compra: [''], cantidad: [''], unidad_medida: [''],
      precio_compra: [''],
    });
  }

  ngOnInit() {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['/login']);
    }
  }

  onSubmit() {
    if (this.multiForm.valid) {
      const formData = this.multiForm.value;

      if (formData.fecha_Rotacion) {
        formData.fecha_Rotacion = new Date(formData.fecha_Rotacion)
          .toISOString()
          .split('T')[0];
      }

      this.inventarioService.guardarDatos(formData).subscribe({
        next: (response: any) => {
          console.log('Datos guardados:', response);
          alert('Datos guardados correctamente');
          this.router.navigate(['']);
        },
        error: (error) => {
          if (error.status === 401) {
            alert('Sesión expirada. Por favor inicie sesión nuevamente');
            this.router.navigate(['/login']);
          } else {
            console.error('Error:', error);
            alert(
              'Error al guardar los datos: ' +
                (error.error?.error || 'Error desconocido')
            );
          }
        },
      });
    } else {
      alert('Por favor, complete todos los campos requeridos');
    }
  }
}