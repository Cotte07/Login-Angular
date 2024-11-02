import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DatosService } from '../service/datos.service';
import { Inventario } from '../interfaces/inventario.interface';
import { InventarioService } from '../service/inventario.service';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-pagina-principal',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './pagina-principal.component.html',
  styleUrl: './pagina-principal.component.css',
  providers: [DatosService, InventarioService]
})


export class PaginaPrincipalComponent  implements OnInit{

  inventario: Inventario[] = [];
  inventarioFiltrado: any[] = [];
  terminoBusqueda: string = '';
  categoriaSeleccionada: string = '';
  productosProximosARotar: any[] = [];

  constructor(
    private inventarioService: InventarioService) {

      if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        Notification.requestPermission();
      }
     }

  ngOnInit(): void {
    this.inventarioService.getInventario().subscribe({
      next: (data) => {
        this.inventario = data;
        this.inventarioFiltrado = this.inventario; //paso mi array de inventario a otro array para la busqueda
        console.log('inventario:', this.inventario); // Confirmar que los datos están cargados
        this.verificarProductosProximosARotar(); 
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

  // Método para limpiar los filtros
  limpiarFiltros() {
    this.terminoBusqueda = '';
    this.categoriaSeleccionada = '';
    this.inventarioFiltrado = this.inventario;
  }

  // Método para ordenar por nombre
  ordenarPorNombre(direccion: 'asc' | 'desc') {
    this.inventarioFiltrado.sort((a, b) => {
      const nombreA = a.id_lote__id_Producto__nombre.toLowerCase();
      const nombreB = b.id_lote__id_Producto__nombre.toLowerCase();
      
      if (direccion === 'asc') {
        return nombreA < nombreB ? -1 : nombreA > nombreB ? 1 : 0;
      } else {
        return nombreB < nombreA ? -1 : nombreB > nombreA ? 1 : 0;
      }
    });
  }

  // Método para ordenar por fecha
  ordenarPorFecha(direccion: 'asc' | 'desc') {
    this.inventarioFiltrado.sort((a, b) => {
      const fechaA = new Date(this.parsearFecha(a.fecha_formateada));
      const fechaB = new Date(this.parsearFecha(b.fecha_formateada));
      
      if (direccion === 'asc') {
        return fechaA.getTime() - fechaB.getTime();
      } else {
        return fechaB.getTime() - fechaA.getTime();
      }
    });
  }

  private parsearFecha(fechaStr: string): Date {
    const [dia, mes, anio] = fechaStr.split('/');
    return new Date(parseInt(anio), parseInt(mes) - 1, parseInt(dia));
  }


  verificarProductosProximosARotar() {

    console.log("Ejecutando verificarProductosProximosARotar");
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
  
    this.productosProximosARotar = []; // Reinicia la lista para evitar duplicados
  
    this.inventario.forEach(item => { const fechaRotacion = new Date(item.fechaRotacion);
      fechaRotacion.setHours(0, 0, 0, 0); // Normaliza la fecha de rotación a medianoche

      const diferenciaDias = (fechaRotacion.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24);
      
      
      // Agregar logs para depuración
      console.log("Producto:", item.id_lote__id_Producto__nombre);
      console.log("Fecha de rotación:", fechaRotacion);
      console.log("Fecha actual:", hoy);
      console.log("Diferencia en días:", diferenciaDias);
  
      if (diferenciaDias >= 0 && diferenciaDias <= 4) {
        const mensaje = `Producto: ${item.id_lote__id_Producto__nombre} está por rotar en ${
          diferenciaDias === 0 ? 'hoy' : `${Math.round(diferenciaDias)} ${Math.round(diferenciaDias) === 1 ? 'día' : 'días'}`
        }`;
        
        this.productosProximosARotar.push({ producto: item, mensaje });
  
        if (Notification.permission === 'granted') {
          new Notification(mensaje);
        } else {
          console.log(`Notificación: ${mensaje}`);
        }
      }
    });
  }
}