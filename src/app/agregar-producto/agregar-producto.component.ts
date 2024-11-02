import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-agregar-producto',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './agregar-producto.component.html',
  styleUrl: './agregar-producto.component.css'
})
export class AgregarProductoComponent {

  constructor(private router: Router){}
}
