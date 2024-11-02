import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ver-historial',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './ver-historial.component.html',
  styleUrl: './ver-historial.component.css'
})
export class VerHistorialComponent {

  constructor(private router: Router){}
}
