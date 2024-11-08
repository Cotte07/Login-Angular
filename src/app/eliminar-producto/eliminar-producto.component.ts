import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Inventario } from '../interfaces/inventario.interface';
import { InventarioService } from '../service/inventario.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-eliminar-producto',
  standalone: true,
  imports: [RouterModule, RouterOutlet,HttpClientModule, FormsModule, CommonModule],
  templateUrl: './eliminar-producto.component.html',
  styleUrl: './eliminar-producto.component.css',
  providers: [InventarioService]
})

export class EliminarProductoComponent implements OnInit {
  inventario: Inventario[] = [];
  inventarioFiltrado: Inventario[] = [];
  terminoBusqueda: string = '';
  categoriaSeleccionada: string = '';
  seleccionados: number[] = [];

  constructor(private inventarioService: InventarioService) {}

  ngOnInit(): void {
    this.inventarioService.getInventario().subscribe({
      next: (data) => {
        this.inventario = data;
        this.inventarioFiltrado = this.inventario; //paso mi array de inventario a otro array para la busqueda
      },
      error: (error) => console.log('error al cargar el inventario:', error)
    });
  }

  filtrarProductos() {
    if (!this.terminoBusqueda && !this.categoriaSeleccionada) {
      this.inventarioFiltrado = this.inventario;
      return;
    }

    this.inventarioFiltrado = this.inventario.filter(item => {
      const coincideNombre = this.terminoBusqueda ? 
        item.id_lote__id_Producto__nombre
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) : true;

      const coincideCategoria = this.categoriaSeleccionada ? 
        item.id_lote__id_Producto__id_categoria__nombre
          .toLowerCase() === this.categoriaSeleccionada.toLowerCase() : true;

      return coincideNombre && coincideCategoria;
    });
  }

  filtrarPorCategoria() {
    this.filtrarProductos();
  }

  
  onSeleccionarProducto(event: any, id: number) {
    if (event.target.checked) {
      this.seleccionados.push(id); //agrega el ID a la lista
    } else {
      this.seleccionados = this.seleccionados.filter((prodId) => prodId !== id); //remueve el ID
    }
  }
  
  //metodo para reunir los Id´s y hacer la funcion de "eliminar producto"
  eliminarSeleccionados() {
    if (this.seleccionados.length === 0) {
      alert("Por favor, selecciona al menos un producto para eliminar.");
      return;
    }
  
    if (confirm("¿Estás seguro de que deseas eliminar los productos seleccionados?")) {
      const eliminaciones = this.seleccionados.map((id) =>
        this.inventarioService.eliminarProducto(id)
      );
  
      forkJoin(eliminaciones).subscribe({
        next: () => {
          alert("Productos eliminados correctamente.");
          this.inventarioFiltrado; //recarga la tabla de inventario
          this.seleccionados = []; //limpia la lista de seleccionados
        },
        error: (error) => {
          console.error("Error al eliminar productos:", error);
          alert("Hubo un error al eliminar los productos.");
        },
      });
    }
  }

  //metodo para recargar la lista de productos
cargarProductos() {
  this.inventarioService.getInventario().subscribe({
    next: (productos) => {
      this.inventarioFiltrado = productos;  //actualiza la lista de productos en el frontend
    },
    error: (error) => {
      console.error("Error al cargar los productos:", error);
      alert("Hubo un error al cargar los productos.");
    },
  });
}
}
