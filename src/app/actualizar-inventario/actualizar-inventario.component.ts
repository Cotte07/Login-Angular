import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { InventarioService } from '../service/inventario.service';
import { Inventario } from '../interfaces/inventario.interface';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-actualizar-inventario',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './actualizar-inventario.component.html',
  styleUrl: './actualizar-inventario.component.css',
  providers: [InventarioService]
})
export class ActualizarInventarioComponent implements OnInit {
  inventario: Inventario[] = [];
  inventarioFiltrado: Inventario[] = [];
  editForm: FormGroup;
  productoId: number = 0; 

  constructor(private inventarioService: InventarioService, private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private router: Router){
    this.editForm = this.fb.group({
      proveedor: [''], fecha_Rotacion: [''], estado: [''], cantidad: [''], unidad_medida: [''], precio_compra: [''], fecha_compra: ['']});
  }

  ngOnInit(): void {
    this.inventarioService.getInventario().subscribe({
      next: (data) => {
        this.inventario = data;
        this.inventarioFiltrado = this.inventario; //paso mi array de inventario a otro array para la busqueda
      },
      error: (error) => console.log('error al cargar el inventario:', error)
    });

    this.route.params.subscribe(params => {
      this.productoId = params['id'];
      this.inventarioFiltrado;
    });
  }

  seleccionarProducto(id: number) {
    this.productoId = id;
    
    // Obtener la fecha actual y formatearla a YYYY-MM-DD
    const fechaActual = new Date().toISOString().split('T')[0];
    
    // Encontrar el producto seleccionado
    const productoSeleccionado = this.inventarioFiltrado.find(p => p.id_lote__id_Producto__id === id);
    if (productoSeleccionado) {
      this.editForm.patchValue({
        proveedor: productoSeleccionado.id_lote__id_Producto__proveedor,
        fecha_Rotacion: productoSeleccionado.fechaRotacion,
        estado: productoSeleccionado.estado,
        cantidad: productoSeleccionado.cantidad,
        unidad_medida: productoSeleccionado.unidad_medida,
        precio_compra: productoSeleccionado.precio_compra,
        fecha_compra: fechaActual // Asignamos la fecha actual automáticamente
      });
    }
  }


  onSubmit() {
    if (this.editForm.valid) {
      const formData = this.editForm.value;
      
      //formatear las fechas
      if (formData.fecha_Rotacion) {
        formData.fecha_Rotacion = new Date(formData.fecha_Rotacion)
          .toISOString().split('T')[0];
      }
      if (formData.fecha_compra) {
        formData.fecha_compra = new Date(formData.fecha_compra)
          .toISOString().split('T')[0];
      }

      // Obtener el token
      const token = localStorage.getItem('access_token');
      
      // Configurar headers con el token
      const headers = new HttpHeaders().set('Authorization',`Token ${token}`);

      this.http.put(`http://localhost:8100/actualizar_producto/${this.productoId}/`, formData, { headers })
        .subscribe({
          next: (response: any) => {
            console.log('Producto actualizado:', response);
            alert('Producto actualizado correctamente');
            this.router.navigate(['/actualizar']);
          },
          error: (error) => {
            console.error('Error:', error);
            alert('Error al actualizar el producto: ' + 
              (error.error?.error || 'Error desconocido'));
          }
        });
    } else {
      alert('Por favor, complete todos los campos requeridos correctamente');
    }
  }

}

