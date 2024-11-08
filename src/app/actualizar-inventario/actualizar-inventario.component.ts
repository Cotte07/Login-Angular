import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { InventarioService } from '../service/inventario.service';
import { Inventario } from '../interfaces/inventario.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualizar-inventario',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule],
  templateUrl: './actualizar-inventario.component.html',
  styleUrl: './actualizar-inventario.component.css',
  providers: [InventarioService]
})
export class ActualizarInventarioComponent implements OnInit {
  inventario: Inventario[] = [];
  inventarioFiltrado: Inventario[] = [];

  constructor(private inventarioService: InventarioService){}

  ngOnInit(): void {
    this.inventarioService.getInventario().subscribe({
      next: (data) => {
        this.inventario = data;
        this.inventarioFiltrado = this.inventario; //paso mi array de inventario a otro array para la busqueda
      },
      error: (error) => console.log('error al cargar el inventario:', error)
    });
  }
}

