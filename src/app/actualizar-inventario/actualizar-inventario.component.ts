import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { InventarioService } from '../service/inventario.service';
import { Inventario } from '../interfaces/inventario.interface';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-actualizar-inventario',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './actualizar-inventario.component.html',
  styleUrl: './actualizar-inventario.component.css',
})
export class ActualizarInventarioComponent implements OnInit {
  inventario: Inventario[] = [];
  inventarioFiltrado: Inventario[] = [];
  editForm: FormGroup;
  productoId: number = 0;

  constructor(
    private inventarioService: InventarioService,private fb: FormBuilder,private route:ActivatedRoute,private router: Router
  ) {
    this.editForm = this.fb.group({
      proveedor: [''],fecha_Rotacion: [''],estado: [''],cantidad: [''],unidad_medida: [''],precio_compra: [''],fecha_compra: [''],num_lote: [''],});
  }

  ngOnInit(): void {
    this.inventarioService.getInventario().subscribe({
      next: (data) => { this.inventario = data;
        this.inventarioFiltrado = this.inventario; //paso mi array de inventario a otro array para la busqueda
      },
      error: (error) => console.log('error al cargar el inventario:', error),
    });

    this.route.params.subscribe((params) => {this.productoId = params['id'];});}

  seleccionarProducto(id: number) {
    this.productoId = id;

    // Obtener la fecha actual y formatearla a YYYY-MM-DD
    const fechaActual = new Date().toISOString().split('T')[0];

    // Encontrar el producto seleccionado
    const productoSeleccionado = this.inventarioFiltrado.find(
      (p) => p.id_lote__id_Producto__id === id);
    if (productoSeleccionado) {
      this.editForm.patchValue({
        proveedor: productoSeleccionado.id_lote__id_Producto__proveedor,
        fecha_Rotacion: productoSeleccionado.fechaRotacion,
        estado: productoSeleccionado.estado,
        cantidad: productoSeleccionado.cantidad,
        unidad_medida: productoSeleccionado.unidad_medida,
        precio_compra: productoSeleccionado.precio_compra,
        fecha_compra: fechaActual, // Asignamos la fecha actual automáticamente para guardar el registro de actualizacion
        num_lote: productoSeleccionado.id_lote__numero_lote,
      });
    }
  }

  onSubmit() {
    if (this.editForm.valid) {
      const formData = this.editForm.value;

      // Formatear las fechas
      if (formData.fecha_Rotacion) {
        formData.fecha_Rotacion = new Date(formData.fecha_Rotacion)
          .toISOString()
          .split('T')[0];
      }
      if (formData.fecha_compra) {
        formData.fecha_compra = new Date(formData.fecha_compra)
          .toISOString()
          .split('T')[0];
      }

      this.inventarioService.actualizarProducto(this.productoId, formData).subscribe({
        next: (response: any) => {
          console.log('Producto actualizado:', response);
          alert('Producto actualizado correctamente'); //mensaje para indicar al usuario que se actualizo el producto

          // Restablecer el formulario
          this.editForm.reset();

          this.router.navigate(['/actualizar']);
        },
        error: (error) => {
          console.error('Error:', error);
          alert(
            'Error al actualizar el producto: ' +
              (error.error?.error || 'Error desconocido')
          );
        },
      });
    } else {
      alert('Por favor complete todos los campos requeridos correctamente');
    }
  }
}
