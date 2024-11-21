import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet, Event, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { Inventario } from './interfaces/inventario.interface';
import { FormsModule } from '@angular/forms';
import { InventarioService } from './service/inventario.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ InventarioService]
})
export class AppComponent implements OnInit{
  showNavbarAndFooter = true;

  inventario: Inventario[] =[];
  inventarioFiltrado: any[] = [];
  productosProximosARotar: any[] = [];

  constructor(private router: Router, private inventarioService: InventarioService) {

    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event: Event) => event instanceof NavigationEnd))
      .subscribe((event: Event) => { const navEndEvent = event as NavigationEnd;
        // Ocultar navbar y footer si la URL contiene "/login"
        this.showNavbarAndFooter = !navEndEvent.url.includes('/login');


        this.inventarioService.getInventario().subscribe({
          next: (data) => {this.inventario = data;
            this.inventarioFiltrado = this.inventario; //paso mi array de inventario a otro array para la busqueda
            this.verificarProductosProximosARotar(); 
          },
          error: (error) => console.log('error al cargar el inventario:', error)
        });
      });
  }

  verificarProductosProximosARotar() {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
  
    this.productosProximosARotar = []; // Reinicia la lista para evitar duplicados
  
    this.inventario.forEach(item => { const fechaRotacion = new Date(item.fechaRotacion);
      fechaRotacion.setHours(0, 0, 0, 0); // Normaliza la fecha de rotación a medianoche

      const diferenciaDias = (fechaRotacion.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24);
      
  
      if (diferenciaDias >= 0 && diferenciaDias <= 4) {
        const mensaje = `Producto: ${item.id_lote__id_Producto__nombre} está por rotar en ${
          diferenciaDias === 0 ? 'el dia de hoy' : `${Math.round(diferenciaDias)} ${Math.round(diferenciaDias) === 1 ? 'día' : 'días'}`}`;
        
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
