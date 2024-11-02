import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-actualizar-inventario',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './actualizar-inventario.component.html',
  styleUrl: './actualizar-inventario.component.css'
})
export class ActualizarInventarioComponent {

  constructor(private router: Router){}
}

