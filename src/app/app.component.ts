import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet, Event } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  

  showNavbarAndFooter = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event: Event) => event instanceof NavigationEnd))
      .subscribe((event: Event) => {
        const navEndEvent = event as NavigationEnd;
        // Ocultar navbar y footer si la URL contiene "/login"
        this.showNavbarAndFooter = !navEndEvent.url.includes('/login');
      });
  }
}
