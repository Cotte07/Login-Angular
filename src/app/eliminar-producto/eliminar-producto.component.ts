import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-eliminar-producto',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './eliminar-producto.component.html',
  styleUrl: './eliminar-producto.component.css'
})
export class EliminarProductoComponent {

  constructor(private router: Router){}
}
