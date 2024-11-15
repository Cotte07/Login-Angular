import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { InventarioService } from '../service/inventario.service';
import { Historial } from '../interfaces/historial.interface';

@Component({
  selector: 'app-ver-historial',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule],
  templateUrl: './ver-historial.component.html',
  styleUrl: './ver-historial.component.css',
  providers: [InventarioService]
})

export class VerHistorialComponent implements OnInit {
  historial: Historial[] = [];
  fechasUnicas: string[] = [];  // para almacenar las fechas únicas
  productosFiltrados: Historial[] = []; // para los productos de la fecha seleccionada
  fechaSeleccionada: string | null = null;
  loading = true;
  error: string | null = null;

  constructor(private inventarioService: InventarioService){}

  ngOnInit(): void {
    this.inventarioService.getHistorial().subscribe({
      next: (response: any) => {
        if (response.status === 'success' && Array.isArray(response.data)) {
          this.historial = response.data;
          // obtener fechas únicas 
          this.fechasUnicas = [...new Set(this.historial.map(item => 
            item.fecha_compra.split(' ')[0]
          ))].sort().reverse(); //ordenar fechas de más reciente a más antigua
        } else {
          this.error = 'formato de respuesta inesperado';
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('error:', error);
        this.error = 'error al cargar el historial';
        this.loading = false;
      }
    });
  }

  //metodo para seleccionar una fecha y filtrar productos
  seleccionarFecha(fecha: string) {
    this.fechaSeleccionada = fecha;
    //filtrar productos que coincidan con la fecha seleccionada
    this.productosFiltrados = this.historial.filter(item => 
    item.fecha_compra.startsWith(fecha)
    );
  }
}
