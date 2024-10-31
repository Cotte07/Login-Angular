import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DatosService } from '../service/datos.service';
import { Inventario } from '../interfaces/inventario.interface';
import { InventarioService } from '../service/inventario.service';



@Component({
  selector: 'app-pagina-principal',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './pagina-principal.component.html',
  styleUrl: './pagina-principal.component.css',
  providers: [DatosService, InventarioService]
})


export class PaginaPrincipalComponent  implements OnInit{

  inventario: Inventario[] = [];

  constructor(
    private inventarioService: InventarioService) { }

  ngOnInit(): void {
    this.inventarioService.getInventario().subscribe({
      next: (data) => this.inventario = data,
      error: (error) => console.log('error al cargar el inventario:', error)
    });
  }
}
