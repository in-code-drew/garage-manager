import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
})
export class Navbar {
  menuItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Clienti', path: '/clients' },
    { label: 'Veicoli', path: '/vehicles' },
    { label: 'Revisioni', path: '/revisions'},
    { label: 'Appuntamenti', path: '/appointments' },
  ]
}
