import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-opciones-inventario',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './opciones-inventario.component.html',
  styleUrl: './opciones-inventario.component.css'
})
export class OpcionesInventarioComponent {

  constructor(private router: Router) {}
}
